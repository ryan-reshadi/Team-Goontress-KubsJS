// disable_crafting.js - Uses basic 'event.remove' to wipe all recipes

ServerEvents.recipes(event => {

    // The primitive way to remove all recipes is by targeting every recipe type.

    // 1. Remove ALL Crafting Table Recipes (Shaped and Shapeless)
    event.remove({ type: 'minecraft:crafting_shaped' })
    event.remove({ type: 'minecraft:crafting_shapeless' })

    // 2. Remove ALL Furnace Recipes
    event.remove({ type: 'minecraft:smelting' })
    event.remove({ type: 'minecraft:blasting' })
    event.remove({ type: 'minecraft:smoking' })
    event.remove({ type: 'minecraft:campfire_cooking' })

    // 3. Remove ALL Other Vanilla Processing Recipes
    event.remove({ type: 'minecraft:stonecutting' })
    event.remove({ type: 'minecraft:brewing' })

    // If you have mods, you may need to add their recipe types here too!

    console.warn("ALL VANILLA RECIPES HAVE BEEN PRIMITIVELY REMOVED. Crafting is disabled.")

})