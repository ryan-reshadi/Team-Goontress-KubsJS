global.runcommand = (event, command) => {
    event.server.runCommandSilent(command)
}

global.runKubeJS = (event, command) => {
    event.runCommandSilent("kubejs custom_command " + command);
}