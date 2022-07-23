const { filter } = require("lodash");

//harvester ai code
var roleTower = {

    /**  **/
    run: function() {

        var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

        console.log(towers);
        for (let index = 0; index < towers.length; index++) {
            var closestDamagedStructure = towers[index].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            
            if(closestDamagedStructure) {
                towers[index].repair(closestDamagedStructure);
            }

            var closestHostile = towers[index].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                towers[index].attack(closestHostile);
            }
        }
    }
};

module.exports = roleTower;