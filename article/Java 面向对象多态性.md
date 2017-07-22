---
title: 占位文章6
categories: 占位
tags: 占位
creatTime: 1483936830006
---


多态性的体现：

* 方法的重载和重写

  * 重载 `overload`

    同一类中可以创建多个方法：名字相同，参数类型和个数不同

  * 重写 `overwrite`

    子类重写父类的方法（相同的方法名、返回类型和参数表）

* 对象的多态性

  * 向上转型：程序自动完成

    `父类 父类对象 ＝ 子类实例`

  * 向下转型：强制类型转换

    `子类 子类对象 ＝ （子类）父类实例 //此处的父类实例本身就是上转型`

**这部分重点是概念搞清，尤其是上转型和下转型**

##	方法的重载与重写

###	overload

同一类的对象，根据传入的参数不同，载入不同的方法体执行：

* 返回类型不同不能作为重载的因素


* 因为不可出现：方法名相同，参数类型和个数相同时，返回类型不同的情况（冲突）。
* 当参数类型或者个数不同时，已经构成重载，返回类型相同不相同都没有关系

`Base`

```java
class Base{
  public void tell(){
  System.out.println("Base tell");
}
  public void tell(String name){
  System.out.println("Base tell "+name)
}
}
```

测试代码及结果

```java
public static void main(String[] args){
  Base base = new Base();
  base.tell();// Base tell
  base.tell("小棒")//Base tell 小棒
}
```

###	 overwrite

子类对父类方法的重写（理解：继承父类后矫正父类中不合适的方法）

`Base`

```java
class Base{
  public void tell(){
  System.out.println("Base tell");
}
}
```

`Derived extends Base`

```java
class Derived extends Base{
    public void tell(){
        System.out.println("Derived tell");
    }
}
```

测试代码及结果

```java
public static void main(String[] args){
  Base base = new Base();
  Derived derived = new Derived();
  base.tell();// Base tell
  derived.tell();//derived tell
}
```

##	对象的多态性

对象多态性体现在继承关系上，正常情况下：（`子类 子类对象 ＝ 子类实例`）

* 子类相同属性会使父类属性隐藏
* 子类相同方法会将父类方法覆盖

###	上转型

`父类 父类对象 ＝ 子类实例`

类型指定为父类，因此

* 只能调用父类`定义`的属性和方法；不能调用子类增加的属性和方法


* 无论子类是否有相同属性，只能调用得到父类的属性
* 如果子类有相同的方法，则优先执行子类的方法

`Base`

```java
class Base{
    public int base=1;
    public void tell1(){
        System.out.println("Base tell1()");
    }
    public void tell2(){
        System.out.println("Base tell2()");
    }
}
```

`Derived1 extends Base`

```java
class Derived1 extends Base{
    public int base=2;
    public int derived=3;
    public void tell1(){
        System.out.println("Derived1 tell1()");
    }
    public void tell3(){
        System.out.println("Derived1 tell3()");
    }
}
```

测试代码及结果

```java
 public static void main(String[] args) {
        //向上转型
        Base b = new Derived1();
        System.out.println("属性测试:");
        System.out.println("b.base:"+b.base);//b.base:1
//      System.out.println("b.base:"+b.derived); 报错 b无此属性
        System.out.println("方法测试:");
        b.tell1();//Derived1 tell1()
        b.tell2();//Base tell2()
 }
```



###	下转型

`父类 父类对象 ＝ 子类实例`

`子类 子类对象 ＝ （子类）父类实例 //此处的父类实例本身就是上转型`

类型指定为子类，因此

- 可以调用子类`定义`的属性和方法


- 优先显示子类的属性
- 优先调用子类的方法

测试代码及结果

```java
    public static void main(String[] args) {
        //向下转型
        Base b1  = new Derived1();
        Derived1 b2 = (Derived1) b1;
        System.out.println("属性测试:");
        System.out.println("b2.base:"+b2.base);//b2.base:2
        System.out.println("b2.derived:"+b2.derived);//b2.derived:3
        System.out.println("方法测试:");
        b2.tell1();//Derived1 tell1()
        b2.tell2();//Base tell2()
        b2.tell3();//Derived1 tell3()
    }
```

###	总结：

继承关系中，子类对象对父类的属性是隐藏，方法是覆盖

因此，

* 当引用类型是父类（上转型），父类属性显示
* 当引用类型是子类，子类属性显示
* 方法是覆盖，因此都是优先调用子类方法
* 上转型固定了属性和方法的引用仅仅是父类类型定义的属性和方法





java面向对象instanceof关键字

##java面向对象抽象类的应用
抽象类＋上转型（多态）的应用
```java
abstract class Person{
    private String name;
    private int age;
    public abstract void want();
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
class Student extends Person{
    private int score;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Student(String name, int age, int score) {
        super(name, age);
        this.score = score;
    }
    @Override
    public void want() {
        System.out.println(getClass().getName()+"姓名:"+getName()+"年龄:"+getAge()+"成绩:"+getScore());
    }
}
class Worker extends Person{
    private int money;

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public Worker(String name, int age,int money) {
        super(name, age);
        this.money = money;
    }
    @Override
    public void want() {
        System.out.println(getClass().getName()+"姓名:"+getName()+"年龄:"+getAge()+"薪水:"+getMoney());
    }
}
public class PolDemo3 {
    public static void main(String[] args) {
        Person stu = new Student("张三",24,100);//com.sun.pol.Student姓名:张三年龄:24成绩:100
        Person wor = new Worker("李四",25,1000);//com.sun.pol.Worker姓名:李四年龄:25薪水:1000
        stu.want();
        wor.want();
    }
}

```
##java面向对象接口的使用

```java
interface USB{
    void start();
    void stop();
}
class Computer {
    public static void work(USB usb){
        usb.start();
        usb.stop();
    }
}
class USBDisk implements USB{
    @Override
    public void start() {
        System.out.println("USBDisk is working");
    }
    @Override
    public void stop() {
        System.out.println("USBDisk stop work");
    }
}
class Printer implements USB{
    @Override
    public void start() {
        System.out.println("Printer is working");
    }

    @Override
    public void stop() {
        System.out.println("Printer stop work");
    }
}
public class PolInter {
    public static void main(String[] args) {
        Computer.work(new USBDisk());//USBDisk is working /stop work
        Computer.work(new Printer());//Printer is working /stop work
    }
}
```