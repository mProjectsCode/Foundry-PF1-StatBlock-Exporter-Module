import {ComputedProperty} from './ComputedProperty.js';
import {PropertyStore} from './PropertyStore.js';

export class HealthProperty extends ComputedProperty {

    getProperty() {
        return `${this.input?._rollData?.attributes?.hp?.max} (${this.propertyStore.get('totalHd')}d${this.propertyStore.get('hdSize')}+${this.propertyStore.get('conHpBonus')})`;
    }

    getDependencies() {
        return [
            PropertyStore.ComputedProperties['totalHd'],
            PropertyStore.ComputedProperties['hdSize'],
            PropertyStore.ComputedProperties['conHpBonus'],
        ];
    }
}