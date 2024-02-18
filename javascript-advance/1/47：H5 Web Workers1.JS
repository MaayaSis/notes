function fibonacci(n){
    return n<=2 ?　1 : fibonacci(n-1)+fibonacci(n-2)//递归调用
}
var onmessage = function(event){
    var number = event.data
    console.log('分收主')
    var result = fibonacci(number)
    postMessage(result)
    console.log('分发主') // console是浏览器提供的
    alert(result)
}

