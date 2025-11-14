global.resetGame = (event) => {
    global.joinLogic = (event, playerName) => { }
    global.leaveLogic = (event, playerName) => { }
    runCommand(event, `gamerule pvp false`);
    runCommand(event, `gamerule fallDamage true`);
    runCommand(event, `difficulty peaceful`);
    runCommand(event, `/team join Lobby @a[team=!Spectator]`);
    runCommand(event, `/tag @a remove tagger`);
	
    runCommand(event, `effect clear @a`);
    runCommand(event, '/execute in minecraft:overworld run tp @a[team=!Spectator] -94.37 1.00 -41.34 -889.01 2.52');
}

const resetTags = (event) {
	
}