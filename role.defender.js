const { filter } = require("lodash");

//harvester ai code
var roleDefender = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
        //console.log(enemyCreeps);
        creep.moveTo(creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS));
        creep.rangedAttack(creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS));
        creep.attack(creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS));
    }
};

module.exports = roleDefender;