var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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

module.exports = roleUpgrader;