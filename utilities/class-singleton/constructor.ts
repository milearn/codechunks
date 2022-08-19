// Auto instantiate constructor properties

class Api {
    /**
     * This is same as:
     * constructor(callbackFn, prop) {
     *   this.callbackFn = callbackFn;
     *   this.prop = prop;
     * }
     */
    constructor(private callbackFn, private prop) {

    }

    public get apiCallback() {
        return this.callbackFn()
    }
    public get apiProp() {
        return this.prop
    }
}

console.log(new Api(() => 'callbackFn', 5).apiCallback)
console.log(new Api(() => 'callbackFn', 5).apiProp)

  