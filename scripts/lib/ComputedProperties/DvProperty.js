import {ComputedProperty} from './ComputedProperty.js';

export class DvProperty extends ComputedProperty {

    getProperty() {
        const dv = this.input?._rollData?.traits?.dv.value;

        return dv.join(', ');
    }

    addList(a, b) {
        if (a === '') {
            return b;
        }
        if (b === '') {
            return a;
        }
        return `${a}, ${b}`;
    }

    getDependencies() {
        return [];
    }
}