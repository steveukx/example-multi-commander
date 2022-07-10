import { Command, createCommand } from 'commander';

const app = new Command('twitter')

app.version(require('../package.json').version);

app.command('poop')
    .description('Search twitter')
    .argument('[query]', 'Search query terms')
    .action(async (query, args) => {
        console.log(`Search for: "${query}"`, args);
    });

export default function () {

    return {
        command (): Command {
            return app;
        },
        search (): Command {
            return createCommand('twitter')
                .argument('<query>')
                .action(async (query) => {
                    console.log(`Searching Twitter for.... "${query}"`);
                })
        }
    }
}