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