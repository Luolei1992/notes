## TypeScript 

#### 简介
> TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上
#### 入门示例
> TypeScript 中，使用 : 指定变量的类型，: 的前后有没有空格都可以
```js
function sayHello(person: string) {
    return 'Hello, ' + person;
}
let user = 'Tom';
console.log(sayHello(user));
```
> 执行编译命令 tsc hello.ts 得到.js文件
```js
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```
#### 原始数据类型
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

- 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol

1. 布尔值
    ```js
    let isDone: boolean = false;
    //注意，使用构造函数 Boolean 创造的对象不是布尔值
    let createdByNewBoolean: boolean = new Boolean(1);
    ```
    ```js
    //在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数
    let createdByNewBoolean: Boolean = new Boolean(1);
    //编译后得到
    let createdByNewBoolean = new Boolean(1);
    ```
    ```js
    //直接调用Boolean会返回boolean类型
    let createdByBoolean: boolean = Boolean(1);
    ```
2. 数值
    ```js
    let decLiteral: number = 6;
    //编译
    let decLiteral = 6;
    ```
3. 字符串
    ```js
    let myName: string = 'Tom';
    // 模板字符串
    let sentence: string = `Hello, my name is ${myName}.
    I'll be ${myAge + 1} years old next month.`;
    //编译
    let myName = 'Tom';
    var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
    ```
4. 空值
    ```js
    //JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
    function alertName(): void {
        alert('My name is Tom');
    }
    //声明一个void类型的变量没有意义，因为它只能赋值null和undefined
    let unusable: void = undefined;
    ```
5. Null 和 Undefined
    ```js
    let u: undefined = undefined;
    let n: null = null;
    //和void类型的区别在于，null和undefined是所有类型的子类型
    // 这样不会报错
    let num: number = undefined;
    // 这样也不会报错
    let u: undefined;
    let num: number = u;
    ```
#### any任意值

    ```js
    //如果是一个普通类型，在赋值过程中改变类型是不被允许的：
    let myFavoriteNumber: string = 'seven';
    myFavoriteNumber = 7;//报错
    //但如果是 any 类型，则允许被赋值为任意类型。
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;
    ```

> 在任意值上访问任何属性都是允许的：

    ```js
    let anyThing: any = 'hello';
    console.log(anyThing.myName);
    console.log(anyThing.myName.firstName);
    //也允许调用任何方法：
    let anyThing: any = 'Tom';
    anyThing.setName('Jerry');
    anyThing.setName('Jerry').sayHello();
    anyThing.myName.setFirstName('Cat');
    //可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
    ```

> 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

    ```js
    let something;
    something = 'seven';
    something = 7;
    something.setName('Tom');
    //等价于
    let something: any;
    something = 'seven';
    something = 7;
    something.setName('Tom');
    ```

#### 类型推论
> 定义：TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
```js
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7; //报错
//事实上，它等价于：
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
```
> 如果定义的时候没有赋值，就会被转化为any类型，可以随意赋值

#### 联合类型
```js
// 字符'|'表示或者，类型只能是string 或者 number
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

myFavoriteNumber = true;//报错
```
> 访问联合类型的属性或方法
```js
//当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
    return something.length;
}
//number没有length属性会报错

function getLength(something: string | number): number {
    return something.toString();//两种类型都有该属性
}
```
```js
//联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
//myFavoriteNumber等于7的时候，根据类型推断设置其为number类型，该类型没有length属性
```
#### 对象类型-接口
<font color=red >类和接口</font>

> 定义：在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）

1. 示例
    ```js
    interface Person {
        name: string;
        age: number;
    }

    let tom: Person = {
        name: 'Tom',
        age: 25
    };
    //定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致,多一个属性少一个属性都不行
    ```
2. 可选属性
    ```js
    interface Person {
        name: string;
        age?: number;
    }

    let tom: Person = {
        name: 'Tom'
    };
    //可选意思是该属性可以不存在，但是仍不能多出一个属性
    ```
3. 任意属性
> <font color=#52fd6d >需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集</font>
```js
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
//任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了
//此时 { name: 'Tom', age: 25, gender: 'male' } 的类型被推断成了 { [x: string]: string | number; name: string; age: number; gender: string; }，这是联合类型和接口的结合
```
4. 只读属性
```js
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;//id设置readonly属性后再被赋值会报错
```
> 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

#### 数组的类型
<font color=red >泛型</font>

1. 「类型 + 方括号」表示法
```js
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacci: number[] = [1, 1, '2', 3, 5];//不允许出现其他类型

let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');//这里的push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了
```