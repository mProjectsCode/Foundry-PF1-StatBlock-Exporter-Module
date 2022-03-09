import {ComputedProperty} from './ComputedProperty.js';
import {Helpers} from '../Helpers.js';

export class PrimarySpellsProperty extends ComputedProperty {

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
            'spell'
        ];

        for (const [key, value] of items.entries()) {
            if (itemTypes.includes(value?.data?.type)) {
                if (value.data.data.spellbook === 'primary') {
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
                str += ` (${this.input?._rollData?.spells.primary.spells[`spell${key}`]?.value}/day) - `;
            }
            str += value.toString().replaceAll(',', ', ');

            ret.push(str)
        }

        return '\n' + ret.join('\n');
    }

    getItemDamage(item) {
        return Handlebars.helpers.itemDamage(item, this.input._rollData);
    }

    getItemAttacks(item) {
        const attacks = item.document.attackArray;
        if (attacks.length === 0) return '';
        let ret = `${attacks[0] < 0 ? attacks[0] : `+${attacks[0]}`}`
        for (let i = 1; i < attacks.length; i++) {
            ret += `/${attacks[i] < 0 ? attacks[i] : `+${attacks[i]}`}`
        }
        return ret;
    }

    getDependencies() {
        return [];
    }
}