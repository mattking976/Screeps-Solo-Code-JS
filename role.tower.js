const { filter } = require("lodash");

//harvester ai code
var roleTower = {

    /**  **/
    run: function() {

        const towers = _.find(FIND_MY_STRUCTURES, {
            filter: (Structure) => {
                return (
                    Structure.structureType == STRUCTURE_TOWER
                )
            }
        });

       for(tower in towers){
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
       }
    }
};

module.exports = roleTower;