var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                var closestRepairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (Structure) => Structure.hits < Structure.hitsMax
                });
                if(creep.repair(closestRepairs) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestRepairs);
                }
            }
	    }
	    else {
	        const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: Resource => Resource.resourceType == RESOURCE_ENERGY
            });

            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
            if(creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDroppedEnergy);
            }
	    }
	}
};

module.exports = roleBuilder;