const res = require("express/lib/response");
const inquirer = require("inquirer");
const db = require("./db/connection");
let employeeNames = [];
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

const displayEmployeeToUpdate = async function () {
  db.query(`SELECT first_name, last_name, id FROM employees`, (err, rows) => {
    employeeNames = rows.map((item) => {
      item.first_name + " " + item.last_name;
    });
    if (err) {
      console.log({ error: err.message });
      return;
    }
  });
  return employeeNames;
};

//inquirer prompt to select employee
const selectEmployee = (employeeArray) => {
  inquirer.prompt([
    {
      type: "list",
      message: "Which employee's role would you like to update?",
      name: "employeeList",
      choices: employeeArray,
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
  //const { first_name, last_name, id } = employee;
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${employee.first_name}", "${employee.last_name}", "${employee.role}")`,
    (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
    }
  );
};

const viewAllRoles = () => {
  return db.query(`SELECT * FROM role`, (err, rows) => {
    console.table(rows);
  });
};

const addRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "newRoleName",
      message: "What role would you like to add?",
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "What is the yearly salary?",
    },
  ]);
};

const addRoletoDatabase = (newRole) => {
  const { newRoleName, newRoleSalary } = newRole;
  db.query(
    `INSERT INTO role (title, salary) VALUES ("${newRole.newRoleName}", "${newRole.newRoleSalary}")`,
    (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.log("New role added!");
    }
  );
};

const viewAllDepartments = () => {
  return db.query(`SELECT * FROM department`, (err, rows) => {
    console.table(rows);
  });
};

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "What department would you like to add?",
    },
  ]);
};

const addDeptToDatabase = (newDepartment) => {
  db.query(
    `INSERT INTO department (dept_name) VALUES( "${newDepartment.deptName}")`,
    (err, rows) => {
      if (err) {
        console.log("Unable to add department");
      }
      console.log("New department added!");
    }
  );
};

promptUser().then((response) => {
  //View all employees
  if (response.menu === "View All Employees") {
    viewAllEmployees();

    //Add an employee
  } else if (response.menu === "Add Employee") {
    getEmployeeInfo().then((employeeData) => {
      addEmployee(employeeData);
    });

    //Update employee role
  } else if (response.menu === "Update Employee Role") {
    displayEmployeeToUpdate().then((employeeNameArray) => {
      selectEmployee(employeeNameArray);
    });

    //View all roles
  } else if (response.menu === "View All Roles") {
    viewAllRoles();

    //Add a role
  } else if (response.menu === "Add Role") {
    addRole().then((newRoleData) => {
      addRoletoDatabase(newRoleData);
    });

    //View all departments
  } else if (response.menu === "View All Departments") {
    viewAllDepartments();

    //Add a department
  } else if (response.menu === "Add Department") {
    addDepartment().then((newDepartmentData) => {
      addDeptToDatabase(newDepartmentData);
    });
  }
});
