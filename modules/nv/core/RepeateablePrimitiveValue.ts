

export class RepeateablePrimitiveValue<T> {
    private static counter: number = 0;

    private unique: number;
    value: T;

    constructor(value: T) {
        this.unique = RepeateablePrimitiveValue.counter++;
        this.value = value;
    }
}