//main module should be very little here that actually controls anything
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.harvester');

module.exports.loop = function () {
	// Your code goes here

	//checking creep role
	for(var name in Game.creeps){
		var creep = Game.creeps[name];
		if(creep.memory.role == 'harvester'){
			roleHarvester.run(creep);
		}
		if(creep.memory.role == 'upgrader'){
			roleUpgrader.run(creep);
		}
	}
}