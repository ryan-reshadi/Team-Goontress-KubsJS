ServerEvents.customCommand('diamonds', event => {
  event.player.give(Item.of('minecraft:diamond', 64))
})