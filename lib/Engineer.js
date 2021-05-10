const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, githubUsername){
        super(name,id,email);
        this.githubUsername = githubUsername;
    }

    getDesignation(){
        return "Engineer";
    }

    getUsername(){
        return this.githubUsername;
    }
}


module.exports = Engineer;