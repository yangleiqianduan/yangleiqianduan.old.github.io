---
title_yl: react
categories_yl: 工具
tags_yl: Intent
creatTime_yl: 2017-7-14
---

#Intent传递数据
##Intent可以传递的类型：
八大基本数据类型
- Parcelable （对象序列化到内存）
- Serializable （对象序列化到文件）
- Bundle：相当于存储对象的Map集合

##Intent传递数据的方法：
传递数据是一个过程，接收数据的一方应该调用与传递数据方法相对应的方法
- **putExtras()：**将数据直接封装到Intent中
	- 传递数据：ScendDataActivity
```java
    //创建一个显示意图开启第二个界面
	Intent intent = new Intent(this, SecondActivity.class);
	//把需要提交的数据封装到意图对象中
	intent.putExtra("name", "itheima");
	intent.putExtra("age", 4);
    //开启一个新的界面
	startActivity(intent);
```
	- 接受数据：ReceiveDataActivity
```java
	Intent intent = getIntent();
	String name = intent.getStringExtra("name");
	int age = intent.getIntExtra("age", 0);
```
- 使用Bundle对象来封装数据
	- 传递数据：ScendDataActivity
```java
	//创建一个显示意图开启第二个界面
	Intent intent = new Intent(this, SecondActivity.class);
	//把需要提交的数据封装到意图对象中
	Bundle b = new Bundle();
	b.putString("name", "itheima");
	b.putInt("age", 4);
	intent.putExtra("info", b);
	//开启一个新的界面
	startActivity(intent);
```
	- 接受数据：ReceiveDataActivity
```java
	Intent intent = getIntent();
	Bundle b = intent.getBundleExtra("info");
    String name = b.getString("name");
    int age = b.getInt("age");
```



