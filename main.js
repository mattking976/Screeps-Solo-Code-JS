//main module should be very little here that actually controls anything
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
	// Your code goes here

	for(var name in Game.rooms){
		console.log('Room ' + name+ ' has ' + 
			Game.rooms[name].energyAvailable + ' energy');
	}

	//checking creep role
	for(var name in Game.creeps){
		var creep = Game.creeps[name];
		if(creep.memory.role == 'harvester'){
			roleHarvester.run(creep);
		}
		if(creep.memory.role == 'upgrader'){
			roleUpgrader.run(creep);
		}
		if(creep.memory.role == 'builder'){
			roleBuilder.run(creep);
		}
	}
}