import {makeAutoObservable} from "mobx";

class TaskTreeStore {
    count = 0;

    get total () {
        return this.count * 2;
    }

    constructor() {
        makeAutoObservable(this);
    }

    increment = () => {
        this.count = this.count + 1;
    }

    decrement = () => {
        this.count = this.count - 1;
    }


}

export default new TaskTreeStore();