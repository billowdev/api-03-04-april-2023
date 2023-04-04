const db = require('../models')
const studentModel = db.studentModel;
const facultyModel = db.facultyModel;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;

// get all student
exports.findAll = async (req, res) => {
    try {
        const response = await studentModel.findAll()
        res.status(200).json({
            message: "get all student was successfully",
            payload: response
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "get all student was failed"
        })
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const response = await studentModel.findByPk(id, {
            include: {
                model: facultyModel,
                attributes: ['fac_name']
            },
            attributes: {
                exclude: ['password']
            },
        })
        res.status(200).json({
            message: "get one student was successfully",
            payload: response
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "get one student was failed"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const id = req.body.stdId;
        const pass = req.body.stdPass
        const response = await studentModel.findOne({
            where: {
                std_id: id,
                std_pass: pass
            },
             raw:true
        })

        if (response) {
            const SECRETKEY = "secret1234"
            const token = jwt.sign({
                std_id: response.stdId,
            }, SECRETKEY, {
                expiresIn: "1h",
            });
            delete response.stdPass;
            res.status(200).json({
                message: "login was successfully",
                payload: { ...response, token }
            })
        } else {
            res.status(400).json({
                message: "login student was failed"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message || "login student was failed"
        })
    }
}