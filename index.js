var inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];

function init(){
    openHTML();
    addTeam();
}

const questions = [
    {
        type: 'list',
	    name: 'designation',
	    message: "Choose designation of team member",
	    choices: ['Manager','Engineer','Intern']
    },
    {
        type: 'input',
	    name: 'name',
	    message: "Enter name of team member",
	    validate: function (answer) {
           if(answer.length < 1){
		    return console.log("Name for team member is required!");
		    }
		return true;
        }
    },
    {
        type: 'input',
	    name: 'id',
	    message: "Enter ID of team member",
	    validate: function (answer) {
           if(answer.length < 1){
		    return console.log("Team member ID is required!");
		    }
		return true;
        }
    },
    {
        type: 'input',
	    name: 'email',
	    message: "Enter email of team member",
	    validate: function (answer) {
           if(answer.length < 1){
		    return console.log("Team member email is required!");
		    }
		return true;
        }
    }
];

function addThem(details,addMore){
    let newMember;
    if(details.designation === "Manager"){
        newMember = new Manager(details.name,details.id,details.email,details.extra.extra);
    }
    else if(details.designation === "Engineer"){
        newMember = new Engineer(details.name,details.id,details.email,details.extra.extra);
    }
    else{
        newMember = new Intern(details.name,details.id,details.email,details.extra.extra);
    }
    employees.push(newMember);
    addTheseHTML(newMember)
    if(addMore.addMore === "yes"){
        addTeam();
    }
    else{
        closeHTML();
    }
    
}

async function addTeam(){
    try{
        const inputTeam = await inquirer.prompt(questions);
        if(inputTeam.designation === "Manager"){
            inputTeam.extra = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'extra',
                    message: "Enter manager's office phone number",
                    validate: function (answer) {
                        if(answer.length < 1){
                         return console.log("Manager's office number is required!");
                         }
                     return true;
                     }
                }
            ])
        }
        else if(inputTeam.designation === "Engineer"){
            inputTeam.extra = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'extra',
                    message: "Enter engineer's GitHub username",
                    validate: function (answer) {
                        if(answer.length < 1){
                         return console.log("Engineer's GitHub username is required!");
                         }
                     return true;
                     }
                }
            ])
        }
        else {
            inputTeam.extra = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'extra',
                    message: "Enter intern's school name",
                    validate: function (answer) {
                        if(answer.length < 1){
                         return console.log("Intern's school name is required!");
                         }
                     return true;
                     }
                }
            ])
        }
        const addMore = await inquirer.prompt([
            {
                type: 'list',
                name: 'addMore',
                choices: ['yes','no']
            }
        ])
        addThem(inputTeam,addMore);
    } catch(error){
        console.log(error);
    }
};

function openHTML(){
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <title>Team Profile Generator</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Details</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./index.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function closeHTML(){
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

async function addTheseHTML(newMember){
    try{
        const name = newMember.getName(); 
        const designation = newMember.getDesignation();
        const id = newMember.getId();
        const email = newMember.getEmail();
        let data = "";
        if (designation === "Manager") {
            const phoneNumber = newMember.getPhonenumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <a class="list-group-item" href=mailto:${email}>Email Address: ${email}</a>
                <li class="list-group-item">Office Phone: ${phoneNumber}</li>
            </ul>
            </div>
        </div>`;
        } else if (designation === "Engineer") {
            const githubUsername = newMember.getUsername();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <a class="list-group-item" href=mailto:${email}>Email Address: ${email}</a>                
                <a class="list-group-item" href=https://github.com/${githubUsername} target="_blank">GitHub: ${githubUsername}</a>
            </ul>
            </div>
        </div>`;
        } else {
            const schoolName = newMember.getSchoolname();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <a class="list-group-item" href=mailto:${email}>Email Address: ${email}</a>
                <li class="list-group-item">School: ${schoolName}</li>
            </ul>
            </div>
        </div>`
        }
        appendThem(data);
    }catch(error){
        console.log(error);
    }
    
}

async function appendThem(data){
    try{
        fs.appendFileSync("./index.html", data , (err) => {
            if(err) 
                throw err;
        });
    }catch(error){
        console.log(error);
    }
}

init();