ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event
  
  event.register(Commands.literal('fly') // The name of the command
    .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
    .executes(ctx => fly(ctx.source.player)) // Toggle flight for the player that ran the command if the `target` argument isn't included
    .then(Commands.argument('target', Arguments.PLAYER.create(event))
      .executes(ctx => fly(Arguments.PLAYER.getResult(ctx, 'target'))) // Toggle flight for the player included in the `target` argument
    )
  )
  
  // Helper function
  const fly = (player) => {
    if (player.abilities.mayfly) {
      player.abilities.mayfly = false
      player.abilities.flying = false
      player.displayClientMessage(Component.gold('Flying: ').append(Component.red('disabled')), true)
    } else {
      player.abilities.mayfly = true
      player.displayClientMessage(Component.gold('Flying: ').append(Component.green('enabled')), true)
    }
    player.onUpdateAbilities()
    return 1
  }
})