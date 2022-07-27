var roleLogistics = {

    /** @param {Creep} creep **/
    run: function(creep){
        //take energy from storages and transfer it to spawns and towers
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (Structure) => {
                return (Structure.structureType == STRUCTURE_CONTAINER) && 
                    Structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });

        const towers = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (Structure) => {
                return (Structure.structureType == STRUCTURE_TOWER) && 
                    Structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });

        const spawns = creep.room.find(FIND_STRUCTURES, {
            filter: (Structure) => {
                return (Structure.structureType == STRUCTURE_SPAWN ||
                    Structure.structureType == STRUCTURE_EXTENSION) && 
                    Structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        if (creep.store.getFreeCapacity() > 0){
            var closestContainer = creep.pos.findClosestByPath(containers);
            //check for empty containers as well
            if(creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestContainer);
            }
        }
        else{
            for(spawn in spawns){
                if(!(spawn.getFreeCapacity() < 0)){
                    if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(spawn);
                    }
                }
            }
            for(tower in towers){
                if(!tower.getFreeCapacity() < 0){
                    if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(tower);
                    }
                }
            }
        }
    }
}

module.exports = roleLogistics;