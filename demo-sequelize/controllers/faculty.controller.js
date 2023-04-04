const db = require('../models')
const facultyModel = db.facultyModel;
const Op = db.Sequelize.Op;

// get all facultyModel
exports.findAll = async (req, res) => {
	try {
		const response = await facultyModel.findAll()
		console.log(facultyModel)
		res.status(200).json({
			message: "get all faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "get all faculty was failed"
		})
	}
}

exports.createOne = async (req, res) => {
	try {
		const response = await facultyModel.create(req.body)
		res.status(201).json({
			message: "create one faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "create one faculty was failed"
		})
	}
}

exports.update = async (req, res) => {
	try {
		const id = req.params.id

		const body = req.body
		const response = await facultyModel.update(body, {
			where: { fac_id: id },
		})
		if (response[0] == 1) {
			res.status(200).json({
				message: "update faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `update faculty was failed faculty with fac_id=${id}. Maybe fac was not found or req.body is empty!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "update faculty was failed"
		})
	}
}

exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		const response = await facultyModel.destroy({
			where: { fac_id: id }
		})
		if (response == 1) {
			res.status(200).json({
				message: "delete faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `delete faculty was failed faculty with fac_id=${id}. Maybe faculty was not found!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "delete faculty was failed"
		})
	}
}