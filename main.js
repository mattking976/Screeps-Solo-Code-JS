const { filter } = require("lodash");

//main module should be very little here that actually controls anything
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
const roleHauler = require("role.haulers");
const roleTower = require("role.tower");

//setting base minimum numbers.
var minHarvesters = 3;
var minHaulers = 3;
var minUpgraders = 3;
var minBuilders = 5;

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

	//number of haulers in play
	var haulers = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'hauler');
	console.log('Haulers #: ' + haulers.length);

	//number of upgraders in play
	var upgraders = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'upgrader');
	console.log('Upgraders #: ' + upgraders.length);

	//number of builders in play
	var builders = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'builder');
	console.log('Builders #: ' + builders.length);

	//number of available energy units across the owned rooms.
	for(var name in Game.rooms){
		console.log('Room ' + name+ ' has ' + 
			Game.rooms[name].energyAvailable + ' energy');
	}

	if(harvesters.length < minHarvesters) {
		var newName = 'Harvester' + Game.time.toString();
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, 
			{memory: {role: 'harvester'}});
	}
	else if(haulers.length < minHaulers){
		var newName = 'Hauler' + Game.time.toString();
		Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, 
			{memory: {role: 'hauler'}});
	}
	else if(upgraders.length < minUpgraders){
		var newName = 'Upgrader' + Game.time.toString();
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, 
			{memory: {role: 'upgrader'}});
	}
	else if(builders.length < minBuilders){
		var newName = 'Builder' + Game.time.toString();
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, 
			{memory: {role: 'builder'}});
	}

	if(Game.spawns['Spawn1'].spawning){
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
	}
	
	roleTower.run();

	//assigning role ai to creeps.
	for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
			continue
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
		    continue
        }
		if(creep.memory.role == 'builder'){
			roleBuilder.run(creep);
			continue
		}
		if(creep.memory.role == 'hauler')
		{
			roleHauler.run(creep);
			continue
		}
    }
}