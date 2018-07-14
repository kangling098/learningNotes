import { ADD, MINUS } from './action-types';
// action creater 生成action对象的函数,使得我们在派发事件的时候不会出现写错字找不着错误发生在哪里
export default {
    add(payload) {
        return { type: ADD, payload }
    },
    minus(payload) {
        return { type: MINUS, payload }
    }
}