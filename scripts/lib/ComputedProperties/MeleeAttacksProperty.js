import {ComputedProperty} from './ComputedProperty.js';
import {Helpers} from '../Helpers.js';

export class MeleeAttacksProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let attacks = [];
        const itemTypes = [
            'attack',
        ];

        for (const [key, value] of items.entries()) {
            if (itemTypes.includes(value?.data?.type)) {
                // console.log(value?.data?.data?.attackType);
                if (value?.data?.data?.actionType === 'mwak' || value?.data?.data?.attackTyp === 'natural') {
                    attacks.push(`${value.data.name} ${this.getItemAttacks(value.data)} (${this.getItemDamage(value.data)})`);
                }
            }
        }

        return attacks.toString().replaceAll(',', ', ');
    }

    getItemDamage(item) {
        return Handlebars.helpers.itemDamage(item, this.input._rollData);
    }

    getItemAttacks(item) {
        const attacks = item.document.attackArray;
        if (attacks.length === 0) return '';
        let ret = Helpers.fancyNumber(attacks[0]);
        for (let i = 1; i < attacks.length; i++) {
            ret += `/${Helpers.fancyNumber(attacks[0])}`;
        }
        return ret;
    }

    getDependencies() {
        return [];
    }
}