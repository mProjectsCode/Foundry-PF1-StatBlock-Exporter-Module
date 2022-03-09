import {ComputedProperty} from './ComputedProperty.js';

export class SkillsProperty extends ComputedProperty {

    getProperty() {
        const skills = this.input?._rollData?.skills;
        let out = [];

        for (const [key, value] of Object.entries(skills)) {
            out.push(this.keyToName(key) + ' ' + this.fancyNumber(value?.mod));
        }

        return out.toString().replaceAll(',', ', ');
    }

    keyToName(key) {
        const map = {
            'acr': 'Acrobatics',
            'apr': 'Appraise',
            'art': 'Artistry',
            'blf': 'Bluff',
            'clm': 'Climb',
            'crf': 'Craft',
            'dip': 'Diplomacy',
            'dev': 'Disable Device',
            'dis': 'Disguise',
            'esc': 'Escape Artist',
            'fly': 'Fly',
            'han': 'Handle Animal',
            'hea': 'Heal',
            'int': 'Intimidate',
            'kar': 'Knowledge Arcana',
            'kdu': 'Knowledge Dungeoneering',
            'ken': 'Knowledge Engineering',
            'kge': 'Knowledge Geography',
            'khi': 'Knowledge History',
            'klo': 'Knowledge Local',
            'kna': 'Knowledge Nature',
            'kno': 'Knowledge Nobility',
            'kpl': 'Knowledge Planes',
            'kre': 'Knowledge Religion',
            'lin': 'Linguistics',
            'lor': 'Lore',
            'per': 'Perception',
            'prf': 'Perform',
            'pro': 'Profession',
            'rid': 'Ride',
            'sen': 'Sense Motive',
            'slt': 'Sleight of Hand',
            'spl': 'Spellcraft',
            'ste': 'Stealth',
            'sur': 'Survival',
            'swm': 'Swim',
            'umd': 'Use Magic Device',
        };

        return map[key];
    }

    fancyNumber(number) {
        const numInt = parseInt(number);
        if (numInt >= 0) {
            return '+' + numInt.toString();
        } else {
            return numInt.toString();
        }
    }

    getDependencies() {
        return [];
    }
}