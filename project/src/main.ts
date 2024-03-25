// 1. 联合类型
function printID(id: number | string | boolean) {
  // console.log(id.length) // 本行会报错, 因此使用联合类型的值时, 需要特别小心
  // 专业名词: narrow(缩小范围)
  if (typeof id === 'string') {  // typescript 帮助确定 id 一定是 string
    console.log(id)
  } else {
    console.log(id);

  }
}
printID(123)
printID("abc")
printID(true)

// 2. 让一个参数是可选时, 其实它的本质表示的这个参数是 类型 | undefined 的联合类型
function fun(message?: string) {
  console.log(message)
}

function fun1(message: string | undefined) {
  console.log(message)
}

fun()
// fun1() // 必须传入 undefined

// 3. 定义类型别名
type IDType = string | number | boolean
type pointType = {
  x: number,
  y: number,
  z?: number
}
function test(point: pointType) {
  console.log(point.x);
  console.log(point.y);
  console.log(point.z);
}
// test({ x: 'name', y: true }) // 监视报错

5. // 类型断言
class Person { } // 定义 Person 类
class Student extends Person {
  studying() { }
}
function foo(p: Person) {
  // p.studying()  // 无法执行,因为不使用断言转换类型,则此时 p 为 Person
  console.log((p as Student).studying);

  (p as Student).studying()
}
const student = new Student()
foo(Student)

// 强制类型转换
const message: string = 'MaayaSis'
// const number: number = message // 不能强行赋值
// 使用断言强制转换
const number: number = (message as unknown) as number