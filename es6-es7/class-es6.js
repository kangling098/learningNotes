// 类的调用检测 检测实例是不是new出来的
function _classCallCheck(instance, constructor) {
    if(!(instance instanceof constructor)) {
        throw new Error('Class constructor Child cannot be invoked without new')
    }
}

// constructor 是构造函数
// protoPropertys 是原型方法的描述
// staticPropertys 是静态方法的描述
function definePropertys(target ,arr){
    for (let i=0;i<arr.length;i++){
        Object.defineProperty(target, arr[i].key,{
            ...arr[i],
            configurable:true,
            writable: true,
            enumerable: true
        })
    }
}
function _createClass(constructor, protoPropertys,staticPropertys){
    
}