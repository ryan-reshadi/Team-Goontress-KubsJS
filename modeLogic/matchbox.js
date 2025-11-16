var matchbox = true;


ServerEvents.customCommand('InitMatchbox', event => {
    matchbox = true;
    global.enableTags(['spark', 'lit']);
    runCommand(event, `gamerule pvp true`);
    runCommand(event, `gamerule fallDamage false`);
    runCommand(event, `difficulty peaceful`);
    runCommand(event, `gamerule doDaylightCycle false`);
    runCommand(event, `/team join Alive @a[team=!Spectator]`);
    runCommand(event, `tag @r[team=Alive] add spark`);

});


ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('enableMatchbox') // The name of the command
        .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
        .executes(ctx => toggleTagging()) // Toggle flight for the player that ran the command if the `target` argument isn't included
        .then(Commands.argument('state', Arguments.BOOLEAN.create(event))
            .executes(ctx => enableTagging(Arguments.BOOLEAN.getResult(ctx, 'state'))) // Toggle flight for the player included in the `target` argument
        )
    )

    // Helper function
    const enableTagging = (state) => {
        matchbox = state;
        return 1
    }
    const toggleTagging = () => {
        matchbox = !matchbox;
        return 1
    }
})


EntityEvents.death(event => {

    // The entity that died (the victim)
    const victim = event.entity;

    // The source of the damage (e.g., a sword, a lava block, a falling anvil)
    const damageSource = event.source;

    // The actual entity that caused the damage (the player, mob, or projectile)
    const killer = damageSource.actualEntity;

    // --- Logic Check ---

    // Check if the death was caused by an entity (not environmental damage like fire or fall)
    event.server.tell(`§7${victim.name} died due to: ${damageSource.getTrueSource()}`);
    killer.tell(`§aYou defeated ${victim.name}!`);
    event.server.tell(`§e${victim.name} was defeated by ${killer.name}.`);
    event.server.tell(`§7${victim.name} died due to: ${damageSource.type}`);
    if (killer) {

        // 1. Check if the killer is a player
        if (killer.player) {

            // Player-specific actions

        } else {

            // Mob-specific actions (The killer is a non-player entity)
            event.server.tell(`§c${victim.name} was slain by a ${killer.name}.`);
        }

    } else {

        // Killer is null: Death was environmental (fall damage, fire, starvation, etc.)
    }

});

ItemEvents.firstRightClicked(event => {
    if (!matchbox) {
        return;
    }

    if (event.item.id == "supplementaries:candle_holder_yellow") {

        event.player.server.runCommandSilent('/execute if entity @r[name=' + event.player.username + ',tag=lit] run tag ' + event.player.username + ' remove lit');

        event.player.tell("You use the protective candle...");
        event.player.server.runCommandSilent('clear ' + event.player.username + ' supplementaries:candle_holder_yellow 1');
    }

});