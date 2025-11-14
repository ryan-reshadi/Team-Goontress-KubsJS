// damage_handler.js
global.taggleable = false;

EntityEvents.hurt(event => {
    if (!global.taggleable) {
        return;
    }
    
    const target = event.entity;
    const name = target.username;
    const targetTag = "@r[name=" + name + ",tag=!tagger]";

    event.server.runCommandSilent(`effect give ${targetTag} minecraft:slowness infinite 255 true`);
    event.server.runCommandSilent(`tag ${targetTag} add tagged`);
    
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
        global.taggleable = state;
        return 1
    }
    const toggleTagging = () => {
        global.taggleable = !global.taggleable;
        return 1
    }
})