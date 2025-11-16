global.dogeball = false;

EntityEvents.hurt(event => {
    if (!global.dogeball) {
        return;
    }

    const target = event.entity;
    const name = target.username;

    event.server.runCommandSilent(`effect give ${name} minecraft:slowness infinite 255 true`);
    event.server.runCommandSilent(`tag ${name} add tagged`);
    event.server.runCommandSilent('effect give ' + name + ' minecraft:glowing infinite 0 true');
    event.cancel();
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('enableDodgeball') // The name of the command
        .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
        .executes(ctx => toggleDodgeball()) // Toggle flight for the player that ran the command if the `target` argument isn't included
        .then(Commands.argument('state', Arguments.BOOLEAN.create(event))
            .executes(ctx => enableDodgeball(Arguments.BOOLEAN.getResult(ctx, 'state'))) // Toggle flight for the player included in the `target` argument
        )
    )

    // Helper function
    const enableDodgeball = (state) => {
        global.dodgeball = state;
        return 1
    }
    const toggleDodgeball = () => {
        global.dodgeball = !global.dodgeball;
        return 1
    }
})

// player_to_player_click.js

ItemEvents.entityInteracted(event => {
    if (!global.taggleable) {
        return;
    }

    const sourcePlayer = event.player
    const targetEntity = event.target
    event.server.runCommandSilent('execute if entity @a[name=' + targetEntity.username + ',tag=tagged] if entity @a[name=' + sourcePlayer.username + ',tag=!tagged,tag=medic] run effect clear ' + targetEntity.username + ' minecraft:slowness');
    event.server.runCommandSilent('execute if entity @a[name=' + targetEntity.username + ',tag=tagged] if entity @a[name=' + sourcePlayer.username + ',tag=!tagged,tag=medic] run effect clear ' + targetEntity.username + ' minecraft:glowing');
    event.server.runCommandSilent('execute if entity @a[name=' + targetEntity.username + ',tag=tagged] if entity @a[name=' + sourcePlayer.username + ',tag=!tagged,tag=medic] run tag ' + targetEntity.username + ' remove tagged');

    event.cancel();
})