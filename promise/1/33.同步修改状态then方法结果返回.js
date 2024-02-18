function Promise(executor) {//覆盖全局的Promise
    //同步调用[执行器函数]
    this.PromiseState = "pending"
    this.PromiseResult = null
    this.callbacks = []
    const self = this
    let resolve = data => {//使用箭头函数,改变this指向的对象
        if (this.PromiseState !== "pending") return;
        this.PromiseState = "fulfilled"
        this.PromiseResult = data
        this.callbacks.forEach(item => {
            item.onResolved(data)
        });
    }
    let reject = data => {
        if (this.PromiseState !== "pending") return;
        this.PromiseState = "rejected"
        this.PromiseResult = data
        this.callbacks.forEach(item => {
            item.onResolved(data)
        });
    }
    try {
        executor(resolve, reject)
    } catch (err) {//throw抛出的值作为实参传入
        reject(err)
    }
}
//不给Promise的显示原型添加then方法,则Promise的实例对象p无法通过隐式原型找到then方法
Promise.prototype.then = function (onResolved, onRejected) {
    return new Promise((resolve, reject) => {
        if (this.PromiseState === "fulfilled") {
            try {
                let result = onResolved(this.PromiseResult);
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        }
        if (this.PromiseState === "rejected") {
            try {
                let result = onRejected(this.PromiseResult);
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        }
        if (this.PromiseState === "pending") {
            this.callbacks.push({//arr.push:将一个数据压入数组的末尾
                onResolved,//即onResolved:onResolved,
                onRejected
            })
        }
    })
}