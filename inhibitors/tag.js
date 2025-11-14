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

// player_to_player_click.js

ItemEvents.entityInteracted(event => {
    if (!global.taggleable) {
        return;
    }
    // The player doing the right-clicking (must be holding an item for this event to fire)
    const sourcePlayer = event.player      
    // The entity being right-clicked
    const targetEntity = event.target      

    const sourceNBT = sourcePlayer.fullNBT.toJson();
    const targetNBT = targetEntity.fullNBT.toJson();

    // 1. Check if the target entity is another player.
    // The 'player' property exists only if the entity is a player entity.
    if (targetEntity.player && sourceNBT.Tags && !sourceNBT.Tags.includes("tagged") && !sourceNBT.Tags.includes("tagger") && !targetNBT.Tags.includes("tagger") && !targetNBT.Tags.includes("tagged")) {
        
        const targetPlayer = targetEntity.player 
        
        // Ensure they didn't just right-click themselves (important safety check)
        if (sourcePlayer.username === targetPlayer.username) return 

        // --- Success! A player has right-clicked another player. ---
        
        // Optional: Cancel the event to stop any default item action
        event.cancel() 
        
        // Example Action: Send a message to both players
        sourcePlayer.tell(`§6You right-clicked §c${targetPlayer.username}.`)
        targetPlayer.tell(`§6You were examined by §c${sourcePlayer.username}.`)
        
        // Example: Run a command to give the target player a temporary effect
        sourcePlayer.server.runCommandSilent(`effect give ${targetPlayer.username} glowing 5 0 true`)
    }
})