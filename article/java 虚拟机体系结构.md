---
title: 占位文章占位文章占位文章5
categories: 占位
tags: 占位
creatTime: 1483936830005
---



#java 虚拟机体系结构
参考引用：
[理解jvm](http://www.tuicool.com/articles/jqyEjy)

## JAVA虚拟机的生命周期
- 一个运行时的Java虚拟机实例的天职是：负责运行一个java程序。
- 当启动一个Java程序时，一个虚拟机实例也就诞生了。当该程序关闭退出，这个虚拟机实例也就随之消亡。
- 如果同一台计算机上同时运行三个Java程序，将得到三个Java虚拟机实例。每个Java程序都运行于它自己的Java虚拟机实例中。

Java虚拟机实例通过调用某个初始类的main()方法来运行一个Java程序。
而这个main()方法必须是共有的(public)、静态的(static)、返回值为void，并且接受一个字符串数组作为参数。任何拥有这样一个main()方法的类都可以作为Java程序运行的起点。

```java
	public class Test {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        System.out.println("Hello World");
    }

}
```
在上面的例子中，Java程序初始类中的main()方法，将作为该程序初始线程的起点，任何其他的线程都是由这个初始线程启动的。

　　在Java虚拟机内部有两种线程：
  1.	守护线程
  2.	非守护线程

　　守护线程通常是由虚拟机自己使用的，比如执行垃圾收集任务的线程。但是，Java程序也可以把它创建的任何线程标记为守护线程。而Java程序中的初始线程——就是开始于main()的那个，是非守护线程。

　　只要还有任何非守护线程在运行，那么这个Java程序也在继续运行。当该程序中所有的非守护线程都终止时，虚拟机实例将自动退出。假若安全管理器允许，程序本身也能够通过调用Runtime类或者System类的exit()方法来退出。


## JAVA虚拟机的体系结构
![](./pic/vmstructer.png)

java虚拟机体系结构分为：
1.	类装载系统（ClassLoader）
2.	运行时数据区（RunTime Data Area）
1.method area（本地方法区）
2.heap（堆）
3.java stacks(Java 栈)
4.pc registers(pc寄存器)
5.native method stacks(本地方法栈）
6.	执行引擎
7.	本地接口

** 方法区和堆由所有线程共享，其他区域都是线程私有的 **
![](./pic/JVM-runtime-data-area.jpg)
## 程序计数器(Program Counter Register)

- 作用:当前线程所执行的字节码的行号指示器

		字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令，分支，循环，跳转，异常处理，线程恢复等基础功能都需要依赖这个计数器来完成。

- 特点：一块较小的内存空间、由于每个线程都有一个独立的程序计数器，以保证虚拟机在线程切换后能恢复到正确的执行位置（使用线程私有内存，各线程之间互不影响）。

		由于Java虚拟机的多线程是通过线程轮流切换并分配处理器执行时间的方式来实现的，在任何一个确定的时刻，一个处理器（对于多核处理器来说是一个内核）只会执行一条线程中的指令。因此，为了线程切换后能恢复到正确的执行位置，每条线程都需要有一个独立的程序计数器，各条线程之间的计数器互不影响，独立存储，我们称这类内存区域为“线程私有”的内存。


- 如果线程当前执行的是JAVA代码，这个计数器记录的时正在执行虚拟机字节码指令的地址；
- 如果是Native方法，这个计数器值则为空。
- 此内存区域是唯一一个在Java虚拟机规范中没有规定任何OutOfMemoryError情况的区域。

## Java虚拟机栈(Java Stack)
- 作用：虚拟机栈描述的是Java方法执行的内存模型：
- 特点：与程序计数器一样，也是线程私有的，生命周期与线程相同。像方法区和堆一样，Java栈和帧在内存中也不是连续的
Java栈出帧为单位保存线程的运行状态。 虚拟机只会直接对Java栈执行两种操作:以帧为单位的压栈或出栈。
某个线程正在执行的方法被称为该线程的当前方法，当前方法使用的栈帧称为当前帧，当前方法所属的类称为当前类，当前类的常量池称为当前常量池。 在线程执行一个方法时，他会跟踪当前类和当前常量池。此外当虚拟机遇到栈内操作指令时，他对当前帧内数据执行操作。


每个方法被执行的时候都会同时创建一个栈帧:

1.	局部变量表（Local Variables）
1.编译期可知的各种基本数据类型
2.对象引用(reference)
3.returnAddress（指向一条字节码指令的地址）
2.	操作数栈 （Operand Stack）
3.	帧数据区 （Frame Data）
保存一些数据来支持常量池解析、正常方法返回以及异常派发机制)
动态链接，方法出口等信息。

![](./pic/JavaStackPage.jpg)
每个方法被调用直到执行完成的过程，就对应着一个栈帧在虚拟机栈中从入栈到出栈的过程。
### 局部变量表 （Local Variables）
- 局部变量表存放了编译期可知的
1.各种基本数据类型（boolean,byte,char,short,int,float,long,double）
2.对象引用(reference)
3.returnAddress（指向一条字节码指令的地址）。

- long 和double类型的数据会占用2个局部变量空间(Slot) ,其他的数据类型只占一个。
局部变量表所需内存在编程期间完成分配，当进入一个方法时，这个方法需要的帧中分配多大的局部变量空间是完全确定的，在方法运行期间不会改变局部变量表的大小。

- 异常：
	在Java虚拟机规范中，对这个区域规定了两种异常状况：
1.如果线程请求的栈深度大于虚拟机所允许的深度，将抛出StackOverflowError异常；
2.如果虚拟机栈可以动态扩展（当前大部分的Java虚拟机都可动态扩展，只不过Java虚拟机规范中也允许固定长度的虚拟机栈），当扩展时无法申请到足够的内存时会抛出OutOfMemoryError异常。

### 操作数栈
- 和局部变量区一样，操作数栈也是被组织成一个以字长为单位的数组。但是和前者不同的是，它不是通过索引来访问，而是通过标准的栈操作—压栈和出栈—来访问的。比如，如果某个指令把一个值压入到操作数栈中，稍后另一个指令就可以弹出这个值来使用。
- 虚拟机把操作数栈作为它的工作区——大多数指令都要从这里弹出数据，执行运算，然后把结果压回操作数栈。


	如，iadd指令就要从操作数栈中弹出两个整数，执行加法运算，其结果又压回到操作数栈中，看看下面的示例，它演示了虚拟机是如何把两个int类型的局部变量相加，再把结果保存到第三个局部变量的：

```java
begin

iload_0    // push the int in local variable 0 onto the stack

iload_1    // push the int in local variable 1 onto the stack

iadd       // pop two ints, add them, push result

istore_2   // pop int, store into local variable 2

end
```
	在这个字节码序列里，前两个指令iload_0和iload_1将存储在局部变量中索引为0和1的整数压入操作数栈中，其后iadd指令从操作数栈中弹出那两个整数相加，再将结果压入操作数栈。第四条指令istore_2则从操作数栈中弹出结果，并把它存储到局部变量区索引为2的位置。图5-10详细表述了这个过程中局部变量和操作数栈的状态变化，图中没有使用的局部变量区和操作数栈区域以空白表示。

![](./pic/operadatastack.jpg)

## 方法区(Method Area)
- 作用：装载类信息－用于存储已被虚拟机加载的类型信息、常量、静态变量、即时编译后的代码等信息。
- 特点：方法区是线程间共享的，当两个线程同时需要加载一个类型时，只有一个类会请求ClassLoader加载，另一个线程会等待。
- 异常：当方法区无法满足内存分配需求时，将抛出OutOfMemoryError异常。

对于每一个加载的类型，会在方法区中保存以下信息：

1.	类及其父类的全限定名（java.lang.Object没有父类）
2.	类的类型（Class or Interface）
3.	访问修饰符（public, abstract, final）
4.	实现的接口的全限定名的列表
5.	常量池
6.	字段信息
1.字段名
2.字段的类型
3.字段的修饰符(public, private , protected, static, final, volatile, transient)
7.	方法信息（方法声明顺序也会保存）：
1.方法名
2.方法返回类型（或void）
3.参数信息
4.方法修饰符(public, private, protected , static, final, synchronized, native, abstract)
8.	`除常量外的静态变量`
9.	ClassLoader引用
10.	Class引用

### 运行时常量池(Runtime Constant Pool)
- 作用：用于存放编译期生成的各种字面量和符号引用，这部分内容将在类加载后存放到方法区的运行时常量池中。
- 特点：
		运行时常量池相对于Class文件常量池的另外一个重要特征是具备动态性，Java语言并不要求常量一定只能在编译期产生，也就是并非预置入Class文件中常量池的内容才能进入方法区运行时常量池，运行期间也可能将新的常量放入池中，这种特性被开发人员利用得比较多的便是String类的intern()方法。

- 异常：既然运行时常量池是方法区的一部分，自然会受到方法区内存的限制，当常量池无法再申请到内存时会抛出OutOfMemoryError异常。

### 类变量
- 类变量：是由所有类实例共享的，即使没有任何类实例，它也可以被访问。
		这些变量只与类有关---而非类的实例，因此他们总是作为类型信息的一部分存储在方法区。除了在类中声明的编译时常量外，虚拟机在使用某个类之前，必须在方法区中为这些类变量分配空间。

而编译时常量（就是那些用final声明以及用编译时已知的值初始化的类变量）则和一般的类变量的处理方式不同，每个使用编译时常量的类型都会复制它的所有常量到自己的常量池中，或嵌入到它的字节码流中。作为 常量池或字节码流的一部分，编译时常量保存在方法区中，就和一般的类变量一样。但是当一般的类变量做为声明他们的类型的一部分数据面保存的时候，编译时常量作为使用他们的类型的一部分而保存。

### 字段信息
对于类型中声明的没一个字段，方法区中必须保存下面的信息。
除此之外，这些字段在类或者接口中的声明顺序也必须保存。下面是字段信息的清单:
- 字段名
- 字段的类型
- 字段的修饰符（public、private、protected、static、final、volatile、transient的某个子集）



	字段(Field)和成员变量（Member Variable)是互换的，没有区别。
["Member variables in a class—these are called fields."](http://docs.oracle.com/javase/tutorial/java/javaOO/variables.html)

	属性(Property)，是指对象的属性，对于JavaBean来说，是getXXX方法定义的。
["property Characteristics of an object that users can set, such as the color of a window."](http://docs.oracle.com/javase/tutorial/information/glossary.html)

### 方法信息

对于类型中声明的每一个方法，方法区中必须保存下面的信息。
和字段一样，这些方法法在类或者接口中的声明顺序也必须保存。下面试方法信息的清单:

- 方法名
- 方法的返回类型（或void）
- 方法参数的数量和类型（按按声明顺序）
- 方法的修饰符（public、private、protected、static、final、synchronized、native、abstract的某个子集）

除了上面的清单中列出的条目之外，如果某个方法不是抽象的和本地的，它还必须保存下面的信息:
方法的字节码（bytecodes）
操作数栈和该方法的栈帧中的局部变量区的大小
异常表


## 堆(Heap)
- 作用：虚拟机中用于存放实例对象与数组实例的地方，垃圾回收的主要区域就是这里（还可能有方法区）。
- 特点：Java堆（Java Heap）是Java虚拟机所管理的内存中最大的一块。Java堆是被所有线程共享的一块内存区域，在虚拟机启动时创建
- 又由于一个java程序独占一个Java虚拟机实例，因而每个java程序都有他自己的堆内存，他们之间不会相互影响。但是同一个Java 程序的多线程却共享着同一个堆空间，在这种情况下，就得考虑多线程访问对象（堆数据）的同步问题了。
- 和方法区一样，堆空间也不必是连续的内存区。在程序运行时，他可以动态的扩展或收缩

`数组的内部表示`

		在Java中，数组是真正的对象。和其他对象一样，数组总是存储在堆中。同样，和普通对象一样，实现的设计者将决定数组在堆中的表示形式。
		和其他所有对象一样，数组也拥有一个与他们的类相关联的Class实例，所有具有相同维度和类型的数组都是同一个类的实例，而不管数组的长度（多维数组每一维的长度）是多少。例如一个包含3个int整数的数组和一个包含300个int整数的数组拥有同一个类。数组的长度只与实例数据有关。
		数组类的名称由两部分组成:每一维用一个方括号“[”表示，用字符或字符串表示元素类型。比如，元素类型为int整数的、以为数组的类名为“[]”,元素类型为byte的三维数组为“[[[B”,元素类型为Object的二位数组为“[[Ljava/lang/Object”。
		多为数组被表示为数组的数组。比如，int类型的二维数组，将表示为一个一维数组，其中的每个元素是一个一维int数组的引用，入下图所示:

![](./pic/ArrayStruct.jpg)

		在堆中的每个数组对象还必须保存的数据是数组的长度、数组数据，以及某些指向数组的类数据的引用。虚拟机必须能够通过一个数组对象的引用得到此数组的长度，通过索引访问其元素（其间要检查数组边界是否越界）、调用所有数组的直接超类Object声明的方法等等。
## 对象访问

`Object obj = new Object();`
1.	那“Object obj”这部分的语义将会反映到Java栈的本地变量表中，作为一个reference类型数据出现。
2.	而“new Object()”这部分的语义将会反映到Java堆中，形成一块存储了Object类型所有实例数据值（Instance Data，对象中各个实例字段的数据）的结构化内存，根据具体类型以及虚拟机实现的对象内存布局（Object Memory Layout）的不同，这块内存的长度是不固定的。另外，在Java堆中还必须包含能查找到此对象类型数据（如对象类型、父类、实现的接口、方法等）的地址信息，这些类型数据则存储在方法区中。


	由于reference类型在Java虚拟机规范里面只规定了一个指向对象的引用，并没有定义这个引用应该通过哪种方式去定位，以及访问到Java堆中的对象的具体位置，因此不同虚拟机实现的对象访问方式会有所不同，主流的访问方式有两种：使用句柄和直接指针。
`对象访问方式：句柄:`
![](./pic/newObject1.jpg)

`对象访问方式：指针:`
![](./pic/newObject2.jpg)

`方法表：加快调用实例方法的效率`
不管虚拟机的实现使用什么样的对象表示法，很可能每个对象都有一个方法表，因为对象表加快了调用实例方法时的效率， 从而对java虚拟机实现的整体性能起着非常重要的作用。

## 方法区的使用
`Volcano.Class 文件 :`
```java
class Lava{
    private int speed = 5;
    void flow(){}
}
class Volcano{
    public void main(String[] args) {
        Lava lava = new Lava();
        lava.flow();
    }
}
```
当jvm开始运行`Volcano.Class`文件时：
1.	加载当前类`Volcano`
			要运行Volcano程序，首先得以某种“依赖于实现的”方式告诉虚拟机“Volcano”这个名字。之后虚拟机将找到并读入相应的class文件“Volcano.class”，然后他会从导入的class文件里的而精致数据中提取类型信息并放到方法区中。通过执行保存在方法区中额字节码，虚拟机开始执行main()方法，在执行时，他会一直持有指向当前类（Volcano类）的常量池（方法区中的一个数据结构）的指针。
2.	执行`main()`方法(建立mian方法的方法栈)
			注意，虚拟机开始执行Volcano类中main（）方法的字节码的时候，尽管Lava类还没被装载，但是和大多数（也许是所有）虚拟机实现一样，他不会等到把程序中用到的所有类都装载后才开始运行程序。恰好相反，他只需在需要是才装载相应的类。
    		main()的第一条指令告知虚拟机为列在常量池第一项的类分配足够的内存。所以虚拟机使用指向Volcano常量池的指针找到第一项，发现他是一个堆Lava类的符号引用，然后他就检查方法区，看Lava类是否已经被装载了。
3.	加载所需类`Lava`
         	这个符号引用仅仅是一个给出了类Lava的全限定名“Lava”的字符串。为了能让虚拟机尽可能快地从一个名称找到类，设计者应当选择最佳的数据结构和算法。这里可以采用各种方法，如散列表、搜索树等等。同样的算法可以以用于实现Class类的forName（）方法，这个方法根据给定的全限定名返回Class引用。
			当虚拟机发现还没有装载过名为“Lava”的类时，他就开始查找并装载文件“Lava.class”，并把从读入的二进制数据中提取的类型信息放在方法区中。
            紧接着，虚拟机以一个直接指向方法区Lava类数据的指针类替换常量池第一项（就是那个字符串“Lava”）----以后就可以用这个指针来快速访问Lava类了。这个替换过程称为常量池解析，即把常量池中的符号引用替换为直接引用。这是通过在方法区中搜索被引用的元素实现的，在这期间可能又需要装载其他类。在这里，我们替换掉符号引用的“直接引用”是一个本地指针
4.	创建对象`lava`
			终于，虚拟机转变为一个新的Lava对象分配内存。此时，它又需要方法区中的信息。还记得刚刚放到Volcano类常量池第一项的指针吗？现在虚拟机用它来访问Lava类型信息（此前刚放到方法区中的），找到其中记录的这样一个信息：一个Lava对象需要分配多少堆空间。
            Java虚拟机总能够通过存储于方法区的类型信息来实现一个对象需要的内存，但是，某一个特定对象事实上需要多少内存，是跟特定实现相关的。对象在虚拟机内部的表示由实现的设计者来决定的。
            当java虚拟机确定了一个Lava对象的大小后，它就在堆上分配这么大的空间，并把这个对象实例的变量speed初始化为默认初始值0.假如Lava类的超类Object也有实例变量，这也会在此时被初始化为相应的默认值。
5.	引用压入栈
			当把新生成的Lava对象的引用压到栈中，main()方法的第一条指令也完成了。接下来的指令通过这个引用调用Java代码（改代码把speed变量初始化为争取的初始值5）。另外一条指令将用这个引用调用Lava对 象引用的flow()方法。