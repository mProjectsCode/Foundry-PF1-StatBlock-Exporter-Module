import {ComputedProperty} from './ComputedProperty.js';
import {PropertyStore} from '../PropertyStore.js';
import {Helpers} from '../Helpers.js';

export class HealthProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let classItem = {};
        let classes = [];

        for (const [key, value] of items.entries()) {
            if (value?.data?.type === 'class') {
                classes.push(value.data);
            }
        }

        //let cla = this.firstToUpper(classes.length === 0 ? 'NULL' : classes[0]);
        let classesTextArr = [];
        for (const class1 of classes) {
            console.log(class1);
            if (class1.data.hd !== 0 && class1.data.level !== 0) {
                classesTextArr.push(`${class1.data.level}d${class1.data.hd}`);
            }
        }

        let ret = `${this.input?._rollData?.attributes?.hp?.max} (${classesTextArr.join('+')}${Helpers.fancyNumber(this.propertyStore.get('conHpBonus'))})`;
        let fastHealing = this.input?._rollData?.traits?.fastHealing?.toLowerCase();

        fastHealing = fastHealing?.replace('fast healing', '').trim();

        if (fastHealing !== '' && fastHealing !== '0') {
            ret += `; fast healing ${fastHealing}`;
        }

        return ret;
    }

    getDependencies() {
        return [
            PropertyStore.ComputedProperties['totalHd'],
            PropertyStore.ComputedProperties['hdSize'],
            PropertyStore.ComputedProperties['conHpBonus'],
        ];
    }
}