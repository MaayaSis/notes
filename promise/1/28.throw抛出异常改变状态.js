function Promise(executor){//覆盖全局的Promise
    //同步调用[执行器函数]
    this.PromiseState = "pending"
    this.PromiseResult = null
    let resolve = data=>{//使用箭头函数,改变this指向的对象
        this.PromiseState = "fulfilled"
        this.PromiseResult = data
    }
    let reject = data=>{
        this.PromiseState = "rejected"
        this.PromiseResult = data
    }
    try {
        executor(resolve,reject)
    } catch (err) {//throw抛出的值作为实参传入
        reject(err)
    }
}
//不给Promise的显示原型添加then方法,则Promise的实例对象p无法通过隐式原型找到then方法
Promise.prototype.then = function(onResolved,onRejected){

}