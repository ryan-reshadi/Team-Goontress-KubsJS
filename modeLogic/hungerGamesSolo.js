
ServerEvents.customCommand('initHGSolo', event => {
    global.joinLogic = (event, playerName) => {
        runCommand(event,"gamemode spectator "+playerName.username);
    }
    runCommand(event,'difficulty hard');
    runCommand(event,'gamerule fallDamage true')
    runCommand(event,)
});

ServerEvents.customCommand('tickHGSolo', event => {
    runCommand("/execute as @a[scores={deaths=1..}] run gamemode spectator @s")
});