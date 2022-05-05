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
      console.table(rows);
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
    getEmployeeInfo().then((employeeData) => {
      console.log(employeeData);
      addEmployee(employeeData);
    });
  } else if (response.menu === "Update Employee Role") {
    console.log("Update Employee Role");
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
