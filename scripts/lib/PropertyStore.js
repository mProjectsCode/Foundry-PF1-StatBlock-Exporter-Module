import {TotalHdProperty} from './ComputedProperties/TotalHdProperty.js';
import {ClassProperty} from './ComputedProperties/ClassProperty.js';
import {HealthProperty} from './ComputedProperties/HealthProperty.js';
import {HdSizeProperty} from './ComputedProperties/HdSizeProperty.js';
import {ConHpBonusProperty} from './ComputedProperties/ConHpBonusProperty.js';
import {FeatsProperty} from './ComputedProperties/FeatsProperty.js';
import {LanguagesProperty} from './ComputedProperties/LanguagesProperty.js';
import {GearProperty} from './ComputedProperties/GearProperty.js';
import {SkillsProperty} from './ComputedProperties/SkillsProperty.js';
import {MeleeAttacksProperty} from './ComputedProperties/MeleeAttacksProperty.js';
import {RangedAttacksProperty} from './ComputedProperties/RangedAttacksProperty.js';
import {SpecialAttacksProperty} from './ComputedProperties/SpecialAttacksProperty.js';
import {SpellsProperty} from './ComputedProperties/SpellsProperty.js';
import {SpellLikesProperty} from './ComputedProperties/SpellLikesProperty.js';
import {SpaceProperty} from './ComputedProperties/SpaceProperty.js';
import {AlignmentBlockProperty} from './ComputedProperties/AlignmentBlockProperty.js';
import {CrProperty} from './ComputedProperties/CrProperty.js';
import {SpecialAbilitiesProperty} from './ComputedProperties/SpecialAbilitiesProperty.js';
import {ImmunitiesProperty} from './ComputedProperties/ImmunitiesProperty.js';
import {DvProperty} from './ComputedProperties/DvProperty.js';

export class PropertyStore {
    static ComputedProperties = {
        'totalHd': new TotalHdProperty(),
        'health': new HealthProperty(),
        'hdSize': new HdSizeProperty(),
        'conHpBonus': new ConHpBonusProperty(),
        'class': new ClassProperty(),
        'feats': new FeatsProperty(),
        'languages': new LanguagesProperty(),
        'gear': new GearProperty(),
        'skills': new SkillsProperty(),
        'meleeAttacks': new MeleeAttacksProperty(),
        'rangedAttacks': new RangedAttacksProperty(),
        'specialAttacks': new SpecialAttacksProperty(),
        'primarySpells': new SpellsProperty('primary'),
        'secondarySpells': new SpellsProperty('secondary'),
        'tertiarySpells': new SpellsProperty('tertiary'),
        'spellLikes': new SpellLikesProperty(),
        'spaceProperty': new SpaceProperty(),
        'alignmentBlock': new AlignmentBlockProperty(),
        'cr': new CrProperty(),
        'specialAbilities': new SpecialAbilitiesProperty(),
        'immunities': new ImmunitiesProperty(),
        'dv': new DvProperty(),
    };

    static Instance = undefined;

    constructor(input) {
        PropertyStore.Instance = this;

        this.properties = {};
        for (const [key, computedProperty] of Object.entries(PropertyStore.ComputedProperties)) {
            computedProperty.input = input;
            computedProperty.propertyStore = this;
        }

        this.calculateDependencyDepthForTree();

        let sortedProperties = Object.entries(PropertyStore.ComputedProperties);
        sortedProperties.sort(function (a, b) {
            return a[1].dependencyDepth - b[1].dependencyDepth;
        });

        // console.log(sortedProperties);

        for (const sortedProperty of sortedProperties) {
            try {
                this.properties[sortedProperty[0]] = sortedProperty[1].getProperty();
            } catch (e) {
                this.properties[sortedProperty[0]] = undefined;
            }
        }

        console.log(this.properties);
    }

    get(property) {
        return this.properties[property];
    }

    calculateDependencyDepthForTree() {
        for (const [key, computedProperty] of Object.entries(PropertyStore.ComputedProperties)) {
            computedProperty.dependencyDepth = -1;
        }

        for (const [key, computedProperty] of Object.entries(PropertyStore.ComputedProperties)) {
            this.calculateDependencyDepth(computedProperty, 0);
        }

        /*
        let p = PropertyStore.ComputedProperties[Object.keys(PropertyStore.ComputedProperties)[0]];
        // console.log(p);
        for (const [key, computedProperty] of Object.entries(PropertyStore.ComputedProperties)) {
            if (computedProperty.dependencyDepth > p.dependencyDepth) {
                p = computedProperty;
            }
        }

        // console.log(p);
        this.updateDependencyDepth(p, p.dependencyDepth);

        */
        for (const [key, computedProperty] of Object.entries(PropertyStore.ComputedProperties)) {
            // console.log('Name: ' + computedProperty.constructor.name + ',  depth: ' + computedProperty.dependencyDepth);
        }
    }

    calculateDependencyDepth(computedProperty, iterations) {
        if (iterations > Object.keys(PropertyStore.ComputedProperties).length) {
            throw new Error('loop detected in computed properties dependencies');
        }

        if (computedProperty.dependencyDepth === -1) {
            let depth = 0;

            for (const dependency of computedProperty.getDependencies()) {
                iterations += 1;

                depth = Math.max(depth, this.calculateDependencyDepth(dependency, iterations));
            }

            computedProperty.dependencyDepth = depth + 1;
        }

        return computedProperty.dependencyDepth;
    }

    updateDependencyDepth(computedProperty, depth) {
        // console.log(computedProperty);
        computedProperty.dependencyDepth = depth;

        for (const dependency of computedProperty.getDependencies()) {
            this.updateDependencyDepth(dependency, depth - 1);
        }
    }
}