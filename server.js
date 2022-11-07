// require('dotenv').config();
const inquirer = require("inquirer");
// entire DB folder
const db = require("./db");
//console.table - render sql in the console
require("console.table");

//inquier prompt function for questions
function prompt() {
  inquirer
    .prompt({
      // prevent repeating again and again  ???
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add an Employee",
        "Update an Employee Role",
        "View All Roles",
        "Add a Role",
        "View All Departments",
        "Add a Department",
        "Quit",
      ],
    })
    .then((res) => {
      let task = res.task;
      switch (task) {
        case "View All Employees":
          viewEmployees();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Update an Employee Role":
          updateRole();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add a Role":
          addRole();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add a Department":
          addDepartment();
          break;
      }
    });
}

// need id, first and last name  (empoloyee table),title (roles table), name (department table), salaray (roles table) and manager (empolyee table)
function viewEmployees() {
  // calling and creating a table (each row is one employee)
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => prompt());
}

function addEmployee() {
  inquirer
    .prompt(
      // what is the employee's first name?
      {
        type: "input",
        name: "first_name",
        message: "what is the employee's first name?",
      },
      // what is the employee's last name?
      {
        type: "input",
        name: "last_name",
        message: "what is the employee's last name?",
      },
      // what is the employee's role ?
      // options: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer
      {
        type: "list",
        name: "employee_role",
        message: "what is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
      // who is the employee's manager?
      {
        type: "input",
        name: "empolyee_manager",
        message: "who is the employee's manager?",
      }
    )
    // adding to the database ???
    .then((answers) => {});

}

// need id (empoloyee table), title(roles table),  name (department table), salaray (roles table)
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => prompt());
}

function updateRole() {
  inquirer
    .prompt(
      // which employee's role do you want to update ?
      // options: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen
      {
        type: "list",
        name: "employee_role",
        message: "which employee's role do you want to update ?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          " Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
      },
      // which role do you want to assign the selected empolyee?
      // options: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer
      {
        type: "list",
        name: "role",
        message: "which role do you want to assign the selected empolyee?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      }
    )

    // adding to the database ???
    .then((answers) => {});
}

function addRole() {
  inquirer
    .prompt(
      // what is the salary of the role ?
      {
        name: "title",
        type: "input",
        message: "what is the name of the role?",
      },
      // what is the salary of the role ?
      {
        name: "salary",
        type: "input",
        message: "what is the salary of the role ?",
      },
      // which department does the role belong to ? (options: Sales, Engineering, Finance, Legal) ???
      {
        name: "department_name",
        type: "list",
        choices: res.map((department) => department.name),
        message: "Select department ID",
      }
    )
    // adding role to the database ??
    .then((answers) => {});
}

//   ]).then(function (answers) {
//     const selectedDepartment = res.find(department => department.name === answers.departmentName);
//     db.query("INSERT INTO roles SET ?",
//       {
//         title: answers.title,
//         salary: answers.salary,
//         department_id: selectedDepartment.id
//       }, function (err, res) {
//         if (err) throw err;
//         console.log("Added new role " + answers.title + " " + answers.salary + "\n");
//         initPrompt();
//       })
//   })
// })

// need department id (roles table) and name (department table)
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => prompt());
}

function addDepartment() {
  inquirer.prompt({
    // what is the name of the department?
    name: "title",
    type: "input",
    message: "what is the name of the department?",
  })
  // added department to the database   ??
  .then;
}

//calling the prompt function (aka the questions)
prompt();
