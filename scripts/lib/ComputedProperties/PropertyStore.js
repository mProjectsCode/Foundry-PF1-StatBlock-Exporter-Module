import {TotalHdProperty} from './TotalHdProperty.js';
import {ClassProperty} from './ClassProperty.js';
import {HealthProperty} from './HealthProperty.js';
import {HdSizeProperty} from './HdSizeProperty.js';
import {ConHpBonusProperty} from './ConHpBonusProperty.js';
import {FeatsProperty} from './FeatsProperty.js';
import {LanguagesProperty} from './LanguagesProperty.js';
import {GearProperty} from './GearProperty.js';
import {SkillsProperty} from './SkillsProperty.js';
import {MeleeAttacksProperty} from './MeleeAttacksProperty.js';
import {RangedAttacksProperty} from './RangedAttacksProperty.js';
import {SpecialAttacksProperty} from './SpecialAttacksProperty.js';
import {PrimarySpellsProperty} from './PrimarySpellsProperty.js';
import {SpellLikesProperty} from './SpellLikesProperty.js';
import {SpaceProperty} from './SpaceProperty.js';

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
        'primarySpells': new PrimarySpellsProperty(),
        'spellLikes': new SpellLikesProperty(),
        'spaceProperty': new SpaceProperty(),
    };

    constructor(input) {
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
            this.properties[sortedProperty[0]] = sortedProperty[1].getProperty();
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

        let p = PropertyStore.ComputedProperties[Object.keys(PropertyStore.ComputedProperties)[0]];
        // console.log(p);
        for (const [key, computedProperty] of Object.entries(PropertyStore.ComputedProperties)) {
            if (computedProperty.dependencyDepth > p.dependencyDepth) {
                p = computedProperty;
            }
        }

        // console.log(p);
        this.updateDependencyDepth(p, p.dependencyDepth);

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