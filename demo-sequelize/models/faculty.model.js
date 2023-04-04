module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
        facultyId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "fac_id"
        },
        facultyName: {
            type: Sequelize.STRING,
            field: "fac_name",
        },
    }, {
        sequelize,
        tableName: 'faculty',
        freezeTableName: true,
        timestamps: false
    });

    Faculty.associate = (models) => {
        Faculty.hasMany(models.student, {
            foreignKey: 'fac_id',
            sourceKey: 'fac_id'

        })
    }
    return Faculty;

}