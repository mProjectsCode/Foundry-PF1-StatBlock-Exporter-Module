import {ComputedProperty} from './ComputedProperty.js';

export class ImmunitiesProperty extends ComputedProperty {

    getProperty() {
        const di = this.input?._rollData?.traits?.di;
        const ci = this.input?._rollData?.traits?.ci;

        const diText = this.addList(di?.value.join(', '), di?.custom.replace(';', ','));
        const ciText = this.addList(ci?.value.join(', '), ci?.custom.replace(';', ','));

        return this.addList(diText, ciText);
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