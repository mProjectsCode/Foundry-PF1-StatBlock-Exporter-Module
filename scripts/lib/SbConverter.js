import {PropertyStore} from './ComputedProperties/PropertyStore.js';

export class SbConverter {
    constructor(actor) {
        this.actor = actor;
        this.template = '';
        this.propertyStore = new PropertyStore(actor);
    }

    async getTemplate() {

    }

    convert() {
        // console.log(this.actor);

        let output = this.template.replace(new RegExp('{{ .*? }}', 'g'), this.replaceTag.bind(this));

        console.log('SBE | output: \n' + output);

        return output;
    }

    replaceTag(match) {
        let tag = match;
        tag = tag.substring(3);
        tag = tag.substring(0, tag.length - 3);

        // console.log(tag);

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

        if (tag.startsWith('#')) {
            let tagContent = tag.substring(1);

            let o = this.propertyStore.get(tagContent);

            return o !== undefined ? o.toString() : 'NULL';
        }

        return 'NULL';
    }
}