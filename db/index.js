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

  addNewEmployee(newEmployee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", newEmployee);
  }

  // query to view all roles
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.title, role.id, department.name as 'Department', role.salary FROM role JOIN department ON role.department_id = department.id;"
      );
  }

  addNewRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // query to view all departments
  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department;");
  }

  // query to add a new departments
  addNewDepartment(newDepartment) {
    //inserting into department using the newDepartment (answers)
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", newDepartment);
  }

  // query to view employee by department 
  findAllEmployeesDepartment() {
    return this.connection
    .promise()
    .query(
      "SELECT employee.first_name, employee.last_name, department.name as department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;");
  }

  // query to view employee's manager 
  findAllEmployeesManager() {
    return this.connection
    .promise()
    .query("SELECT employee.first_name, employee.last_name, concat(manager.first_name, ' ', manager.last_name) as manager FROM employee lEFT JOIN employee manager ON manager.id = employee.manager_id;");
  }






  
  // have to work from here 

// query to remove a departments
  removeDepartment(removeDep) {
    //inserting into department using the newDepartment (answers)
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE name = ?", removeDep);
  }





    ViewBudgett() {
      return this.connection
      .promise()
      .query(
        "SELECT department.department_id AS department_id, department.name AS Department_Name, CONCAT('$', FORMAT(SUM(salary),0)) AS Budget FROM role INNER JOIN employee USING(role_id) INNER JOIN department ON role.department_id = department.department_id GROUP BY role.department_id;");
    }









}

module.exports = new DB(connection);
