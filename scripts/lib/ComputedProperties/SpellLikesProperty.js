import {ComputedProperty} from './ComputedProperty.js';

export class SpellLikesProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let spells = {
            0: [],
        };
        let ret = [];
        const itemTypes = [
            'spell',
        ];

        for (const [key, value] of items.entries()) {
            if (itemTypes.includes(value?.data?.type)) {
                if (value.data.data.spellbook === 'spelllike') {
                    if (value.data.data.atWill) {
                        spells[0].push(`${value.data.name}`);
                    } else {
                        if (value.data.data.uses.max === undefined) {
                            if (!spells.hasOwnProperty('???')) {
                                spells['???'] = [];
                            }
                            spells['???']?.push(`${value.data.name}`);
                            continue;
                        }

                        if (!spells.hasOwnProperty(value.data.data.uses?.max)) {
                            spells[value.data.data.uses?.max] = [];
                        }
                        spells[value.data.data.uses?.max]?.push(`${value.data.name}`);
                    }
                }
            }
        }

        // console.log(spells);

        for (const [key, value] of Object.entries(spells)) {
            if (value.length === 0) {
                continue;
            }

            let str = '';
            if (key === '0') {
                str += `at will - `;
            } else {
                str += `${key}/day - `;
            }
            str += value.toString().replaceAll(',', ', ');

            ret.push(str);
        }

        return ret.length === 0 ? '' : '\n' + ret.join('\n');
    }

    getDependencies() {
        return [];
    }
}