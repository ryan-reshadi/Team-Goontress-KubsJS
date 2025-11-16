// no_jump.js

ServerEvents.tick(event => {

    // Check if the current level is the server level (for stability)
    if (event.server) {

        // Loop through all online players
        event.server.players.forEach(player => {

            // Check if the player is currently on the ground. 
            // We only care about players trying to jump off the ground.
            if (player.onGround) {

                // Check if the player is trying to move vertically (i.e., attempting a jump).
                // Velocity Y (y_v) will be > 0 (positive) if they just initiated a jump.
                if (player.y_v > 0) {

                    // 1. Instantly set the player's vertical (Y) velocity to 0.
                    // This is the core trick that cancels the jump.
                    player.y_v = 0

                    // 2. Teleport the player slightly down (by a very small amount)
                    // This forces the "onGround" status to re-engage immediately.
                    player.teleportTo(player.x, player.y - 0.001, player.z)
                }
            }
        })
    }
})