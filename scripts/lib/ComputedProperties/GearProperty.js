import {ComputedProperty} from './ComputedProperty.js';

export class GearProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let gear = [];
        const itemTypes = [
            'equipment',
            'weapon',
            'loot',
            'consumable',
            'container',
        ];

        for (const [key, value] of items.entries()) {
            if (itemTypes.includes(value?.data?.type)) {
                gear.push(value?.data?.name);
            }
        }

        return gear.toString().replaceAll(',', ', ');
    }

    getDependencies() {
        return [];
    }
}