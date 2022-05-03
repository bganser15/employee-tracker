const inquirer = require("inquirer");

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

promptUser();
