// require('dotenv').config();
const inquirer = require("inquirer");
const { findAllRoles } = require("./db");
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
        "View Employee's Manager",
        "View All Roles",
        "Add a Role",
        "View All Departments",
        "View All employee's Department",
        "Add a Department",
        "Remove a Department",
        "View Budget",
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

        case "View Employee's Manager":
          viewEmployeesManager();
          break;

        case "View All employee's Department":
          viewEmployeeByDepartment();
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

        case "Remove a Department":
          deleteDepartment();
          break;

        case "View Budget":
          budget();
          break;

        case "Quit":
          quit();
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
    .prompt([
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
    ])
    .then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleOption = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "role_id",
            message: "what is the employee's role?",
            choices: roleOption,
          })
          .then((res) => {
            let roleId = res.role_id;
            db.findAllEmployees().then(([rows]) => {
              let employees = rows;
              const managersChoices = employees.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );
              // emoloyee have no assiocation with manager_Id if you pick none
              managersChoices.unshift({ name: "None", value: null });
              inquirer
                .prompt({
                  type: "list",
                  name: "manager_id",
                  message: "who is the employee's manager?",
                  choices: managersChoices,
                })
                .then((res) => {
                  let empoloyee = {
                    manager_id: res.manager_id,
                    role_id: roleId,
                    first_name: firstName,
                    last_name: lastName,
                  };
                  db.addNewEmployee(empoloyee);
                })
                .then(() =>
                  console.log(`added ${firstName} ${lastName} to the database`)
                )
                .then(() => prompt());
            });
          });
      });
    });
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

function addRole() {
  db.findAllDepartments().then(([rows]) => {
    let department = rows;
    const departmentChoices = department.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        // what is the salary of the role ?
        {
          name: "title",
          // type: "input",
          message: "what is the name of the role?",
        },
        // what is the salary of the role ?
        {
          name: "salary",
          // type: "input",
          message: "what is the salary of the role ?",
        },

        // which department does the role belong to ? (options: Sales, Engineering, Finance, Legal) ???
        {
          type: "list",
          name: "department_id",
          message: "which department does this role belong to?",
          choices: departmentChoices,
        },
      ])
      // adding role to the database 
      .then((res) => {
        let role = {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        };
        db.addNewRole(role)
          .then(() => console.log(`added ${role.title} to the database`))
          .then(() => prompt());
      });
  });
}

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
  inquirer
    .prompt({
      // what is the name of the department?
      name: "name",
      type: "input",
      message: "what is the name of the department?",
    })
    .then((answers) => {
      db.addNewDepartment(answers)
        .then(() => console.log("New Department added!"))
        .then(() => prompt());
    });
}

// view employees by department
function viewEmployeeByDepartment() {
  db.findAllEmployeesDepartment()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => prompt());
}

function quit() {
  console.log("Thank you, Goodbye");
  process.exit();
}

// view employees by manager 
function viewEmployeesManager() {
  db.findAllEmployeesManager()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => prompt());

}





// have to work from here

// delete departments, roles, and employees - BONUS
function deleteDepartment() {
  db.findAllDepartments().then(([rows]) => {
    let department = rows;
    const departmentChoices = department.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt(
        // which department does the role belong to ? 
        {
          type: "list",
          name: "department_name",
          message: "which department would you like to remove?",
          choices: departmentChoices,
        }
      )
      // removing it from the database
      .then((res) => {
        let department = {
          name: res.name
        };
      db.removeDepartment(department)
      .then(() => console.log(`removed ${department.name} to the database`))
      .then(() => prompt());
      });
    });




    // .then((res) => {
    //   let empoloyee = {
    //     manager_id: res.manager_id,
    //     role_id: roleId,
    //     first_name: firstName,
    //     last_name: lastName,
    //   };
    //   db.addNewEmployee(empoloyee);
    // })
    // .then(() =>
    //   console.log(`added ${firstName} ${lastName} to the database`)
    // )
    // .then(() => prompt());




  // .then((answers) => {
  //   db.removeDepartment(answers)
  //     .then(() => console.log("Removed from the Department!"))
  //     .then(() => prompt());
  // });

//   .then((res) => {
//     let department = {
//       name: res.name
//     };
//    db.removeDepartment(department)
//    .then(() => console.log(`added ${department.name} to the database`))
//    .then(() => prompt());
//   });
// });


}





// update employee managers  - BONUS
function updateManager() {}



// view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (8 points) - BONUS
function budget() {
  db.ViewBudgett()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
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

//calling the prompt function (aka the questions)
prompt();
