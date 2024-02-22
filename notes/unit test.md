# 学习目标

# 前端测试

# vue中的测试

# 单元测试框架 Mocha,Chai

1. `Karma` 基于 `node.js` 能够模拟 `javascript` 代码在不同浏览器的情况
2. `Mocha` 测试框架,不带断言库
3. `Chai` 断言库
4. 断言: 判断源码的实际执行结果与预期结果是否一致,不一致则抛错
5. 测试需要 `Mocha` 和 `Chai` 配合使用

# vue 初始化准备

# vue 初始化测试

1. 在项目根目录下创建 `unit/spces` 文件夹及测试用的 `viewName.spec.js` 文件
2. 在 `viewName.spec.js` 文件中引入需要测试的组件,并通过 `chai` 断言输出结果是否符合预期

# 测试用例报告

如果测试成功在 `coverage` 文件夹下会出现测试用例报告

# TodoMVC 初始化

安装 `vue` 官方提供的单元测试工具库(方便在 `node` 环境下操作 `vue` 文件)

```javascript
npm install --save-dev @vue/test-utils@1.0.0-beta.12
```

# TodeMVC 查看功能

# TodeMVC 查看功能测试

```javascript
// 1. 引用 vue 的测试工具
import { mount } from '@vue/test-utils'
// 2. 引用被测试的组件/页面
import TodoMVC from '@/components/TodoMVC'
// 3, 创建测试套件
describe('测试套件', () => {
  // 创建不同测试用例
  // 测试查看功能的用例
  it('测试查看功能', () => {
    const wrapper = mount(TodoMVC) // 挂载组件
    console.log(wrapper.find('.todo-list')) // 通过 class 名找到指定的 dom 元素
    console.log(warpper.vm.todos) // 通过属性名找到 data 中的数据
  })
})
```

# TodoMVC 增加

# TodoMVC 增加测试

# TodoMVC 删除

# TodoMVC 删除测试

# TodoMVC 修改

# TodoMVC 修改测试