const res = require("express/lib/response");
const inquirer = require("inquirer");
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

const getEmployeeInfo = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "First Name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "Last Name?",
    },
    {
      type: "list",
      name: "role",
      message: "What is their role?",
      choices: [
        { name: "Cashier", value: 1 },
        { name: "Grocery Stocker", value: 5 },
        { name: "Grocery Manager", value: 3 },
      ],
    },
  ]);
};

const selectEmployeeToUpdate = () => {
  const employeeNames = [];
  db.query(`SELECT first_name, last_name FROM employees`),
    (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      rows.forEach((element) => employeeNames.push(element.rows));
      console.log(employeeNames);
      return employeeNames;
    };
  inquirer.prompt([
    {
      type: "list",
      message: "Which employee's role would you like to update?",
      name: "employeeList",
      choices: [employeeNames],
    },
  ]);
};

//Query Functions

const viewAllEmployees = () => {
  db.query(`SELECT * FROM employees`, (err, rows) => {
    console.table(rows);
  });
};

const addEmployee = (employee) => {
  const { first_name, last_name, role } = employee;
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${employee.first_name}", "${employee.last_name}", "${employee.role}")`,
    (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.log("Employee added to database!");
    }
  );
};

const viewAllRoles = () => {
  return db.query(`SELECT * FROM role`, (err, rows) => {
    console.table(rows);
  });
};

const viewAllDepartments = () => {
  return db.query(`SELECT * FROM department`, (err, rows) => {
    console.table(rows);
  });
};

promptUser().then((response) => {
  if (response.menu === "View All Employees") {
    viewAllEmployees();
  } else if (response.menu === "Add Employee") {
    getEmployeeInfo()
      .then((employeeData) => {
        addEmployee(employeeData);
      })
      .then(promptUser());
  } else if (response.menu === "Update Employee Role") {
    selectEmployeeToUpdate();
  } else if (response.menu === "View All Roles") {
    viewAllRoles();
  } else if (response.menu === "Add Role") {
    console.log("chose add role");
  } else if (response.menu === "View All Departments") {
    viewAllDepartments();
  } else if (response.menu === "Add Department") {
    console.log("chose add dpt");
  }
});
