function Promise(executor){//覆盖全局的Promise

}
//不给Promise的显示原型添加then方法,则Promise的实例对象p无法通过隐式原型找到then方法
Promise.prototype.then = function(onResolved,onRejected){

}