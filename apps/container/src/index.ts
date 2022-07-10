import { Command, createCommand } from 'commander';

import { globalEvents } from '@multi-commander/emitter';

import '@multi-commander/instagram';
import twitter from '@multi-commander/twitter';

(async () => {

    const app = new Command('multi');
    const search = createCommand('search');

    app.addCommand(search);

    // option one - imperatively create the commands and bind them into the outer programme
    [twitter()].forEach(thing => {
        thing.command && app.addCommand(thing.command());
        thing.search && search.addCommand(thing.search());
    });

    // option two - having imported the packages, use events to allow themselves to bind into the programme
    await globalEvents().emit('initialise', app);
    await globalEvents().emit('initialiseSearch', search);

    app.parseAsync(process.argv)
        .then(() => console.log('done'))
        .catch(console.error);
})();