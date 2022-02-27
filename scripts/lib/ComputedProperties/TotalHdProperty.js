import {ComputedProperty} from "./ComputedProperty.js";

export class TotalHdProperty extends ComputedProperty {

    getProperty() {
        return this.input?._rollData?.attributes?.hd?.total;
    }

    getDependencies() {
        return [];
    }
}