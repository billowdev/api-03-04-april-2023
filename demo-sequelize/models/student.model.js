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
		timeStamps: false
	});
  
	return Student;
  };