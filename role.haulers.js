var roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep){
        if (creep.store.getFreeCapacity() > 0){
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: Resource => Resource.resourceType == RESOURCE_ENERGY
            });

            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);

            if(creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestDroppedEnergy);
            }
        }
        else{
            const spawns = creep.room.find(FIND_MY_SPAWNS);
            const closestSpawns = creep.pos.findClosestByRange(spawns);

            if(creep.transfer(closestSpawns, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestSpawns);
            }
        }
    }
}

module.exports = roleHauler;