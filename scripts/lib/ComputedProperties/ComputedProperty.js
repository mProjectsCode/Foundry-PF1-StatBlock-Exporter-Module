export class ComputedProperty {
    constructor() {
        this.input = {};
        this.propertyStore = undefined;
        this.dependencyDepth = -1;
    }

    getProperty() {
        return 'NULL';
    }

    getDependencies() {
        return [];
    }
}