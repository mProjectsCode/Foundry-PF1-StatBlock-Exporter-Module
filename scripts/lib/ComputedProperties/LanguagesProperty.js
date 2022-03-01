import {ComputedProperty} from './ComputedProperty.js';

export class LanguagesProperty extends ComputedProperty {

    getProperty() {
        return this.input?._rollData?.traits?.languages?.value.toString().replaceAll(',', ', ');
    }

    getDependencies() {
        return [];
    }
}