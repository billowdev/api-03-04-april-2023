module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        stdId: {
            primaryKey: true,
            type: Sequelize.STRING,
            field: "std_id",
        },
        stdPass: {
            type: Sequelize.STRING,
            field: "std_pass",
        },
        stdName: {
            type: Sequelize.STRING,
            field: "std_name",
        },
        facId: {
            type: Sequelize.INTEGER,
            field: "fac_id",
            unique: false
        },
    }, {
        sequelize,
        tableName: 'student',
        freezeTableName: true,
        timestamps: false
    });

    Student.associate = (models) => {
        Student.belongsTo(models.faculty, {
            foreignKey: 'fac_id',
            sourceKey: 'fac_id',
            onDelete: "cascade",
        });
    }

    return Student;
};