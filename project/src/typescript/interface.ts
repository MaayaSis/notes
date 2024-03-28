// 1. 通过 interface 声明对象类型
// 在其中可以定义可选类型
// 也可以定义只读属性
interface IInfoType {
  readonly name: string
  age: number
  friend?: {
    name: string
  }
}
const info: IInfoType = {
  name: "why",
  age: 18,
  friend: {
    name: "kobe"
  }
}
console.log(info.friend?.name)
console.log(info.name)
// info.name = "123"
info.age = 20

// 2. 通过 interface 来定义索引类型
interface IndexLanguage {
  [index: number]: string
}
const frontLanguage: IndexLanguage = {
  0: "HTML",
  1: "CSS",
  2: "JavaScript",
  3: "Vue"
}
interface ILanguageYear {
  [name: string]: number // 索引的名称可以随意设置: [language: string]: number 
}
const languageYear: ILanguageYear = {
  "C": 1972,
  "Java": 1995,
  "JavaScript": 1996,
  "TypeScript": 2014,
}
// 3. 通过 interface 来定义函数类型
interface CalcFunc {
  (num1: number, num2: number): number
}
const add: CalcFunc = (num1, num2) => {
  return num1 + num2
}
const sub: CalcFunc = (num1, num2) => {
  return num1 - num2
}

// 4. 接口的继承
// 4.1 接口和类一样可以使用 extends 关键字进行继承
// 4.2 接口是支持多继承的(类不支持多继承)
interface Person {
  name: string
  eating: () => void
}
interface Animal {
  running: () => void
}
interface Student extends Person, Animal {
  sno: number
}
const stu: Student = {
  sno: 110,
  name: "why",
  eating: function() {},
  running: function() {}
}