class ListNode {
    constructor(value, next) {
        this.data = value;
        this.next = !next ? null : next;
    }
}

class LinkedList {
    #head;
    constructor() {
        this.#head = null;
    }

    push(value) {
        const newNode = new ListNode(value);
        let temp = this.#head;
        if (!temp) {
            this.#head = newNode
            return;
        }

        while (temp.next) {
            temp = temp.next;
        }

        temp.next = newNode;
    } 

    unshift(value) {
        const newNode = new ListNode(value);
        newNode.next = this.#head;
        this.#head = newNode;
    }


    print() {
        let current = this.#head;
        if (!this.#head) return console.log('This is an empty list');
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    lastNode() {
        let current = this.#head;
        while(true) {
            if (current.next == null) return current;
            current = current.next;
        }
        // return current;
    }

    toArray() {
        const array = [];
        let current = this.#head;
        if (!this.#head) return [];
        while (current) {
            array.push(current.data);
            current = current.next;
        }
        return array;
    }


    reverse() {
        let current = this.#head;
        let previous = null;
        let temp = null;

        while (current) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }

        this.#head = previous
    }
}


export default LinkedList;