# Employee Organizer Pro

![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Walkthrough](#walkthrough)
6. [License](#license)
7. [Contributing](#contributing)
8. [Tests](#tests)
9. [Questions](#questions)

## Description
Employee Organizer Pro is a command-line application for effortless management of company employees, departments, and roles. Built using Node.js, Inquirer, and PostgreSQL, this tool allows users to seamlessly  view, add, and update employee, department, and role data, helping business owners efficiently organize and plan their workforce.

## Features
- View detailed employee information, including first name, last name, role, and department.
- Add new employees, roles, and departments to the organization effortlessly.
- Update existing employee roles and departments with ease.
- Access a comprehensive overview of all roles and departments within the organization.
- Navigate smoothly through a user-friendly command-line interface powered by Inquirer prompts.

## Installation
To use the application, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd employee-organizer-pro`
3. Install the necessary dependencies: `npm install`
4. Set up your PostgreSQL database and configure the connection settings in your database configuration file.
5. Start the application: `node index`

## Usage
To start the application, run the following command: `node index`

When the application launches, you will be prompted with options to manage employees, departments, and roles.

- To add a department, choose the appropriate option, enter the department name, and confirm to add it.
- To add a role, select the corresponding option, input the role title, salary, and associated department ID, and then confirm to create the new role
- To add an employee, choose the relevant option, enter the first name, last name, role ID, and manager ID (if applicable), and confirm to add the new employee.
- Update an employee's role, select the option to update an employee role, provide the employee ID and new role ID, and confirm the update.
- To view all departments, select the option to display current departments in the database.
- To see all roles, choose the option to display current roles in the database.
- To view all employees, select the option to display current employees in the database. 

<img width="327" alt="Add an employee" src="https://github.com/user-attachments/assets/e0710b25-5864-4e5a-9e89-796420a10ad9">

Example of adding a employee

<img width="634" alt="View all employees" src="https://github.com/user-attachments/assets/c4a670cf-4207-418b-b35c-ad54a9fded55">

Example of view all employees

## Walkthrough
Here’s a video walkthrough showing the functionality of the Employee Organizer Pro, including how to invoke the application, enter responses, and manage employee data: https://drive.google.com/file/d/1NwjasOxnS3NtGYbwDjg6z6LKcXdb24d_/view?usp=sharing

## License
This project is licensed under the MIT License, which allows you to freely use, modify, and distribute this software, provided proper attribution is given.

## Contributing
Contributions are welcome!  If you'd like to contribute to this project, follow the steps below.

- Step 1: Fork the repository.
- Step 2: Create a feature branch: git checkout -b feature/new-feature
- Step 3: Commit your changes: git commit -m "Add new feature"
- Step 4: Push to the branch: git push origin feature/new-feature
- Step 5: Open a pull request.

## Tests
Currently, this project does not have any automated tests. However, if you'd like to add tests, feel free to contribute! You can set up testing using a framework like Mocha or Jest.

To run any test files in the future, use: npm test

## Questions
If you have any questions about the repository, feel free to reach out by opening an issue or contacting me directly at cheyennaraelynn@gmail.com You can also find more of my work on GitHu at https://github.com/RaeOfChey.
