const { filter } = require("lodash");

//harvester ai code
var roleTower = {

    /**  **/
    run: function() {

        var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

        for (let index = 0; index < towers.length; index++) {
            //removing repairing from towers due to the repairer role being implemented
            /*
            var closestDamagedStructure = towers[index].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            
            if(closestDamagedStructure) {
                towers[index].repair(closestDamagedStructure);
            }
            */

            var closestHostile = towers[index].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                towers[index].attack(closestHostile);
            }
        }
    }
};

module.exports = roleTower;