function Promise(executor){//覆盖全局的Promise
    //同步调用[执行器函数]
    this.PromiseState = "pending"
    this.PromiseResult = null
    this.callback = { }
    let resolve = data=>{//使用箭头函数,改变this指向的对象
        if(this.PromiseState !== "pending") return;
        this.PromiseState = "fulfilled"
        this.PromiseResult = data
        if(this.callback.onResolved){
            this.callback.onResolved(data)
        }
    }
    let reject = data=>{
        if(this.PromiseState !== "pending") return;
        this.PromiseState = "rejected"
        this.PromiseResult = data
        if(this.callback.onRejected){
            this.callback.onRejected(data)
        }
    }
    try {
        executor(resolve,reject)
    } catch (err) {//throw抛出的值作为实参传入
        reject(err)
    }
}
//不给Promise的显示原型添加then方法,则Promise的实例对象p无法通过隐式原型找到then方法
Promise.prototype.then = function(onResolved,onRejected){
    if(this.PromiseState === "fulfilled"){
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState === "rejected"){
        onRejected(this.PromiseResult)
    }
    if(this.PromiseState === "pending"){
        this.callback = {
            onResolved,//即onResolved:onResolved,
            onRejected
        }
    }
}