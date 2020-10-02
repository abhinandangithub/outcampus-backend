 // let { func_one, two } = require('./one');
import  func_one  from './one';

describe('test', () => {
    it('one ', () => {
        let res = func_one();
        expect(res).toBe('one');

    })
})