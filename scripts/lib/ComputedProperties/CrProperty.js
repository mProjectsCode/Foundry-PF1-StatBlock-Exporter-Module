import {ComputedProperty} from './ComputedProperty.js';

export class CrProperty extends ComputedProperty {

    getProperty() {
        const cr = this.input?._rollData?.details?.cr?.total?.toString();
        if (cr === '') {
            return ' ';
        }

        return `(CR ${cr})`;
    }

    getDependencies() {
        return [];
    }
}