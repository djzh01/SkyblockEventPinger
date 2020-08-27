module.exports = {
    name: 'event',
    description: 'Display upcoming events',
    execute(message, args) {
        var jerry = new Date(2020, 7, 28, 19, 15).getTime();
        var spooky = new Date(2020, 8, 1, 7, 35).getTime();
        var newYears = new Date(2020, 7, 28, 20, 55).getTime();
        var oringo = new Date(2020, 7, 30, 4, 55).getTime();
        var now = Date.now();

        try {
            if(args.includes('jerry')){
                var timeTill = jerry.getTime()-now;
                const days = Math.floor(timeTill/86400000)
                timeTill = timeTill % 86400000
                const hours = Math.floor(timeTill/3600000)
                timeTill = timeTill % 3600000
                const minutes = Math.floor(timeTill/60000)
                message.channel.send(`Jerry Event in ${days} days, ${hours}, ${minutes}`)
                while(now > jerry.getTime){
                    jerry += 446400000
                    console.log('updated time')
                }
            }
        } catch (error) {
            message.reply('Sorry there was an issue!');
            console.log(error);
        }
        
        
        //console.log(`events: ${args}`);
    },
}