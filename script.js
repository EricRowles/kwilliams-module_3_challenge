// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

class Employee {
    constructor() {
        this.firstName = null;
        this.lastName = null;
        this.salary = 0;
    }
    setFirstName() {
        let name = prompt ("Please enter employee's first name.");
        this.firstName = name;
        return name;
    }
    setLastName() {
        let name = prompt ("Please enter employee's last name.");
        this.lastName = name;
        return name;
    }
    setSalary() {
        let salary = prompt ("Please enter employee's salary.");
        if (salary === null) {
          // Cancelled out of salary selector
          return salary;
        }
        salary = parseFloat(salary);
        if (!isNaN(salary)) {
            this.salary = salary;
        }
        return salary;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

}

// Collect employee data
const collectEmployees = function () {
    let employeesArray = [];

    while (true) {
        let employee = new Employee()
        if (employee.setFirstName() === null
            || employee.setLastName() === null
            || employee.setSalary() === null) {
            break;
        }
        employeesArray.push(employee);
        if(!confirm("Would you like to add another employee")) {
          break;
        }
    }
    displayEmployees(employeesArray);
    return employeesArray;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
    if (employeesArray.length === 0) {
        console.log("The company has no employees, so technically, the average salary is infinite :)")
        return;
    }
    const averageSal = employeesArray.reduce((total, employee) => total + employee.salary, 0) / employeesArray.length;
    console.log(`The average employee salary between our ${employeesArray.length} employees is ${averageSal}.`);
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
    if (employeesArray.length === 0) {
        console.log(`The company has no employees, so there are no winners :(`);
        return;
    }
    const randomIndex = Math.floor(Math.random() * employeesArray.length);
    const randomEmployee = employeesArray[randomIndex];
    console.log(`Congratulations to ${randomEmployee.fullName} our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);