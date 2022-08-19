
class GroceryStore {
    public readonly chocolate = 100;
    public readonly soap = 500;
}

class MobileStore {
    public readonly apple =123;
}

// Create a singleton store using classes
class Store {
    readonly grocery: GroceryStore;
    readonly mobile: MobileStore;

    private static instance;
    private constructor() {
        this.grocery = new GroceryStore();
        this.mobile = new MobileStore();
    }
    public static get shared() {
        if(!Store.instance) {
            Store.instance = new Store()
        }
        return Store.instance
    }
    public static get grocery() {
        return Store.shared.grocery
    }
}

// Always get the same intance for the properties in store.
console.log(Store.grocery)

// You can't create an instance of store.
console.log(new Store())

