const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // query to view all employees
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        " SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id lEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }
  // query to view all roles
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.title as 'Job Title', role.id as 'Role ID', department.name as 'Department', role.salary  FROM role JOIN department ON role.department_id = department.id"
      );
  }

  // query to view all departments
  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }
};

module.exports = new DB(connection);
