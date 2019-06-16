export class BaseModel {
    constructor(object, mapProps = {}) {
        Object.entries(mapProps).map(([key, value]) => (this[key] = object[value]));
    }
}
