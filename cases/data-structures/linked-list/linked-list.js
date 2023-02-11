class LinkedList {
  head = null;

  addNode(node) {
    node.next = this.head;
    this.head = node;
  }

  length() {
    let i = 1;
    let temp = this.head;

    while (temp.next) {
      i += 1;
      temp = temp.next;
    }

    return i;
  }

  insert(node, index) {
    let temp = this.head;

    if (temp === null) {
      this.head = node;
    }

    while (index > 1 && temp.next !== null) {
      temp = temp.next;
      index -= 1;
    }

    node.next = temp.next;
    temp.next = node;
  }

  printData() {
    let temp = this.head;

    while (temp !== null) {
      console.log(temp.data);
      temp = temp.next;
    }
  }
}

class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const oneWayList = new LinkedList();

const first = new LinkedListNode(1);
const second = new LinkedListNode(2);
const third = new LinkedListNode(3);
const fourth = new LinkedListNode(4);

oneWayList.addNode(first);
oneWayList.addNode(second);
oneWayList.addNode(third);

oneWayList.insert(fourth, 1);
oneWayList.printData();
