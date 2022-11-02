const inquirer = require("inquirer");
const express = require('express');
const mySql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mySql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'nidhi8866',
    database: 'company_db'
  },
  console.log(`Connected to the ccompany_db database.`)
);



function prompt() {
  inquirer
      .prompt({
        // ?? prevent repeating again and again 
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
              "Quit"
          ],
      })
      .then(function ({task}) {
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
      })
};


function viewEmployees(){
  // need id, first and last name  (empoloyee table),title (roles table), name (department table), salaray (roles table) and manager (empolyee table)
  var query = db.query('SELECT * FROM students', function (err, results) {
    console.log(results);
  });

  initPrompt();
}


function addEmployee(){
  // what is the employee's first name?
  // what is the employee's last name ?
  // what is the employee's role ?
  // options: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer
  // who is the employee's manager?


}



function updateRole(){
// which employee's role do you want to update ?
// options: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen
// which role do you want to assign the selected empolyee?
// options: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer


}


function viewRoles(){
// need id (empoloyee table), title(roles table),  name (department table), salaray (roles table)


}


function addRole(){
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
        // what is the name of the role?
      {
        name: "title",
        type: "input",
        message: "what is the name of the role?"
      },
      // what is the salary of the role ?
      {
        name: "salary",
        type: "input",
        message: "what is the salary of the role ?"
      },
      // which department does the role belong to ? (options: Sales, Engineering, Finance, Legal)
      {
          name: "departmentName",
          type: "list",
          choices: res.map(department => department.name),
          message: "Select department ID"
        }
    ]).then(function (answers) {
      const selectedDepartment = res.find(department => department.name === answers.departmentName);
      db.query("INSERT INTO roles SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: selectedDepartment.id
        }, function (err, res) {
          if (err) throw err;
          console.log("Added new role " + answers.title + " " + answers.salary + "\n");
          initPrompt();
        })
    })
  })
};




function viewDepartments(){
// need department id (roles table) and name (department table)

}

function addDepartment(){
  inquirer
  .prompt({
   // what is the name of the department?
      name: "title",
      type: "input",
      message: "what is the name of the department?"}
      ).then
      
      "added this to the database"

}



prompt();


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
