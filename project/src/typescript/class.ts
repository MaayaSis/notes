export default function () {
  // 类
  // 1. 类的定义
  class Person {
    // 必须步骤 - 定义属性
    // name: string
    // age: number
    // 必须步骤 - 属性初始化
    // 方式1: 在定义属性时就进行初始化赋值
    name: string = 'maaya'
    age: number = 16
    // 方式2: 构建函数实例时执行构造函数初始化赋值
    constructor(name?: string, age?: number) {
      if (typeof name === 'string' && typeof age === 'number') {
        this.name = name
        this.age = age
      }
    }
    print() {
      console.log(this?.name + this?.age)
    }
  }
  const person = new Person()
  console.log(person.name)
  console.log(person.age)

  // 2. 类的继承
  class Student extends Person {
    level: string
    constructor(name: string, age: number, level: string) {
      // 必须先构造父类才能使用 this
      super(name, age)
      this.level = level
    }
    print() {
      super.print()
      console.log("student's print");

    }
    studying() {
      console.log(this.name + this.age + this.level);

    }
  }
  const student = new Student('student', 18, '六年级')
  console.log(student.print());
  console.log(student.studying);

  // 3. 类的多态
  class Animal {
    action() {
      console.log("Animal's action");

    }
  }
  class Dog extends Animal {
    action() {
      console.log("Dog's action");
    }
  }
  class Fish extends Animal {
    action() {
      console.log("Fish's action");
    }
  }
  function handlerAction(animals: Animal[]) {
    animals.forEach(animal => {
      animal.action()
    })
  }
  handlerAction([new Dog(), new Fish()])

  // 3. 成员的修饰符
  class Test {
    private status: string = ''
    getStatus() {
      console.log(this.status)
    }
    setStatus(newStatus: string) {
      this.status = newStatus
    }
  }
  const test = new Test()
  // test.status

  // 4. 属性的只读 readOnly
  class Human {
    // 只读属性是可以在构造器中赋值,赋值之后就不可以修改
    // 属性本身不能进行修改,但是如果它是对象类型,对象中的属性是可以修改
    readonly name: string
    age?: number
    readonly friend?: Human
    constructor(name: string, friend?: Human) {
      this.name = name
      this.friend = friend
    }
  }
  const p = new Human("why", new Human("kobe"))
  console.log(p.name)
  console.log(p.friend)
  // 不可以直接修改friend
  // p.friend = new Human("james")
  if (p.friend) {
    p.friend.age = 30
  }

  // 5. getters 和 setters
  class Update {
    private _name: string
    constructor(name: string) {
      this._name = name
    }
    //访问器setter/getter
    // setter
    set name(newName) {
      this._name = newName
    }
    // getter
    get name() {
      return this._name
    }
  }
  const update = new Update("sis")
  update.name = "maaya"
  console.log(update.name)

  // 6. 类的静态成员
  class Static {
    static time: string = '20:00'
    static print() {
      console.log("上课时间" + this.time);
    }
  }
  Static.print()

  // 7. abstract 抽象类
  function makeArea(shape: Shape) {
    return shape.getArea()
  }
  // 7.1. 抽象属性必须在抽象类中
  // 7.2. 抽象方法不能有实现
  abstract class Shape {
    abstract getArea(): number
  }
  // 7.3. 继承至抽象类的子类,必须有抽象方法(getArea)的实现
  class Rectangle extends Shape {
    private width: number
    private height: number
    constructor(width: number, height: number) {
      super()
      this.width = width
      this.height = height
    }
    getArea() {
      return this.width * this.height
    }
  }
  class Circle extends Shape {
    private r: number
    constructor(r: number) {
      super()
      this.r = r
    }
    getArea() {
      return this.r * this.r * 3.14
    }
  }
  // 7.4. 抽象类无法创建实例
  // new Shape()
  const rectangleArea = makeArea(new Rectangle(100, 200))
  const circleArea = makeArea(new Circle(3))
  console.log(rectangleArea, circleArea);

  // 8. 类的类型
  class ClassTest {
    name: string = 'Test'
    handlerTest() {
      console.log(this.name)
    }
  }
  // 直接声明创建的对象时 ClassTest 类的实例
  const classTest1: ClassTest = {
    name: '姐姐',
    handlerTest() {
      return 'my name'
    }
  }
  function printClassTest(attr: ClassTest) {
    attr.handlerTest();
  }
  printClassTest(classTest1)
  printClassTest({
    name: 'Maaya',
    handlerTest() {
      console.log('姐姐');
    }
  })
}