const { filter } = require("lodash");

//main module should be very little here that actually controls anything
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleDefender = require("role.defender");
const buildBasic = require("build.basic");

//setting base minimum numbers.
var minHarvesters = 5;
var minUpgraders = 5;
var minBuilders = 3;
var minDefenders = 5;

module.exports.loop = function () {
	// Your code goes here

	//clearing out the dead creeps names so that we can use them again if needed
	for(var name in Memory.creeps){
		if(!Game.creeps[name]){
			delete Memory.creeps[name];
			console.log('clearing the memory of dead creeps, name: ' + name);
		}
	}

	//number of harvesters in play
	var harvesters = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'harvester');
	console.log('Harvesters #: ' + harvesters.length);

	//number of upgraders in play
	var upgraders = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'upgrader');
	console.log('Upgraders #: ' + upgraders.length);

	//number of builders in play
	var builders = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'builder');
	console.log('Builders #: ' + builders.length);

	var defenders = _.filter(Game.creeps, (creep) => 
	creep.memory.role == 'dDrone');
	console.log('Defenders #: ' + defenders.length);

	//number of available energy units across the owned rooms.
	for(var name in Game.rooms){
		console.log('Room ' + name+ ' has ' + 
			Game.rooms[name].energyAvailable + ' energy');
	}

	if(harvesters.length < minHarvesters) {
		var newName = 'Harvester' + Game.time;
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, 
			{memory: {role: 'harvester'}});
	}
	else if(upgraders.length < minUpgraders){
		var newName = 'Upgrader' + Game.time;
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, 
			{memory: {role: 'upgrader'}});
	}
	else if(builders.length < minBuilders){
		var newName = 'Builder' + Game.time;
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, 
			{memory: {role: 'builder'}});
	}
	else if(defenders.length < minDefenders){
		var newName = 'Defender' + Game.time;
		//order of parts is important in combat
		Game.spawns['Spawn1'].spawnCreep([TOUGH, MOVE, ATTACK, RANGED_ATTACK], newName, 
			{memory: {role: 'dDrone'}});
	}

	if(Game.spawns['Spawn1'].spawning){
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
	}

	//assigning role ai to creeps.
	for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
		if(creep.memory.role == 'builder'){
			roleBuilder.run(creep);
		}
		if(creep.memory.role == 'dDrone'){
			roleDefender.run(creep);
		}
    }

	buildBasic.run();
}