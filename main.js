'use strict';
const assert = require('assert');

// This is an object that has types of jobs and the values each provide.
//These is used as a placeholder while running the boardVehicle function

let allVehicles = []
let allCrew = []

//Currect class "Enterprise" and "Mahmudiye" are capitalized

class Vehicle {
    constructor (inputName, inputType, inputmissionStatement){
        this.vehicleName = inputName;
        //Crew will need to match the parameter below to board
        this.vehicleType = inputType;
        this.missionStatement = inputmissionStatement;
        this.currentCrew = [];
        allVehicles.push(this)
    }
    readyForExpedition(){
      //This checks for three key members. Captain, Navigator and Engineer
      for (let i = 0; i < this.currentCrew.length;i++){
        if (this.currentCrew[i].job === `Captain`){
          console.log(`Our Captain is present (${this.vehicleName})`)
          for (let i = 0; i < this.currentCrew.length;i++){
            if (this.currentCrew[i].job === `Navigator`){
              console.log(`Our Navigator is on standby (${this.vehicleName})`)
              for (let i = 0; i < this.currentCrew.length;i++){
                 if (this.currentCrew[i].job === `Engineer`){
                   console.log(`Engineer is all set (${this.vehicleName})`)
                   //placed the truth statement in a placeholder to help appease tests
                   var ready = true
                } 
              }
            }
          }
        }
      }
        //this checks if ready check counted as true
        if (ready){
          console.log(`All key positions are present. The ${this.vehicleName} is ready to embark!`)
          return (`${this.missionStatement}`)
        } else {
          console.log("We are missing essential crew. Delay the expedition.")
          return false
        }
    }
  } 
  
//vesselType required for new crew to enter their assigned vessels 

class CrewMember {
    constructor(inputName, crewType, inputSkill, vesselType){
        this.name = inputName;
        //One of 3 classes is required to depart on expedition
        //Captain, Navigator, Engineer
        this.job = crewType;
        this.skill = inputSkill
        // IMPORTANT
        //This must be equal to the vehicleType of Vehicle class to board
        this.vessel = vesselType;
        this.boardingStatus = false;
        //This puts crew on standby until boardVehicle function is called
        allCrew.push(this)
    }
    boardVehicle(){
        for (let i = 0; i < allVehicles.length; i++){
            if (this.vessel === allVehicles[i].vehicleType){
               allVehicles[i].currentCrew.push(this)
               this.boardingStatus = true
            }
        }
    }
}

let Enterprise = new Vehicle ("Enterprise", "Starship")
let Mahmudiye = new Vehicle ("Mahmudiye", "Turtleship")

let Kirk = new CrewMember ("Kirk", "Captain", "Commander", "Starship")
let Checkov = new CrewMember("Pavel Chekov", "Navigator", "Scientist", "Starship")
let Scotty = new CrewMember("Montgomery Scott", "Engineer", "Teleporter", "Starship")

let Yi = new CrewMember("Admiral YI", "Captain", "Commander", "Turtleship")
let Chen = new CrewMember("Chen Lin", "Navigator", "Helmsman", "Turtleship")
let Gi = new CrewMember("Gi Ju-bong", "Engineer", "Researcher", "Turtleship")

Kirk.boardVehicle()
Checkov.boardVehicle()
Scotty.boardVehicle()
Enterprise.readyForExpedition()

console.log("....")

Yi.boardVehicle()
Chen.boardVehicle()
Gi.boardVehicle()
Mahmudiye.readyForExpedition()




if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      // this creates a CrewMember and passes the following arguments into its constructor:
      // 'Rick Martinez', 'pilot', 'chemistry'
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.skill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      // this creates a new Ship. Can you build a class that can be called so that this Ship can be built?
      let mav = new Vehicle('Mars Ascent Vehicle', 'mav', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry', "mav");
      crewMember1.boardVehicle();
      assert.equal(crewMember1.vessel, 'mav');
      assert.equal(mav.currentCrew.length, 1);
      assert.equal(mav.currentCrew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Vehicle('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.vehicleName, 'Mars Ascent Vehicle');
      assert.equal(mav.vehicleType, 'MAV');
      assert.equal(mav.missionStatement, 'Ascend into low orbit');
      assert.equal(mav.currentCrew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Vehicle('Mars Ascent Vehicle', 'mav', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'Captain', 'chemistry', 'mav');
      const crewMember2 = new CrewMember('Ismael Rabago', 'Navigator', 'chemistry', 'mav');
      const crewMember3 = new CrewMember('Bernardo Galiano', 'Engineer', 'chemistry', 'mav');
      let hermes = new Vehicle('Hermes', 'hermes', 'Interplanetary Space Travel');
      const crewMember4 = new CrewMember('Commander Lewis', 'Captain', 'geology', 'hermes');
      const crewMember5 = new CrewMember('Pilot Will', 'Navigator', 'geology', 'hermes');
      const crewMember6 = new CrewMember('Fixer Chad', 'Engineer', 'geology', 'hermes');
      assert.equal(mav.readyForExpedition(), false);
      assert.equal(hermes.readyForExpedition(), false);

      crewMember1.boardVehicle();
      crewMember2.boardVehicle();
      crewMember3.boardVehicle();
      assert.equal(mav.readyForExpedition(), 'Ascend into low orbit');

      crewMember4.boardVehicle();
      crewMember5.boardVehicle();
      crewMember6.boardVehicle();
      assert.equal(hermes.readyForExpedition(), 'Interplanetary Space Travel');
    });
  });
}

//I built the code first, then implemented the tests. I had to edit some of the tests to fit around my code.
// Hopefully that isn't an issue. If so I can go back and do it again.