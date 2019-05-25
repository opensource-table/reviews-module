const comparisons = {
  'Highest Rating': (reviewA, reviewB) => {
    const diff = reviewB.overall - reviewA.overall;
    if (diff !== 0) {
      return diff;
    }
    return comparisons.Newest(reviewA, reviewB);
  },
  'Lowest Rating': (reviewA, reviewB) => {
    const diff = reviewA.overall - reviewB.overall;
    if (diff !== 0) {
      return diff;
    }
    return comparisons.Newest(reviewA, reviewB);
  },
  Newest: (reviewA, reviewB) => {
    const dateB = new Date(reviewB.date);
    const dateA = new Date(reviewA.date);
    return dateB.getTime() - dateA.getTime();
  }
};

const Models = {
  ButtonLinkedList: class {
    constructor(page) {
      const newButton = new Models.ButtonListNode(page);
      this.head = newButton;
      this.tail = this.head;
    }

    addButtonToTail(page) {
      const newButton = new Models.ButtonListNode(page);
      newButton.previous = this.tail;
      this.tail.next = newButton;
      this.tail = newButton;
    }

    setButtonDisplays(inputButton = this.head, currentPage) {
      console.log(inputButton);
      const button = inputButton;
      if (!button.next) {
        button.display = 'Button';
        return;
      }
      if (!button.previous) {
        button.display = 'Button';
      } else if (button.page === currentPage) {
        button.display = 'Button';
      } else if (button.previous.page === currentPage) {
        button.display = 'Button';
      } else if (button.next.page === currentPage) {
        button.display = 'Button';
      } else if (button.previous.previous && button.previous.previous.page === currentPage && button.next) {
        button.display = 'Ellipse';
      } else if (button.next.next && button.next.next.page === currentPage && button.previous) {
        button.display = 'Ellipse';
      } else {
        button.display = null;
      }
      this.setButtonDisplays(button.next, currentPage);
    }

    getArray() {
      const array = [];
      let button = this.head;
      while (button) {
        array.push(button);
        button = button.next;
      }
      return array;
    }
  },
  ButtonListNode: class {
    constructor(page) {
      this.page = page;
      this.next = null;
      this.previous = null;
      //  Options are 'Button', 'Ellipse', and null
      this.display = null;
    }
  }
};

export { comparisons, Models };
