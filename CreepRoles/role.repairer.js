var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	    }

	    if(creep.memory.repairing) {
	        var closestRepairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (Structure) => Structure.hits < Structure.hitsMax
            }); 
            if(creep.repair(closestRepairs) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestRepairs);
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

module.exports = roleRepairer;