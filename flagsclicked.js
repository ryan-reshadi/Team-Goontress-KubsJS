BlockEvents.rightClicked('supplementaries:flag_light_blue', event => {
  event.server.runCommandSilent(`/fill -276 3 -51 -276 3 -51 minecraft:redstone_block`)
  event.server.runCommandSilent(`/fill -276 3 -51 -276 3 -51 minecraft:air`)
  
})

BlockEvents.rightClicked('supplementaries:flag_red', event => {
    event.server.runCommandSilent(`/fill -168 6 -51 -168 6 -51 minecraft:redstone_block`)
    event.server.runCommandSilent(`/fill -168 6 -51 -168 6 -51 minecraft:air`)
    
})

BlockEvents.rightClicked('minecraft:magenta_glazed_terracotta', event => {
    event.player.kill();
    event.server.runCommandSilent(`/kill drplt`)
})