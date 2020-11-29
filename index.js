const inquirer = require("inquirer");
require("console.table");
const util = require("util");
const mysql = require("mysql");

//create connection obecr
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Silver13!',
    database: 'employeedb',
  });

//establish connection
//connection.connect();

//promisify the query
connection.query = util.promisify(connection.query);

//create class for DB query methods
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
					LEFT JOIN employee manager on manager.id = employee.manager_id;"
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


const dbInstance = new DB(connection);

// initiaite app questions
async function startApp() {
    const userChoice = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee by Role",
          "Exit"
        ],
      },
    ]);

    //handle user answer
    switch (userChoice.choice) {
    case "View All Employees":
      return viewAllEmployees();
    case "View All Departments":
      return viewAllDepartment();
    case "View All Roles":
      return viewAllRoles();
    case "Add Employee":
      return addEmployee();
    case "Add Department":
      return addDepartment();
    case "Add Role":
      return addRole();
    case "Update Employee by Role":
      return updateEmployeeByRole();
    default:
      return exit();
    }
}

//initiate app run
startApp();


//view all employees function
async function viewAllEmployees() {
  //get the employee data
  const employees = await dbInstance.findAllEmployees();
  //Show the data
  console.table(employees);
  //ask the questions again
  startApp();
}