function move(name,attr,target,speed,callback) {
    var current = parseInt(getStyle(name, attr))
    if(current > target){
        speed = -speed;
    }
    //考虑多次点击造成的定时间器叠加问题
    clearInterval(name.timer);
    //因为页面一加载的时候就会载入JS代码，所以会先运行一遍，这样就存在了obj.timer属性，这样在点击时，就会加载timer属性了
    name.timer = setInterval(function () {
        //获取box1原来的值,parseInt是为了将字符串中的值合法的取出来
        var oldvalue = parseInt(getStyle(name, attr))
        //考虑不是移动数值不是整数的情况
        var newvalue = oldvalue + speed;
        if ((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)) {
            newvalue = target;
        }
        //因为这里要放的是一个变量，所以attr要加[]，因为常量用点，变量用中括号
        name.style[attr] = newvalue + 'px';
        if (newvalue == target) {
            clearInterval(name.timer);
            //回调函数，但是如果有的不想使用回调函数，那么就先判断是否有回调函数,有就执行，没有不执行
            callback && callback();
        }
    }, 30)
}
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else { return obj.currentStyle[name]; };
};