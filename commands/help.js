module.exports = {
    name: 'help',
    description: 'Help Function',
    execute(message, args) {
        fs = require('fs');
        commandjs = require('./commandlist.json');
        
        if(args == 'list'){
            message.channel.send('List of commands:');
            for (var command in commandjs){
                if(commandjs.hasOwnProperty(command)){            
                    message.channel.send(`${command}`);
                }
            }
        }
        args.forEach(arg => {
            console.log(commandjs[arg])
            if(commandjs[arg] != undefined){
                message.channel.send(commandjs[arg]);
            }
            else if (arg != 'list'){
                message.channel.send('Not a valid input. Type !help list for valid arguments')
            }
        });
    },
}