function Promise(executor) {//创建Promise的构造函数
    this.PromiseState = "pending"//设置属性
    this.PromiseResult = null
    this.callbacks = []//创建对象存储then的指定回调,[32]优化多个回调的实现
    const self = this
    function resolve(data) {
      if (self.PromiseState != "pending") return//状态只能修改一次
      self.PromiseState = "fulfilled"//pending=>fulfilled
      self.PromiseResult = data
      self.callbacks.forEach(item => {//从callbacks数组中遍历出then的指定回调
        item.onResolved(data)
      })
    }
    function reject(data) {
      if (self.PromiseState != "pending") return//状态只能修改一次
      self.PromiseState = "rejected"//pending=>rejected
      self.PromiseResult = data
      self.callbacks.forEach(item => {//从callbacks数组中遍历出then的指定回调
        item.onRejected(data)
      })
    }
    try {//捕获异常
      executor(resolve, reject)
    } catch (err) {//throw抛出的值作为实参传入
      reject(err)
    }
  }
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    return new Promise((resolve, reject) => {
      function callback(type) {//增加代码复用性
        try {//throw捕获
          let result = type(self.PromiseResult)
          if (result instanceof Promise) {//对then指定回调返回的数据进行判断
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
      if (this.PromiseState === "fulfilled") callback(onResolved)
      if (this.PromiseState === "rejected") callback(onRejected)
      if (this.PromiseState === "pending") {
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved)
          },
          onRejected: function () {
            callback(onRejected)
          }
        })
      }
    })
  }