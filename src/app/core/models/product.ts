export class Product {
    'id'?: number;
    'text': number;
    'value': number;
    'discount': number;
    constructor(data?: any) {
        Object.assign(this, data);
    }
}
