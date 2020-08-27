module.exports = {
    name: 'help',
    description: 'Help Function',
    execute(message, args) {
        console.log(`Help called on ${args}`);
    },
}