class Queue {
    private list:number[];
    dequeue() {
        throw new Error("Queue is empty");
    }

    enqueue(element: number) {
        this.list.push(element);
    }
}

describe('Queue', () => {

    it('should throw an error on dequeue when the queue is empty', function () {
        let queue = new Queue();
        expect(() => {
            queue.dequeue();
        }).toThrowError("Queue is empty");
    });

    it('should dequeue the single element when a single unit is enqueued', function () {
        let queue = new Queue();
        let element: number = 5;

        queue.enqueue(element);

        expect(queue.dequeue()).toBe(element);
    });



});
