ServerEvents.customCommand('TickFreezeTag', event => {
    runCommand(event, 'gamemode spectator @a[scores = {deaths=1..}]');
    runCommand(event,)
})

