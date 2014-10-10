var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  Person.call(this, name, contact);
  this.buildings = [];
  // inherit name and contact
  // ...
  // manager manages an 'array' of buildings
  // ...

}

// Set prototype and constructor
// ...
Manager.prototype = new Person;
Manager.prototype.constructor = Manager;

Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
  // ...
  if(building instanceof Building  && this.buildings.indexOf(building) === -1) {
    this.buildings.push(building);
  }
  return this.buildings;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  // ...
  if(this.buildings.indexOf(building) >= 0){
    this.buildings.splice(this.buildings.indexOf(building), 1);
  }
  else {
    console.log("building was not in the array");
  }

  return this.buildings;
};

module.exports = Manager;