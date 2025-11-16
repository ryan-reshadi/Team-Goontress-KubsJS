global.joinLogic = (event, playerName) => { }
global.leaveLogic = (event, playerName) => { }

PlayerEvents.loggedIn(event => {
    global.joinLogic(event, event.player.username);
})
PlayerEvents.loggedOut(event => {
    global.leaveLogic(event, event.player.username);
})