function Promise(executor) {
    this.PromiseState = "pending"
    this.PromiseResult = null
    this.callbacks = []
    const self = this
    function resolve(data) {
        if (self.PromiseState != "pending") return//PromiseState只能修改一次的实现
        self.PromiseState = "fulfilled"
        self.PromiseResult = data
        self.callbacks.forEach(element => {
            element.onResolved(data)
        });
    }
    function reject(data) {
        if (self.PromiseState != "pending") return
        self.PromiseState = "rejected"
        self.PromiseResult = data
        self.callbacks.forEach(element => {
            element.onRejected(data)
        });
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    return new Promise((resolve, reject) => {
        if (this.PromiseState === "fulfilled") {
            try {
                let result = onResolved(this.PromiseResult)
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
                let result = onRejected(this.PromiseResult)
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
            this.callbacks.push({//指定多个回调的实现
                onResolved: function () {
                    try {
                        let result = onResolved(self.PromiseResult)
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
                },
                onRejected: function () {
                    try {
                        let result = onRejected(self.PromiseState)
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
            })
        }
    })
}