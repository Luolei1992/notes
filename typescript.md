## TypeScript 

### 简介
> TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上
### 入门示例
> TypeScript 中，使用 : 指定变量的类型，: 的前后有没有空格都可以
```ts
function sayHello(person: string) {
    return 'Hello, ' + person;
}
let user = 'Tom';
console.log(sayHello(user));
```
> 执行编译命令 tsc hello.ts 得到.js文件
```ts
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```
### 原始数据类型
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

- 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol

#### 布尔值
    ```ts
    let isDone: boolean = false;
    //注意，使用构造函数 Boolean 创造的对象不是布尔值
    let createdByNewBoolean: boolean = new Boolean(1);
    ```
    ```ts
    //在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数
    let createdByNewBoolean: Boolean = new Boolean(1);
    //编译后得到
    let createdByNewBoolean = new Boolean(1);
    ```
    ```ts
    //直接调用Boolean会返回boolean类型
    let createdByBoolean: boolean = Boolean(1);
    ```
#### 数值
    ```ts
    let decLiteral: number = 6;
    //编译
    let decLiteral = 6;
    ```
#### 字符串
    ```ts
    let myName: string = 'Tom';
    // 模板字符串
    let sentence: string = `Hello, my name is ${myName}.
    I'll be ${myAge + 1} years old next month.`;
    //编译
    let myName = 'Tom';
    var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
    ```
#### 空值
    ```ts
    //JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
    function alertName(): void {
        alert('My name is Tom');
    }
    //声明一个void类型的变量没有意义，因为它只能赋值null和undefined
    let unusable: void = undefined;
    ```
#### Null 和 Undefined
    ```ts
    let u: undefined = undefined;
    let n: null = null;
    //和void类型的区别在于，null和undefined是所有类型的子类型
    // 这样不会报错
    let num: number = undefined;
    // 这样也不会报错
    let u: undefined;
    let num: number = u;
    ```
### any任意值
    ```ts
    //如果是一个普通类型，在赋值过程中改变类型是不被允许的：
    let myFavoriteNumber: string = 'seven';
    myFavoriteNumber = 7;//报错
    //但如果是 any 类型，则允许被赋值为任意类型。
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;
    ```

> 在任意值上访问任何属性都是允许的：

    ```ts
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

    ```ts
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

### 类型推论
> 定义：TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7; //报错
//事实上，它等价于：
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
```
> 如果定义的时候没有赋值，就会被转化为any类型，可以随意赋值

### 联合类型
```ts
// 字符'|'表示或者，类型只能是string 或者 number
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

myFavoriteNumber = true;//报错
```
> 访问联合类型的属性或方法
```ts
//当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
    return something.length;
}
//number没有length属性会报错

function getLength(something: string | number): number {
    return something.toString();//两种类型都有该属性
}
```
```ts
//联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
//myFavoriteNumber等于7的时候，根据类型推断设置其为number类型，该类型没有length属性
```
### 对象类型-接口
<font color=red >类和接口</font>

> 定义：在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）

#### 示例
    ```ts
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
#### 可选属性
    ```ts
    interface Person {
        name: string;
        age?: number;
    }

    let tom: Person = {
        name: 'Tom'
    };
    //可选意思是该属性可以不存在，但是仍不能多出一个属性
    ```
#### 任意属性
> <font color=#fb9cfb >需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集</font>
```ts
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
#### 只读属性
```ts
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
> <font color=#fb9cfb>注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候</font>

### 数组的类型
#### 「类型 + 方括号」表示法
```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacci: number[] = [1, 1, '2', 3, 5];//不允许出现其他类型

let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');//这里的push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了
```
#### 数组<font color=red >泛型</font>

> eg: `let fibonacci: Array<number> = [1, 1, 2, 3, 5];`
```ts
//二维数组
var shuzu =function(){
    let twoM : string[][] = [];
    //或let twoM : Array<Array<string>> = new Array<Array<string>>();
    twoM[0] = ["a1", "a2", "a3"]  //直接赋值数组
    twoM.push([])  //先插入一个空的数组
    twoM[1][1] = "b2"  //再向刚插入的数组赋值
    for(let x of twoM){
        for(let y of x){
            console.log(y);
        }  
        console.log(x);  
    }
}
shuzu();
```
- 创建一个指定长度的数组，同事每一项都有一个默认值,这样创建没有准确的定义创建返回值的类型
    ```ts
    function createArray(length: number, value: any): Array<any> {
        let result = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    createArray(3, 'x'); // ['x', 'x', 'x']
    ```
- Array\<any>这样数组的每项就是任意值，现在添加泛型\<T>来限制每项的返回值
    ```ts
    function createArray<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    createArray<string>(3, 'x');
    createArray<string>(3, 2); // 报错，只能输入string类型
    createArray(3, 2); // 类型推论自动推算出来类型为number,这个和上面有啥区别呢？？？

    ```
- 多个类型参数
    ```ts
    //定义了一个 swap 函数，用来交换输入的元组
    function swap<T, U>(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]];
    }
    swap([7, 'seven']); // ['seven', 7]
    ```
- 泛型约束
    ```ts
    function loggingIdentity<T>(arg: T): T {
        console.log(arg.length);
        return arg;
    }
    // 泛型 T 不一定包含属性 length，所以编译的时候报错了
    ```
    ```ts
    //下面用 extends 约束泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。
    interface Lengthwise {
        length: number;
    }
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }
    loggingIdentity([7])//数组有length属性
    loggingIdentity(7)//报错数字类型没有length属性
    ```
    
    ```ts
    function copyFields<T extends U, U>(target: T, source: U): T {
        for (let id in source) {
            target[id] = (<T>source)[id];
        }
        return target;
    }
    let x = { a: 1, b: 2, c: 3, d: 4 };
    copyFields(x, { b: 10, d: 20 }); //{ a: 1, b: 10, c: 3, d: 20 }
    copyFields(x, { b: 10, d: '20' }); //报错，类型推论自动推算出来类型为number，传入string类型会报错
    copyFields(x, { b: 10, f: 20 }); //报错，f在t中不存在
    //使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
    ```
- 泛型接口
    ```ts
    interface CreateArrayFunc<T> {
        (length: number, value: T): Array<T>;
    }
    let createArray: CreateArrayFunc<any>;
    createArray = function<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    createArray(3, 'x'); // ['x', 'x', 'x']
    //注意，此时在使用泛型接口的时候，需要定义泛型的类型
    ```
- 泛型类 <font color=red>???</font>
    ```ts
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
    //泛型参数的默认类型
    ```
- 泛型参数的默认类型 <font color=red> 什么类型是未知类型？</font>
    ```ts
    function createArray<T = string>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    //我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
    ```
#### 用接口返回数组
> 限定数组的索引为数字时(<font color=red>索引不是数字的话要怎么用？？？</font>)，值也必须位数字
```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
#### 类数组
```ts
function sum() {
    let args: IArguments = arguments;
}
//其中IArguments为ts中定义好的类型
// interface IArguments {
//     [index: number]: any;
//     length: number;
//     callee: Function;
// }
let a = new sum()
a = [4,function(){console.log(999)}]
```
#### any 在数组中的应用
```ts
//any表示数组中可以出现任意类型
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```
### 函数的类型
#### 函数声明
```ts
//参数多一个少一个都不行
function sum(x: number, y: string): number {
    return x - y;
}
console.log(sum(5,'2'))//The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type
function sum(x: number, y: any): number {
    return x - y;
}
console.log(sum(5,'2'))//这样是可以的，为啥呢？？？
```
#### 函数表达式

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
//在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
```
#### 用接口定义函数的形状

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
mySearch('2019年中华人民共和国成立70周年','70')//true
//相当于是把函数表达式前半部分提取出来作为接口
```
#### 可选参数
> <font color=#fb9cfb>注:可选参数后面不能再有必需参数，必需参数必须放在可选的前面</font>
```ts
function sayHello(say:string,name?:string){
    if(name){
        return say+name
    }else{
        return say
    }
}
sayHello('hello')//hello
```
#### 参数默认值

```ts
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');//Tom Cat
let cat = buildName(undefined, 'Cat');//Tom Cat
```
#### 剩余参数

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```
#### 重载

```ts
function reverse(x: number): number;
function reverse(x: string): string;
//为了表达，输入为数字的时候，输出也为数字，输入为字符串的时候，输出也为字符串，加了上述两行代码，有什么意义？？？？？？？？？？？？？？？？？？？？
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
### 类型断言
#### 语法(`<类型>值` 或 `值 as 类型`)
	
	- 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种
#### 将一个联合类型的变量指定为一个更加具体的类型
    ```ts
    function getLength(something: string | number): number {
        if (something.length) {
            return something.length;
        } else {
            return something.toString().length;
        }
    }
    //something类型不确定，number类型没有length属性，这里智能访问二者都有的属性toString()是可以的
    ```
    - 可以设置类型断言把something设置为string类型，类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的

    ```ts
    function getLength(something: string | number): number {
        if ((<string>something).length) {
            return (<string>something).length;
        } else {
            return something.toString().length;
        }
    }
    //类型断言的用法如上，在需要断言的变量前加上 <Type> 即可。
    ```
### 声明文件

#### 声明语句

   - 假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 \<script> 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了
   > js中的用法
   ```js
    $('#foo');
    // or
    jQuery('#foo');
   ```
   > 但是在ts文件中
   ```ts
    jQuery('#foo');//ERROR: Cannot find name 'jQuery'
    //正确的用法
    declare var jQuery: (selector: string) => any;
    jQuery('#foo');
    //declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。编译结果
    jQuery('#foo');
   ```
#### 什么是声明文件

   - 通常把声明的语句放到单独的文件（jQuery.d.ts）中，这就是声明文件

  > 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了

  ```js
  /path/to/project
  ├── src
  |  ├── index.ts
  |  └── jQuery.d.ts
  └── tsconfig.json
  ```
> <font color=#fb9cfb>注：假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件</font>

#### 第三方声明文件

- 社区定义好的文件[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)
- @type统一管理声明文件[类型搜索](https://microsoft.github.io/TypeSearch/)
  ```js
  npm install @types/jquery --save-dev
  //这种方式添加的不需要任何配置
  ```
#### 书写声明文件

> 库的使用场景主要有以下几种：
   - 全局变量：通过 \<script> 标签引入第三方库，注入全局变量
   - npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
   - UMD 库：既可以通过 \<script> 标签引入，又可以通过 import 导入
   - 直接扩展全局变量：通过 \<script> 标签引入后，改变一个全局变量的结构
   - 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
   - 模块插件：通过 \<script> 或 import 导入后，改变另一个模块的结构
  
#### 全局变量
> <font color=#fb9cfb>变量类型定义都不能加具体的实现</font>
- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型

1. declare var/declare let/declare const

> 在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别，const声明后不允许在改变其值
```ts
declare let jQuery: (selector: string) => any;
jQuery("#id")
jQuery = function(element){
    return document.querySelector(element)
}
//当使用const定义的时候
declare const jQuery:(selector:string) => any;
jQuery = function(element){
    return document.querySelector(element)
}//ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.
```
> <font color=#fb9cfb>注：一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let;声明语句中只能定义类型，切勿在声明语句中定义具体的实现</font>
```ts
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: An implementation cannot be declared in ambient contexts.
```
2. declare function
> 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义

```ts
// src/jQuery.d.ts
declare function jQuery(selector: string): any;

//在函数类型的声明语句中，函数重载也是支持的
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
// src/index.ts
jQuery('#foo');
jQuery(function() {
    alert('Dom Ready!');
});
```
3. declare class

> 全局变量是个类的时候
```ts
// src/Animal.d.ts
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
// src/index.ts
let cat = new Animal('Tom');
```
4. declare enum

```ts
// src/Directions.d.ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
// src/index.ts
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

5. declare namespace
```ts
// src/jQuery.d.ts
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}
// src/index.ts
jQuery.ajax('/api/get_something');
console.log(jQuery.version);
const e = new jQuery.Event();
e.blur(jQuery.EventType.CustomClick);
```
6. 嵌套的命名空间

```ts
// src/jQuery.d.ts
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    namespace fn {
        function extend(object: any): void;
    }
}
// src/index.ts
jQuery.ajax('/api/get_something');
jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});
```
7. interface 和 type

> 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型
```ts
// src/jQuery.d.ts
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void;
}
// 这样的话，在其他文件中也可以使用这个接口或类型了：
// src/index.ts
let settings: AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
// type 与 interface 类似，不再赘述。
```
8. 防止命名冲突

> 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到namespace下
```ts
// src/jQuery.d.ts
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀：
// src/index.ts
let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
```
9. 声明合并
> 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来
```ts
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
// src/index.ts
jQuery('#foo');
jQuery.ajax('/api/get_something');
```

#### npm包
- 在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：
  - 与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。
  - 发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了。
- 假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：
  - 创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外的配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
  - 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
```js
// 目录结构
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
//tsconfig.json配置
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
//如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应的模块的声明文件了
```
- npm包声明语法主要方式
  - export 导出变量
  - export namespace 导出（含有子属性的）对象
  - export default ES6 默认导出
  - export = commonjs 导出模块

```ts
// src/foo.d.ts
export function getName(name:string): string;
// src/index.ts
import { getName } from './foo';
let nameS = getName;
nameS = function (name) {
    return 'byll'+name;
};
console.log(nameS('hai'))
```

### 內置對象
### 类型别名
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
### 字符串字面量类型
```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'
```
> <font color=#fb9cfb>类型别名与字符串字面量类型都是使用 type 进行定义。</font>

### 元组
```ts
let tom: [string, number] = ['Tom', 25];

let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;
tom[0].slice(1);
tom[1].toFixed(2);
//也可以赋值一个
let tom: [string, number];
tom[0] = 'Tom';


//直接对元组类型变量初始化赋值的时候，不能只赋值一个
let tom: [string, number];
tom = ['Tom'];
// Property '1' is missing in type '[string]' but required in type '[string, number]'


let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);
// Argument of type 'true' is not assignable to parameter of type 'string | number'.

let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);
// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

### 枚举
```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```
#### 手动赋值
```ts
//没有赋值的元素按赋值元素一次增加，如果前面的元素是小数1.5，后面就是整数2
enum Days {Sun = 3, Mon, Tue, Wed, Thu, Fri, Sat}
console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
// Days[3]的值被Wed覆盖了
```
#### 常数项和计算所得项
```ts
//上面都是常数项，下面是计算项
enum Color {Red, Green, Blue = "blue".length};

//计算属性不能放大常数项前面
enum Color {Red = "red".length,Green,Blue}
//error TS1061: Enum member must have initializer.
```
- 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
- 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
    - 数字字面量
    - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
    - 带括号的常数枚举表达式
    - +, -, ~ 一元运算符应用于常数枚举表达式
    - +, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为NaN或Infinity，则会在编译阶段报错

#### 常数枚举
```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//编译后得到
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```
#### 外部枚举
```ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//编译结果
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

//常量外部枚举
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//编译结果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```
### 类的概念
> 虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。
类(Class)：定义了一件事物的抽象特点，包含它的属性和方法

- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
#### ES6 中类的用法

1. 属性和方法
- 使用 class 定义类，使用 constructor 定义构造函数。
- 通过 new 生成新实例的时候，会自动调用构造函数。

```ts
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```
2. 类的继承
- 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。
```ts
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```
3. 存储器
- 使用 getter 和 setter 可以改变属性的赋值和读取行为
```ts
class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```
4. 静态方法
- 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用
```ts
class Animal {
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```
#### ES7中类的用法
1. 实例属性
- ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义
```ts
class Animal {
    name = 'Jack';

    constructor() {
        // ...
    }
}
let a = new Animal();
console.log(a.name); // Jack
```
2. 静态属性
- ES7 提案中，可以使用 static 定义一个静态属性
```ts
class Animal {
    static num = 42;
    constructor() {
        // ...
    }
}
console.log(Animal.num); // 42
```
#### TypeScript 中类的用法
1. public、private 和 protected
- TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
    - public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
    - private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
    - protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
```ts
//public
class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
}
let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom


//private
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}
let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
// Property 'name' is private and only accessible within class 'Animal'.

//在子类中也是不能访问的
class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}
//Property 'name' is private and only accessible within class 'Animal'.


//protected
class Animal {
    protected name;
    public constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}


//当构造函数修饰为 private 时，该类不允许被继承或者实例化
class Animal {
    public name;
    private constructor (name) {
        this.name = name;
  }
}
class Cat extends Animal {
    constructor (name) {
        super(name);
    }
}
let a = new Animal('Jack');
// index.ts(1064): TS2675: Cannot extend a class 'Animal'. Class constructor is marked as private.
// index.ts(1069): TS2673: Constructor of class 'Animal' is private and only accessible within the class declaration.


//当构造函数修饰为 protected 时，该类只允许被继承
class Animal {
    public name;
    protected constructor (name) {
        this.name = name;
  }
}
class Cat extends Animal {
    constructor (name) {
        super(name);
    }
}
let a = new Animal('Jack');
// index.ts(1086): TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.


//修饰符还可以使用在构造函数参数中，等同于类中定义该属性，使代码更简洁
class Animal {
    // public name: string;
    public constructor (public name) {
        this.name = name;
    }
}
```
2. readonly
- 只读属性关键字，只允许出现在属性声明或索引签名中
```ts
class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}
let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';// Cannot assign to 'name' because it is a read-only property.

//注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        this.name = name;
    }
}
```
3. 抽象类(abstract用于定义其中的抽象类和抽象方法)
> 什么是抽象类
```ts
//抽象类不允许被实例化
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}
let a = new Animal('Jack');// Cannot create an instance of the abstract class 'Animal'.

//抽象类的方法必须被子类实现
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}
// class Cat extends Animal {//未实现抽象类的方法sayHi
//     public eat() {
//         console.log(`${this.name} is eating.`);
//     }
// }

//正确方式
class Cat extends Animal {
    public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
    }
}
let cat = new Cat('Tom');
```
4. 类的类型
- 给类加上 TypeScript 的类型很简单，与接口类似
```ts
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
}
let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```
### 类与接口
#### 类实现接口
- 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。
```ts
//举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它
interface Alarm {
    alert();
}
class Door {
}
class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}
class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}

//一个类可以实现多个接口
interface Alarm {
    alert();
}
interface Light {
    lightOn();
    lightOff();
}
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```
#### 接口继承接口
```ts
interface Alarm {
    alert();
}
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
// class cso implements  Alarm {//这样也行为什么？？？？？？？
//     lightOn(){
//         console.log('on')
//     };
//     lightOff(){
//         console.log('off')
//     };
//     alert(){
//         console.log('alert')
//     }
// }
class cso implements  LightableAlarm {
    lightOn(){
        console.log('on')
    };
    lightOff(){
        console.log('off')
    };
    alert(){
        console.log('alert')
    }
}
let a = new cso()
console.log(a.alert())//alert
console.log(a.lightOn())//on
//使用 extends 使 LightableAlarm 继承 Alarm;在
```
#### 接口继承类
```ts
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```
#### 混合类型
```ts
//接口的形式来定义函数需要符合的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

//有时候一个函数还有自己的属性和方法
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
### 声明合并
#### 函数合并
```ts
//可以用重载定义多个函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
#### 接口合并
```ts
//接口中的属性会在合并时简单的合并到一个接口中
interface Alarm {
    price: number;
}
interface Alarm {
    weight: number;
}
//相当于
interface Alarm {
    price: number;
    weight: number;
}


//注意，合并的属性的类型必须是唯一的
interface Alarm {
    price: number;
}
interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
}
// Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.


//接口中的方法合并，和函数一样
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```
#### 类的合并
```ts
class Animal {
    constructor(name) {
        this.name = name;
    }
    col() {
        console.log(999);
    }
}
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}
//合并规则跟接口合并一样
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
    col() {
        console.log(999);
    }
}
```




----

















<details>
  <summary>点击折叠区域标题</summary>

    ```
    let a = 9;
    
    ```

</details>