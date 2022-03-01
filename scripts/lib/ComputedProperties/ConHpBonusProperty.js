import {ComputedProperty} from './ComputedProperty.js';

export class ConHpBonusProperty extends ComputedProperty {

    getProperty() {
        return (this.input?._rollData?.attributes?.hp?.max - this.input?._rollData?.attributes?.vigor?.max).toString();
    }

    getDependencies() {
        return [];
    }
}