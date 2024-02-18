function myModule(){
    var msg = 'myatguigu'
    function doSomething(){
        console.log('doSomething() '+msg.toUpperCase())
    }
    function doOtherthing(){
        console.log('doOtherthing() '+msg.toLowerCase())
    }
    //向外暴露对象（给外部使用的方法）
    return {
        doSomething:doSomething,
        doOtherthing:doOtherthing
    }

}