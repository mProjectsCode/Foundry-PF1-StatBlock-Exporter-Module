import {ComputedProperty} from './ComputedProperty.js';
import {PropertyStore} from './PropertyStore.js';

export class AlignmentBlockProperty extends ComputedProperty {

    getProperty() {
        const items = this.input?.items;
        let classItem = {};
        let isRacialClass = true;

        let classes = [];

        for (const [key, value] of items.entries()) {
            if (value?.data?.type === 'class') {
                classes.push(value.data);
            }
        }

        //let cla = this.firstToUpper(classes.length === 0 ? 'NULL' : classes[0]);
        let classesText = classes.length === 0 ? 'NULL' : '';
        let classesTextArr = [];
        for (const class1 of classes) {
            // console.log(class1);
            if (class1?.data?.classType !== 'racial') {
                classesTextArr.push(`${class1?.name} ${class1?.data?.level}`);
                isRacialClass = false;
            }
        }
        classesText += classesTextArr.join('/');

        let race = this.input?.race?.data?.name;
        let alignment = this.input?._rollData?.details?.alignment;
        let size = this.input?._rollData?.size;

        let type = this.input?.race?.data?.data?.creatureType;
        race = this.firstToUpper(race);
        alignment = alignment.toUpperCase();
        size = this.sizeToStr(size);

        let subTypes = this.input?.race?.data?.data?.subTypes.join(', ');
        type = `${this.firstToUpper(type)}${subTypes.length === 0 ? '' : ` (${subTypes})`}`;

        let a = `${race} ${classesText}`;
        let b = `${alignment} ${size} ${type}`;

        return isRacialClass ? b : `${a}\n${b}`;
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
            PropertyStore.ComputedProperties['totalHd'],
        ];
    }
}