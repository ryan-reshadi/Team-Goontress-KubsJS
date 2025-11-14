global.runcommand = (event, command) => {
    event.server.runCommandSilent(command)
}

ServerEvents.customCommand('InitFreezeTag', event => {
    global.taggleable = true;
    runCommand(event, `gamerule pvp true`);
    runCommand(event, `gamerule fallDamage false`);
    runCommand(event, `difficulty peaceful`);
    runCommand(event, `gamerule doDaylightCycle false`);
    runCommand(event, `/team join Alive @a[team=!Spectator]`);
    runCommand(event, '/tag @r[team=Alive] add tagger');
    runCommand(event, `effect give @a[tag=tagger] minecraft:speed infinite 1 true`);
})
ServerEvents.customCommand('InitSpleef', event => {
    event.server.runCommandSilent(`gamerule pvp false`)
    event.server.runCommandSilent(`gamerule fallDamage true`)
    event.server.runCommandSilent(`difficulty peaceful`)
    event.server.runCommandSilent(`gamerule doDaylightCycle false`)

})
const placeTemplate = (event, templateName) => {
    runCommand(event, `kill @e[type=!minecraft:player]`);
    switch (templateName) {
        case "minigames":
            event.server.runCommandSilent(`/place template minecraft:map -50 -26 -17`)
    }
    
}