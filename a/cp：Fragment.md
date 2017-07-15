##Fragments
###概述
`Fragment`代表`Activity`中的一种行为模式或者用户界面的一部分。你可以在一个`Activity`中集成多个`Fragment`形成多面板界面或者在不同的`Activity`中重复使用同一个`Fragment`。你可以把`Fragment`想象成为activity的模块化组成部分，并且有自己的生命周期，自己的输入事件。并且能够在Activity运行过程中添加或者移除。

一个fragment必定是嵌入到activity中的，因此其生命周期被宿主activity的生命周期直接影响。例如：`when the activity is paused, so are all fragments in it, and when the activity is destroyed, so are all fragments` 然而，在activity处于running中，你可以独立的操作每一个fragment，如添加或者移除。

When you perform such a fragment transaction, you can also add it to a back stack that's managed by the activity—each back stack entry in the activity is a record of the fragment transaction that occurred. The back stack allows the user to reverse a fragment transaction (navigate backwards), by pressing the Back button.

###设计哲学

###创建一个Fragment
创建一个fragment，首先要创建Fragment的子类（或者一个存在的Fragment子类）。Fragment的代码很像Activity。包含了和Activity类似的回调函数，如`onCreate(),onStart(),onPause(), 和 onStop()`。实际上，当把一个已经存在的Android Application，把Activity转换成fragments来使用时，你仅仅需要把Activity中的回调代码移动到fragment中即可

通常情况下，需要实现至少一下几种生命周期的方法：
*	`onCreate()`
系统在fragment创建的时候调用这个函数，在实现中，应该初始化好fragment中重要的组件，使得这些组件能够在fragment暂停，停止，获得焦点时仍然存在
*	`onCreateView()`
系统在fragment第一次初始化界面的时候调用，为了得到fragment的界面，你必须在这方法中返回一个View对象，即fragment的layout。当然如果fragment不提供界面，可以返回null
*	`onPause()`
当用户离开当前fragment（即fragment失去焦点，并不意味着fragment销毁）时调用。这个通常发生在当你提交需要持久化的更改（不在当前会话，因为用户可能不会在回来）