module.exports = {
    name: 'event',
    description: 'Display upcoming events',

    execute(message, args) {
        const fs = require('fs');
        const eventList = require('./eventlist.json')

        var now = Date.now();
        
        if (args == undefined || args.length == 0){
            for (var event in eventList){
                if(eventList.hasOwnProperty(event))
                    args.push(event);
            }
        }

        args.forEach(arg => {
            try {
                if(eventList[arg] != undefined){

                    var timeAt = new Date(eventList[arg].time).getTime();

                    while(now > timeAt){
                        timeAt += eventList[arg].delta
                        eventList[arg].time += eventList[arg].delta
                        console.log('updated time')
                    }

                    var timeTill = timeAt-now;
                    const days = Math.floor(timeTill/86400000)
                    timeTill = timeTill % 86400000
                    const hours = Math.floor(timeTill/3600000)
                    timeTill = timeTill % 3600000
                    const minutes = Math.floor(timeTill/60000)

                    message.channel.send(`${eventList[arg].name} in ${days} days, ${hours} hours, ${minutes} minutes`);                 
                }
                else{
                    message.channel.send(`Invalid Event Argument: ${arg} is not a valid event`);
                }
            } catch (error) {
                message.reply('Sorry there was an issue!');
                console.log(error);
            }            
        });
        
        const eventJSString = JSON.stringify(eventList, null, 4);
        console.log(eventJSString);
        fs.writeFile('./commands/eventlist.json', eventJSString, err => {
            if (err){
                console.log(`${err} when writing file`);
            }
            else {
                console.log('Updated File')
            }
        });
    },
}