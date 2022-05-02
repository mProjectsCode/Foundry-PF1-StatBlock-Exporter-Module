import {PropertyStore} from './PropertyStore.js';

export class SbConverter {
    static placeholder = 'NULL';

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

            return this.toPlaceholder(o);
        }

        if (tag.startsWith('#')) {
            let tagContent = tag.substring(1);

            let o = this.propertyStore.get(tagContent);

            return this.toPlaceholder(o);
        }

        return SbConverter.placeholder;
    }

    toPlaceholder(o) {
        if (o === undefined) {
            return SbConverter.placeholder;
        }
        if (o === null) {
            return SbConverter.placeholder;
        }
        if (o === '') {
            return SbConverter.placeholder;
        }
        return o.toString();
    }
}