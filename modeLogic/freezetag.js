// damage_handler.js
var taggleable = false;


ServerEvents.customCommand('InitFreezeTag', event => {
    taggleable = true;
    global.enableTags(['tagged', 'tagger']);
    runCommand(event, `gamerule pvp true`);
    runCommand(event, `gamerule fallDamage false`);
    runCommand(event, `difficulty peaceful`);
    runCommand(event, `gamerule doDaylightCycle false`);
    runCommand(event, `/team join Alive @a[team=!Spectator]`);
    runCommand(event, '/tag @r[team=Alive] add tagger');
    runCommand(event, `effect give @a[tag=tagger] minecraft:speed infinite 1 true`);
})


EntityEvents.hurt(event => {
    if (!taggleable) {
        return;
    }

    const target = event.entity;
    const name = target.username;
    const targetTag = "@r[name=" + name + ",tag=!tagger]";

    event.server.runCommandSilent(`effect give ${targetTag} minecraft:slowness infinite 255 true`);
    event.server.runCommandSilent(`tag ${targetTag} add tagged`);
    event.server.runCommandSilent('effect give ' + targetTag + ' minecraft:glowing infinite 0 true');
    event.cancel();
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('enableTagging') // The name of the command
        .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
        .executes(ctx => toggleTagging()) // Toggle flight for the player that ran the command if the `target` argument isn't included
        .then(Commands.argument('state', Arguments.BOOLEAN.create(event))
            .executes(ctx => enableTagging(Arguments.BOOLEAN.getResult(ctx, 'state'))) // Toggle flight for the player included in the `target` argument
        )
    )

    // Helper function
    const enableTagging = (state) => {
        taggleable = state;
        return 1
    }
    const toggleTagging = () => {
        taggleable = !taggleable;
        return 1
    }
})

// player_to_player_click.js

ItemEvents.entityInteracted(event => {
    if (!taggleable) {
        return;
    }

    const sourcePlayer = event.player
    const targetEntity = event.target
    event.server.runCommandSilent('execute if entity @a[name=' + targetEntity.username + ',tag=tagged] if entity @a[name=' + sourcePlayer.username + ',tag=!tagged,tag=!tagger] run effect clear ' + targetEntity.username + ' minecraft:slowness');
    event.server.runCommandSilent('execute if entity @a[name=' + targetEntity.username + ',tag=tagged] if entity @a[name=' + sourcePlayer.username + ',tag=!tagged,tag=!tagger] run effect clear ' + targetEntity.username + ' minecraft:glowing');
    event.server.runCommandSilent('execute if entity @a[name=' + targetEntity.username + ',tag=tagged] if entity @a[name=' + sourcePlayer.username + ',tag=!tagged,tag=!tagger] run tag ' + targetEntity.username + ' remove tagged');


    event.cancel();
})