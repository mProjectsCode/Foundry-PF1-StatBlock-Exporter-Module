import {SbConverter} from './lib/SbConverter.js';

Hooks.once('init', async function () {
    console.log('SBE | init');
});

Hooks.once('ready', async function () {
    console.log('SBE | ready');
});

// Add button to Actor Sheet for opening app
Hooks.on('getActorSheetHeaderButtons', async (sheet, buttons) => {
    buttons.unshift({
        label: 'Export StatBlock',
        class: 'export-sb',
        icon: 'fas fa-file-export',
        onclick: async () => {
            let sbConverter = new SbConverter(sheet.actor);

            console.log(sheet.actor);

            sbConverter.template = await (await fetch('modules/Foundry-PF1-StatBlock-Exporter-Module/resources/templateCharacter.txt')).text();
            const data = sbConverter.convert();
            saveDataToFile(data, 'md', sheet.actor.data.name + '_statblock.md');
        },
    });
});