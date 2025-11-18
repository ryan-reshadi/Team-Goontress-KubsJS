// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded server scripts)')

ServerEvents.customCommand('testingnum1', event => {
    event.server.tell("§aCondition Met: At least one player is on the Red team.");
    const redTeamPlayers = event.server.getPlayers('@a[team=Red]');
    event.server.tell("§aCondition Met: At least one player is on the Red team.");

    // The condition check: If the array is NOT empty
    if (redTeamPlayers.length > 0) {

        // --- KubeJS Code Runs Here ---

        // Example: Loop through the found players
        redTeamPlayers.forEach(player => {
            event.server.tell(`§7Found player: ${player.username}`);
        });

    } else {
        event.server.tell("§cCondition Not Met: No players on the Red team found.");
    }

});