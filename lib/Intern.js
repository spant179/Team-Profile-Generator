const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name, id, email, schoolName){
        super(name,id,email);
        this.schoolName = schoolName;
    }

    getDesignation(){
        return "Intern";
    }

    getSchoolname(){
        return this.schoolName;
    }
}


module.exports = Intern;