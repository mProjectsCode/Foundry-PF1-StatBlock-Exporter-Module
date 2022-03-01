import {ComputedProperty} from './ComputedProperty.js';

export class HdSizeProperty extends ComputedProperty {

    getProperty() {
        const classes = this.input?._rollData?.classes;
        return classes[Object.keys(classes)[0]]?.hd;
    }

    getDependencies() {
        return [];
    }
}