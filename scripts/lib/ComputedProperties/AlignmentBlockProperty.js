import {ComputedProperty} from './ComputedProperty.js';
import {PropertyStore} from './PropertyStore.js';

export class AlignmentBlockProperty extends ComputedProperty {

    getProperty() {
        let race = this.input?.race?.data?.name;
        let cla = PropertyStore.Instance.properties['class'];
        let level = PropertyStore.Instance.properties['totalHd'];
        let alignment = this.input?._rollData?.details?.alignment;
        let size = this.input?._rollData?.size;
        let type = this.input?.race?.data?.data?.creatureType;

        race = this.firstToUpper(race);
        cla = this.firstToUpper(cla);
        alignment = alignment.toUpperCase();
        size = this.sizeToStr(size);

        let subTypes = this.input?.race?.data?.data?.subTypes.join(', ');
        type = `${this.firstToUpper(type)}${subTypes.length === 0 ? '' : ` (${subTypes})`}`;

        let a = `${race} ${cla} ${level}`;
        let b = `${alignment} ${size} ${type}`;

        return `${a}\n${b}`;
    }

    firstToUpper(s) {
        return `${s[0].toUpperCase()}${s.slice(1)}`;
    }

    sizeToStr(s) {
        s = parseInt(s);
        const table = {
            0: 'Fine',
            1: 'Diminutive',
            2: 'Tiny',
            3: 'Small',
            4: 'Medium',
            5: 'Large',
            6: 'Huge',
            7: 'Gargantuan',
            8: 'Colossal',
        };
        return table[s];
    }

    getDependencies() {
        return [
            PropertyStore.ComputedProperties['class'],
            PropertyStore.ComputedProperties['totalHd'],
        ];
    }
}