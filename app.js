const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const questions = ([
    {
        type: "input",
        messgae: "Let's build your software engineering team! Please enter the employee's name:",
        name: "name",
    },
    {
        type: "input",
        message: "Please enter the employee's email:",
        name: "email",
    },
    {
        type: "input",
        message: "Please enter the employee's ID #:",
        name: "id",
    },
    {
        type: "list",
        message: "Please select the employee's role from the list below",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        name: "role",
    },
    {
        type: "input",
        message: "Please enter the manager's office number:",
        name: "managerOffice",
        when: (data) => data.role === "Manager",
    },
    {
        type: "input",
        message: "Please enter the engineer's github username:",
        name: "github",
        when: (data) => data.role === "Engineer",
    },
    {
        type: "input",
        message: "Please enter the intern's school name:",
        name: "school",
        when: (data) => data.role === "Intern",
    }
]);
function init() {
    inquirer.prompt(questions).then((data) => {
        if (data.role === "Manager") {
            const manager = new Manager(data.name, data.id, data.email, data.managerOffice);
            employees.push(manager);
        } else if (data.role === "Engineer") {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            employees.push(engineer);
        } else if (data.role === "Intern") {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            employees.push(intern);
        } else {
            console.log("Please select a role from the provided list.")
        }
        
    })
}

function createTeam() {
    const member = render(employees)
    fs.writeFile(outputPath, member, (err) => {
        if (err) throw err;
        console.log("Your team has been built!")
    })
}

init();
createTeam();