import inquirer from 'inquirer';
import db from './db.js';
import { QueryResult } from 'pg';

// Function to display the main menu
function mainMenu(): void {
    console.log("Starting main menu...");
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        },
    ])
    .then((answers: { action: string }) => {
        console.log(answers);
        switch (answers.action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end(); // Closes the database connection
                console.log('Goodbye!');
                process.exit();
        }
    });
}

// Function to view all departments
function viewDepartments(): void {
    db.query('SELECT * FROM department', (err: Error | null, res: QueryResult) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu(); // Return to main menu
    });
}

// Function to view all roles
function viewRoles(): void {
    db.query('SELECT * FROM role', (err: Error | null, res: QueryResult) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
}

// Function to view all employees
function viewEmployees(): void {
    db.query(`
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `, (err: Error | null, res: QueryResult) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
    });
}

// Function to add a department
function addDepartment(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department:',
        },
    ])
    .then((answer: { departmentName: string }) => {
        db.query('INSERT INTO department (name) VALUES ($1)', [answer.departmentName], (err: Error | null) => {
            if (err) throw err;
            console.log('Department added!');
            mainMenu();
        });
    });
}

// Function to add a role
function addRole(): void {
    db.query('SELECT * FROM department', (err: Error | null, res: QueryResult) => {
        if (err) throw err;
        const departments = res.rows.map((department: { id: number; name: string }) => ({
            name: department.name,
            value: department.id,
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the title of the new role:',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary for the new role:',
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Choose a department for this role:',
                choices: departments,
            },
        ])
        .then((answers: { roleTitle: string; roleSalary: string; departmentId: number }) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
            [answers.roleTitle, answers.roleSalary, answers.departmentId], (err: Error | null) => {
                if (err) throw err;
                console.log('Role added!');
                mainMenu();
            });
        });
    });
}

// Function to add an employee
function addEmployee(): void {
    db.query('SELECT * FROM role', (err: Error | null, res: QueryResult) => {
        if (err) throw err;
        const roles = res.rows.map((role: { id: number; title: string }) => ({
            name: role.title,
            value: role.id,
        }));

        db.query('SELECT * FROM employee', (err: Error | null, res: QueryResult) => {
            if (err) throw err;
            const managers = res.rows.map((employee: { id: number; first_name: string; last_name: string }) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee:',
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Choose a role for the employee:',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Choose a manager for the employee (or select None):',
                    choices: [...managers, { name: 'None', value: null }],
                },
            ])
            .then((answers: { firstName: string; lastName: string; roleId: number; managerId: number | null }) => {
                db.query(
                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
                    [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
                    (err: Error | null) => {
                        if (err) throw err;
                        console.log('Employee added!');
                        mainMenu();
                    }
                );
            });
        });
    });
}

// Function to update an employee's role
function updateEmployeeRole(): void {
    db.query('SELECT * FROM employee', (err: Error | null, res: QueryResult) => {
        if (err) throw err;
        const employees = res.rows.map((employee: { id: number; first_name: string; last_name: string }) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));

        db.query('SELECT * FROM role', (err: Error | null, res: QueryResult) => {
            if (err) throw err;
            const roles = res.rows.map((role: { id: number; title: string }) => ({
                name: role.title,
                value: role.id,
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Choose an employee to update:',
                    choices: employees,
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Choose the new role for the employee:',
                    choices: roles,
                },
            ])
            .then((answers: { employeeId: number; roleId: number }) => {
                db.query('UPDATE employee SET role_id = $1 WHERE id = $2', 
                [answers.roleId, answers.employeeId], (err: Error | null) => {
                    if (err) throw err;
                    console.log('Employee role updated!');
                    mainMenu();
                });
            });
        });
    });
}

mainMenu();