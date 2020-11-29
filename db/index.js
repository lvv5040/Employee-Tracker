//class that contians query methods
class DB {
	constructor(connection) {
		this.connection = connection;
	}

	findAllEmployees() {
		return this.connection.query(
		  	`
				SELECT 
					employee.id, 
					employee.first_name, 
					employee.last_name, 
					role.title, 
					department.name AS department, 
					role.salary, 
					CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
				FROM 
					employee 
					LEFT JOIN role on employee.role_id = role.id 
					LEFT JOIN department on role.department_id = department.id 
					LEFT JOIN employee manager on manager.id = employee.manager_id;
			`
		);
	  }

	findAllDepartments() {
		return this.connection.query(
		`
			SELECT 
				department.id, 
				department.name, 
				SUM(role.salary) AS utilized_budget 
			FROM 
				employee 
				LEFT JOIN role on employee.role_id = role.id 
				LEFT JOIN department on role.department_id = department.id 
				GROUP BY department.id, department.name;
		`
		)
	}
}

module.exports = DB;
