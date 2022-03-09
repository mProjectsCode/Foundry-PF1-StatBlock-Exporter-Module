import {ComputedProperty} from './ComputedProperty.js';

export class SpaceProperty extends ComputedProperty {

    getProperty() {
        return this.sizeTable(this.input?._rollData.size);
    }

    sizeTable(size) {
        const table = {
            0: '0.5',
            1: '1',
            2: '2.5',
            3: '5',
            4: '5',
            5: '10',
            6: '15',
            7: '20',
            8: '30',
        };

        return table[size];
    }

    getDependencies() {
        return [];
    }
}