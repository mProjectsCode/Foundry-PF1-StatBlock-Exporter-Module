import {ComputedProperty} from './ComputedProperty.js';
import {Helpers} from '../Helpers.js';

export class SpellsProperty extends ComputedProperty {

    constructor(spellBookType) {
        super();
        this.spellBookType = spellBookType;
    }

    getProperty() {
        const items = this.input?.items;
        let spells = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        };
        let ret = [];
        const itemTypes = [
            'spell',
        ];

        for (const [key, value] of items.entries()) {
            if (itemTypes.includes(value?.data?.type)) {
                if (value.data.data.spellbook === this.spellBookType) {
                    spells[value.data.data.level].push(`${value.data.name}`);
                }
            }
        }

        for (const [key, value] of Object.entries(spells)) {
            if (value.length === 0) {
                continue;
            }

            let str = Helpers.interation(key);
            if (key === '0') {
                str += ` (at will) - `;
            } else {
                let spellsPerDay = this.input?._rollData?.spells[this.spellBookType]?.spells[`spell${key}`]?.max;
                if (spellsPerDay === null) {
                    spellsPerDay = '0';
                }
                str += ` (${spellsPerDay}/day) - `;
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