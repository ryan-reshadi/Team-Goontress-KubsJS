ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('hello') // The name of the command
        .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
        .executes(ctx => {
            ctx.server.runCommandSilent(`/say niggerro`)
        })
        // .then(Commands.argument('target', Arguments.PLAYER.create(event))
        //     .executes(ctx => torun(Arguments.PLAYER.getResult(ctx, 'target'))) // Toggle flight for the player included in the `target` argument
        // )
    )
    const torun = () => {
        return 1
    }
})