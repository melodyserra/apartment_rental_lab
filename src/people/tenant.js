var Person = require("./person.js");

function Tenant(name, contact) {
	Person.call(this, name, contact);
  	this.references = [];
  // inherits name contact from Person
  // ...
  // tennant has 'array' of references
  // ...
};

// Set prototype and constructor
// ...
Tenant.prototype = new Person;
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
  // add reference to references. Reference must be of type Person
  // ...
  if(reference instanceof Person === true  && this.references.indexOf(reference) === -1) {
    this.references.push(reference);
  }
  return this.references;
};

Tenant.prototype.removeReference = function(reference) {
  // remove reference from references.
  // ...
  if(this.references.indexOf(reference) >= 0){
    this.references.splice(this.references.indexOf(reference), 1);
  }
  else {
    console.log("reference was not in the array");
  }

  return this.references;
};

module.exports = Tenant;
