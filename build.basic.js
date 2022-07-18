const { filter } = require("lodash");

var buildBasic = {
    /**  **/ //params
    run: function(){
        //RCL level
        var rclLvl = Game.spawns['Spawn1'].room.controller.level;
        var spawnPos = [Game.spawns['Spawn1'].pos.x, Game.spawns['Spawn1'].pos.y];
        console.log('room level: ' + rclLvl);

        switch (rclLvl) {
            case 1:
                for (let indexX = spawnPos.x; indexX < (spawnPos[0] + 7); indexX++) {
                    for (let indexY = spawnPos.y; indexY < (spawnPos[1] + 7); indexY++) {
                        Game.rooms[0].createConstructionSite(indexX, indexY, STRUCTURE_ROAD);
                    }                    
                }
                break;
        
                case 2:
                for (let indexX = spawnPos.x; indexX < (spawnPos[0] + 7); indexX++) {
                    for (let indexY = spawnPos.y; indexY < (spawnPos[1] + 7); indexY++) {
                        Game.rooms[0].createConstructionSite(indexX, indexY, STRUCTURE_ROAD);
                        console.log('road placed at: ' + indexX + ', ' + indexY);
                    }                    
                }
                break;

            default:
                break;
        }
    }
}

module.exports = buildBasic;