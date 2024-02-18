(function (){
    var msg = 'myatguigu'
    function doSomething(){
        console.log('doSomething() '+msg.toUpperCase())
    }
    function doOtherthing(){
        console.log('doOtherthing() '+msg.toLowerCase())
    }
    //直接函数自调用，然后将自己给window
    window.myModule2 = {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }
})()