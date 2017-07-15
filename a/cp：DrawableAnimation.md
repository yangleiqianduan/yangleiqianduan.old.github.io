---
title_yl: react
categories_yl: 文章
tags_yl:
creatTime_yl: 2017-7-14
---

##Drawable Animation
###概述
`Drawable animation`允许载入Drawable源，通过播放一系列的帧形成帧动画。
###如何创建帧动画
可以根据AnimationDrawable的API来在代码中定义一个动画的结构：
*	即在`res/drawable/`目录下，创建一个包含组成动画的帧信息的XML文件，这个动画说明文件中包含了帧的源文件和持续时间
*	这个XML文件包含根节点<animation-list>,以及每一帧动画都对应的一个子节点<item>，这个子节点中包含了每一帧源文件和持续时间：
```xml
	<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
    android:oneshot="true">
    <item android:drawable="@drawable/rocket_thrust1" android:duration="200" />
    <item android:drawable="@drawable/rocket_thrust2" android:duration="200" />
    <item android:drawable="@drawable/rocket_thrust3" android:duration="200" />
</animation-list>
```
`android:oneshot="true"`:
	*	true:只循环一次，结束后保持最后一帧
	*	false：动画会不停循环

*	创建完毕后，可以通过把XML文件设置为ImageView组件的background属性，来调用动画
```java
	AnimationDrawable rocketAnimation;
	public void onCreate(Bundle savedInstanceState) {
  	super.onCreate(savedInstanceState);
  	setContentView(R.layout.main);

  	ImageView rocketImage = (ImageView) findViewById(R.id.rocket_image);
  	rocketImage.setBackgroundResource(R.drawable.rocket_thrust);
  	rocketAnimation = (AnimationDrawable) rocketImage.getBackground();
	}//获取AnimationDrawable对象
	public boolean onTouchEvent(MotionEvent event) {
  	if (event.getAction() == MotionEvent.ACTION_DOWN) {
    rocketAnimation.start();//开启动画
    return true;
  	}
  	return super.onTouchEvent(event);
	}
```

**注意:**
*	`AnimationDrawable` 的`start()`方法不能在`Activity`的`onCreate()`方法中调用（因为此时`AnimationDrawable`还未完全与界面绑定）
*	如果想要不通过后续交互而立即执行动画，可以在`Activity`中的`onWindowFocusChanged()`方法中调用。（这个方法在Activity界面显示的时候自动调用）