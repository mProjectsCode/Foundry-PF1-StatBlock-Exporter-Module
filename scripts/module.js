Hooks.once('init', async function() {
    console.log('SBE | init');
});

Hooks.once('ready', async function() {
    console.log('SBE | ready');
});


// Add button to Actor Sheet for opening app
Hooks.on('getActorSheetHeaderButtons', async (sheet, buttons) => {
    // If this is not a player character sheet, return without adding the button
    buttons.unshift({
        label: 'Export StatBlock',
        class: 'export-sb',
        icon: 'fas fa-file-export',
        onclick: async () => {
            // Open Config window
            let sbConverter = new SbConverter(sheet.actor);

            await sbConverter.getTemplate();

            sbConverter.convert();
        }
    });
});

class SbConverter {
    constructor(actor) {
        this.actor = actor;
        this.template = '';
    }

    async getTemplate() {
        this.template = await (await fetch('modules/Foundry-PF1-StatBlock-Exporter-Module/resources/templateCharacter.txt')).text();
    }

    convert() {
        console.log(this.actor);

        let output = this.template.replace(new RegExp('{{ .*? }}', 'g'), this.replaceTag.bind(this))

        console.log(output);
    }

    replaceTag(match) {
        let tag = match;
        tag = tag.substring(3);
        tag = tag.substring(0, tag.length - 3);

        console.log(tag);

        if (tag.startsWith('@')) {
            let tagContent = tag.substring(1);
            let parts = tagContent.split('.');

            let o = this.actor;

            for (let part of parts) {
                if (part === 'rollData') {
                    part = '_rollData';
                }

                if (o !== undefined) {
                    o = o[part];
                }
            }

            return o !== undefined ? o.toString() : 'NULL';
        }

        return 'NULL';
    }
}