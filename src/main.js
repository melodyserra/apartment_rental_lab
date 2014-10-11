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

// building.addTenant("devin", "14");

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
    var evictTenant;
    
    people.forEach(function(person){
      if(tenant_name == person.name){
        console.log("Found tenant");
        evictTenant = person;
      }
    });

    building.units.forEach(function(unit){
      if((evictTenant == unit.tenant)){
        console.log("Found unit");
        building.removeTenant(unit, evictTenant);
      }
    });
  },
  null, 
  [{'name': 'tenant_name', 'type': 'string'}] 
);

//evict tenant 1st version using for loop.
// menu.addItem('Evict tenant', 
//   function(tenant_name) {

//     var unitEvictTenant;
//     var evictTenant;
//       //go through the tenants and check tenant_name is in the people array
//       //we want to store the object we get
//     for (var i = 0; i <people.length; i++) {
//        if(tenant_name == people[i].name) {
//         evictTenant = people[i];
//         }
//     }
//     for (var i =0; i < building.units.length; i++) {
//       if((evictTenant == building.units[i].tenant)){
//         unitEvictTenant = building.units[i]; 
//         building.removeTenant(unitEvictTenant, evictTenant);
//       }
//     }
//       //go through the units and see which unit the tenant is in
//       //set the tenant onject within the unit to null
//       //Similar to above, use building's removeTenant() function.
//       console.log("Implement me");
//     },
//     null, 
//     [{'name': 'tenant_name', 'type': 'string'}] 
// );

menu.addItem('Show total sqft rented', 
  function() {
    var rentedSqft = 0;
    building.units.forEach(function(unit) {
      rentedSqft = rentedSqft + unit.sqft;
    });
    console.log(rentedSqft);
    return rentedSqft;
    // console.log("Implement me");
  }
);

menu.addItem('Show total yearly income', 
 function() {
    var rent = 0;
    building.units.forEach(function(unit) {
      if(unit.available()){
      rent = rent + unit.rent;
      }
    });
    console.log(rent);
    return rent;
    // console.log("Implement me");
  }
);

menu.addItem('Show rented(unavailable) units', 
      function() {
      // console.log("Implement me");
      var unavailable = building.rentedUnits();
      for (var i =0; i<unavailable.length;i++) {
        console.log(" tenant: " + unavailable[i].tenant +
              " num: " + unavailable[i].number + 
              " sqft: " + unavailable[i].sqft +
               " rent: $" + unavailable[i].rent);
             }
          }
);

    // console.log("Implement a feature that you find is useful");

// *******************************
menu.addDelimiter('*', 40);

menu.start();