
ServerEvents.customCommand('InitSpleef', event => {
    event.server.runCommandSilent(`gamerule pvp false`)
    event.server.runCommandSilent(`gamerule fallDamage true`)
    event.server.runCommandSilent(`difficulty peaceful`)
    event.server.runCommandSilent(`gamerule doDaylightCycle false`)

})

ServerEvents.customCommand('InitMinerman', event => {
    runCommand(event, `gamerule pvp true`);
    runCommand(event, `gamerule fallDamage true`);
    runCommand(event, `difficulty normal`);
    runCommand(event, `summon villager -25 10 78 {VillagerData:{profession:armorer,level:2,type:plains},Invulnerable:1b,NoAI:1b,PersistenceRequired:1b,Silent:1b,CustomName:'{"text":"ARMOR","color":"red","bold":true}',CustomNameVisible:1b,DeathLootTable:"minecraft:empty",Rotation:[180f,0f],Offers:{Recipes:[{buy:{id:"minecraft:emerald",Count:2},sell:{id:"minecraft:leather_helmet",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:2},sell:{id:"minecraft:leather_chestplate",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:2},sell:{id:"minecraft:leather_leggings",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:2},sell:{id:"minecraft:leather_boots",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:4},sell:{id:"minecraft:iron_helmet",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:4},sell:{id:"minecraft:iron_chestplate",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:4},sell:{id:"minecraft:iron_leggings",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:4},sell:{id:"minecraft:iron_boots",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:8},sell:{id:"minecraft:diamond_helmet",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:8},sell:{id:"minecraft:diamond_chestplate",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:8},sell:{id:"minecraft:diamond_leggings",Count:1},maxUses:9999999},{buy:{id:"minecraft:emerald",Count:8},sell:{id:"minecraft:diamond_boots",Count:1},maxUses:9999999}]},Attributes:[{Name:"generic.knockbackResistance",Base:1.0},{Name:"generic.max_health",Base:2048}],Health:2048f})`);
});

// Please make sure that all loaded templates have entities saved in the template
const placeTemplate = (event, templateName) => {
    runCommand(event, `kill @e[type=!minecraft:player]`);
    switch (templateName) {
        case "minigames":
            event.server.runCommandSilent(`/place template minecraft:map -50 -26 -17`)
        case "captflag":
            event.server.runCommandSilent('/place template minecraft:captflag')
    }

}