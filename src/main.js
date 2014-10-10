"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

people.push(new app.Person("Anna", "765-4321"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
people.push(new app.Tenant("Steve", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('(implement me) Show available units', 
  function() {
      // console.log("Implement me");
      var available = building.availableUnits();
      for (var i =0; i<available.length;i++) {
        console.log(" tenant: " + building.units[i].tenant +
              " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
      }

      }
);

menu.addItem('(implement me) Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
      
      // look through the people array 
      for (var i =0; i < people.length; i++) {
        // see if our tenant_name parameter is equal to any of the names of the people in my array
        if(tenant_name === people[i].name ){
        // if we find a match - add a reference by creating a new instance of the Person
        // passing in the parameters ref_name and ref_contact for name and contact
        var ref = new app.Person(ref_name, ref_contact);
        people[i].addReference(ref);
        // get out of the loop
        break;
      }
    }
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('(implement me) Move tenant in unit', 
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
      // console.log("Implement me.");
      
      // go though our units array and see if our parameter "unit_number" matches any of the units in our array
      // if does, we want to store that unit that we found
      // we want to then see if the unit is available if(unit.available()).....

      // if the unit exists and is available, we also want to make sure that our "tenant_name" is in the people array
      // we also want to store the tenant object that we get

      // unit.tenant = tenant

      var unitNewTenant = null;
      var newTenant = null;

      for (var i =0; i < building.units.length; i++) {
        if((unit_number == building.units[i].number && building.units[i].available())){
          console.log("Found unit");
          unitNewTenant = building.units[i];
        }
      }

      for (var i =0; i < people.length; i++) {
        if(tenant_name === people[i].name){
          console.log("Found tenant");
          newTenant = people[i];
        }
      }
      
      unitNewTenant.tenant = newTenant;
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      // console.log("Implement me");

      var unitEvictTenant = null;
      var evictTenant = null;

      for (var i =0; i < building.units.length; i++) {
        if((unit_number == building.units[i].number && building.units[i].available())){
          console.log("Found unit");
          unitNewTenant = building.units[i];
        }
      }

      for (var i =0; i < people.length; i++) {
        if(tenant_name === people[i].name){
          console.log("Found tenant");
          evictTenant = people[i];
        }
      }
      
      unitNewTenant.removeTenant = ;
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Show total sqft rented', 
  function() {
      console.log("Implement me");
    } 
);

menu.addItem('(implement me) Show total yearly income', 
  function() {
      // Note: only rented units produce income
      console.log("Implement me.");
    } 
);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();