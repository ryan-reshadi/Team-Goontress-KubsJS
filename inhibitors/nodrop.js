global.dropabble = false;
ServerEvents.tick(event => {
    if (!event.server || global.dropabble) return

    event.server.allLevels.forEach(level => {
        level.getEntities().forEach(entity => {

            // Check if the entity is a dropped item
            if (entity.type === 'minecraft:item') {

                // Get the itemstack (the actual item data)
                const itemStack = entity.item

                // Try to find the player who dropped it (the owner)
                const droppingPlayer = entity.owner

                // Only act if we can identify the owner AND the item is not empty
                if (droppingPlayer) {

                    // 1. Give the item back to the player
                    droppingPlayer.give(itemStack)

                    // 2. Notify the player
                    // droppingPlayer.tell('Item dropping is disabled. Item was returned to your inventory.')

                    // 3. Log the successful return
                    console.warn(`RETURNED ITEM: ${itemStack.id} to ${droppingPlayer.username}`)

                    // 4. DESTROY the entity that is now empty
                    entity.kill()
                }
            }
        })
    })
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('enableDropping') // The name of the command
        .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
        .executes(ctx => toggleDropping()) // Toggle flight for the player that ran the command if the `target` argument isn't included
        .then(Commands.argument('state', Arguments.BOOLEAN.create(event))
            .executes(ctx => enableDropping(Arguments.BOOLEAN.getResult(ctx, 'state'))) // Toggle flight for the player included in the `target` argument
        )
    )

    // Helper function
    const enableDropping = (state) => {
        global.dropabble = state;
        return 1
    }
    const toggleDropping = () => {
        global.dropabble = !global.dropabble;
        return 1
    }
})








