import {ComputedProperty} from './ComputedProperty.js';

export class SpecialAbilitiesProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let feats = [];

        for (const [key, value] of items.entries()) {
            if (value?.data?.type === 'feat') {
                if (value?.data?.data?.featType !== 'feat') {
                    let save = ` DC ${value.data.data.save.dc} ${value.data.data.save.type} save`;
                    if (value.data.data.save.type === '') {
                        save = '';
                    }
                    let type = ` (${value.data.abilityTypeShort})`;
                    if (value.data.abilityTypeShort === '') {
                        type = '';
                    }
                    feats.push(`${value?.data?.name}${type}${save}`);
                }
            }
        }

        return feats.join('\n');
    }

    getDependencies() {
        return [];
    }
}