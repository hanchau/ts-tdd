import { Stack } from "../src/Stack";

describe('Stack', () => {
    test("Constructor should initialize empty stack", () => {
        expect(new Stack().size()).toEqual(0);
    });
    it('should have a size 3 when 3 elements are pushed on stack', () => {
        const stack: Stack<string> = new Stack<string>;
        stack.push('first');
        stack.push('second');
        stack.push('third');
        
        expect(stack.size()).toBe(3);
    });
    it('should yield the last element when popped', () => {
        const stack: Stack<string> = new Stack<string>;
        stack.push('first');
        stack.push('second');
        stack.push('third');
        stack.push('fourth');
        
        expect(stack.pop()).toBe('fourth');
    });

    it('should show the last element when peeked', () => {
        const stack: Stack<string> = new Stack<string>;
        stack.push('first');
        stack.push('second');
        stack.push('third');
        stack.push('fourth');
        
        expect(stack.peek()).toBe('fourth');
    });
   
    it('stack should be empty when all elements popped', () => {
        const stack: Stack<string> = new Stack<string>;
        stack.push('first');
        stack.push('second');
        stack.push('third');
        stack.pop(); stack.pop(); stack.pop();
        
        expect(stack.isEmpty()).toBe(true);
    });

    it('stack should be empty when all cleared', () => {
        const stack: Stack<string> = new Stack<string>;
        stack.push('first');
        stack.push('second');
        stack.push('third');
        stack.push('fourth');
        stack.clear();
        
        expect(stack.isEmpty()).toBe(true);
    });

});