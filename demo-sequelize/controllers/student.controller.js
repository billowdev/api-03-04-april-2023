const db = require('../models')
const studentModel = db.studentModel;
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