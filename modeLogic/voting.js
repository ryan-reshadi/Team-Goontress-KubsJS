global.voteable = true;
const votes = {};

const initializeVoting = (event) => {
    global.voteable = true;
    const players = event.server.players;
    players.forEach(player => {
        votes[player.username] = 0;
    });
}
ServerEvents.commandRegistry(event => {
    if (!global.voteable) {
        return;
    }
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('vote') // The name of the command
        // .requires(source => source.hasPermission(2)) // Check if the player has operator privileges
        // .executes(ctx => toggleTagging()) // Toggle flight for the player that ran the command if the `target` argument isn't included
        .then(Commands.argument('player', Arguments.PLAYER.create(event))
            .executes(ctx => {
                const player = Arguments.PLAYER.getResult(ctx, 'player');
                votes[player.username] ++;
                event.player
                ctx.source.player.tell("You voted for " + player.username);
                return 1;
            }) // Toggle flight for the player included in the `target` argument
        )
    )

})

global.tallyVotes = (event) => {
    var max = 0;
    var name = '';
    for (const key in votes) {
    // 'key' holds the property name (e.g., 'apple', 'banana')
    if (votes[key]>max){
        max = votes[key]
        name = key
    }
    return name;
}
}

ServerEvents.commandRegistry(event => {

})

ServerEvents.customCommand('displayVotes', event => {
    event.server.tell(votes);
})
ServerEvents.customCommand('initializeVoting', event => {
    initializeVoting(event);
})