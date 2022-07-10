import { Command, createCommand } from 'commander';
import { globalEvents } from '@multi-commander/emitter/src';

const app = new Command('instagram')

app.version(require('../package.json').version);

app.command('poop')
    .description('Search twitter')
    .argument('[query]', 'Search query terms')
    .action(async (query, args) => {
        console.log(`Search for: "${query}"`, args);
    });

globalEvents().on('initialise', async (command) => {
    console.log('instagram says: hello while initialising');
    await sleep();
    console.log('instagram says: still initialising');

    command.addCommand(app);
});

globalEvents().on('initialiseSearch', async (command) => {
    console.log('instagram says: hello while initialising search');
    command.addCommand(
        createCommand('instagram')
            .argument('<query>')
            .action(async (query) => {
                console.log(`Searching Instagram for.... "${query}"`);
            })
    );
});


function sleep(timeout = 250) {
    return new Promise(done => setTimeout(done, timeout));
}