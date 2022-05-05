const inquirer = require("inquirer");
const Prompt = require("inquirer/lib/prompts/base");
const db = require("./db/connection");

//ask user what they would like to do
//view all employees - select all from sql table
//add employee --add a column
//update employee role --update table
//view all roles - select all from sql table
//add role -add a column
//view all departments - select all from sql table
//add departments - add a column

const promptUser = () => {
  console.log("Employee Tracker: What would you like to do?");
  return inquirer.prompt([
    {
      type: "list",
      name: "menu",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    },
  ]);
};

//Query Functions

const viewAllEmployees = () => {
  db.query(`SELECT * FROM employees`, (err, rows) => {
    console.table(rows);
  });
};

const viewAllRoles = () => {
  db.query(`SELECT * FROM role`, (err, rows) => {
    console.table(rows);
  });
};

promptUser().then((response) => {
  if (response.menu === "View All Emmployees") {
    viewAllEmployees();
  } else if (response.menu === "Add Employee") {
    console.log("chose add employee");
  } else if (response.menu === "Update Employee Role") {
    console.log("Update Employee Role");
  } else if (response.menu === "View All Roles") {
    viewAllRoles();
  } else if (response.menu === "Add Role") {
    console.log("chose add role");
  } else if (response.menu === "Add Department") {
    console.log("chose add dpt");
  }
});
