global.runcommand = (event, command) => {
    event.server.runCommandSilent(command)
}

global.runKubeJS = (event, command) => {
    event.server.runCommandSilent("kubejs custom_command " + command);
}