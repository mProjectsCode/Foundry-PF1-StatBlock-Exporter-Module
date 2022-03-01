import {ComputedProperty} from './ComputedProperty.js';

export class FeatsProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let feats = [];

        for (const [key, value] of items.entries()) {
            if (value?.data?.type === 'feat') {
                if (value?.data?.data?.featType === 'feat') {
                    feats.push(value?.data?.name);
                }
            }
        }

        return feats.toString().replaceAll(',', ', ');
    }

    getDependencies() {
        return [];
    }
}