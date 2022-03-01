import {ComputedProperty} from './ComputedProperty.js';

export class ClassProperty extends ComputedProperty {

    getProperty() {
        const classes = this.input?._rollData?.classes;
        return classes[Object.keys(classes)[0]]?.name;
    }

    getDependencies() {
        return [];
    }
}