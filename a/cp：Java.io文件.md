---
title_yl: Java.io： IO与文件
categories_yl: 文章
tags_yl: 哈哈
creatTime_yl: 2017-7-14
---

#`Java.io： IO与文件`
1. java.io.File 类的使用
2. IO流
1.节点流
2.过滤流
3.对象序列化
4. 资源文件

##java.io.File 类的使用
1.java.io.File类：

File用来表示**文件对象**，或者**目录对象 **

2.创建一个File对象

`File(String pathname)` 默认路径是项目的根目录
```java
 	 File file = new File("src/a.txt");//默认路径是在工程的根目录
        if (file.exists()) {
            System.out.println("file.exists():"+file.exists());
            System.out.println("file.getPath():"+file.getPath());
            System.out.println("file.getAbsolutePath():"+file.getAbsolutePath());
            System.out.println("file.getParent():"+file.getParent());
            System.out.println("file.getAbsoluteFile():"+file.getAbsoluteFile());
        } else {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
```
`File(String parent, String child)`
`File(File parent, String child)` 文件创建最常见可靠的方式，目录与文件分开，分别创建
```java
        File pathFile = new File("src/a/b/c");
        File nameFile = new File(pathFile,"b.txt");
        if (nameFile.exists()){
            System.out.println("文件已经存在");
        }else {//文件不存在的情况:1.目录不存在 2.目录存在文件不存在
            try {
                if (!pathFile.exists()) {
                    pathFile.mkdirs();//多级路径的创建
                }
                if (!nameFile.exists()){
                    nameFile.createNewFile();//文件的创建

                }
            } catch (IOException e) {
                e.printStackTrace();
                }
        }
```
** 注意：createNewFile()不会创建目录，因此在目录不存在的情况下使用该方法创建文件，会抛出  java.io.IOException: No such file or directory**

```java
 File exFile = new File("src/a/c/d/ex.txt");
        try {
            exFile.createNewFile();//目录不存在  IOException: No such file or directory
        } catch (IOException e) {
            e.printStackTrace();
        }
```
3.常用的方法

`exists():boolean`this abstract pathname exists
`isDirectory():boolean`if and only if the file denoted by this abstract pathname exists <em>and</em> is a directory
`isFile():boolean`if and only if the file denoted by this abstract pathname exists <em>and</em> is a normal file

4.ListXXX 方法的扩展

`list():String[]`
```java
	File file = new File("src/");
        System.out.println(file.getAbsolutePath());
        String [] s= file.list();
        for (String string:s
             ) {
            System.out.println(string);
        }
```

`list(FilenameFilter filter):String[]`
```java
	String[] ms = file.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                if (name.toLowerCase().endsWith("m")) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        for (String string:ms
             ) {
            System.out.println(string);
        }
```

`listFiles(FileFilter filter):File[]`

```java
	 File [] files=file.listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                if (pathname.isDirectory()){
                    return true;
                }else {
                    return false;
                }
            }
        });
        for (File fi:files
             ) {
            System.out.println(fi.getName());
        }
```
##IO流
1.什么是流


2.IO流的分类：

	不管是磁盘还是网络传输，最小的存储单元都是字节，而不是字符，所以 I/O 操作的都是字节而不是字符，但是为啥有操作字符的 I/O 接口呢？这是因为我们的程序中通常操作的数据都是以字符形式，为了操作方便当然要提供一个直接写字符的 I/O 接口，如此而已
1. 字节流（二进制文件）
![inputstream](./pic/inputstreamstruct.png)
![OutputStream](./pic/OutputStreamStruct.png)
2. 字符流（java默认的编码是unicode编码，每个字符占两个字节）
![](./pic/WriterStruct.png)
![](./pic/ReaderStruct.png)

		a.根据IO流操作传输数据方式的不同
        	基于磁盘操作的 I/O 接口：File
			基于网络操作的 I/O 接口：Socket
        b.根据IO流传输数据方向的不同:
        	输入流
			输出流
        c.同时根据IO流功能不同
        	节点流
			过滤流

3.常用的字节流
1. 操作文件(节点流)
	1.`FileOutputStream`
	```java
        File file = new File("src/a.txt");

        OutputStream os = null;
        try {
            os = new FileOutputStream(file);
            os.write("sunyichao".getBytes());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if (os!=null){
                os.close();}
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
	```
	2.`FileInputStream`
	```java
     InputStream is =null;
        try {
             is= new FileInputStream(file);
            int a;
            while ((a=is.read())!=-1){
                System.out.println((char)a);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (is!=null){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
	```
举例：文件的复制
```java
	public class CopyPic {
    public static void main(String[] args) {
        InputStream is = null;
        OutputStream os = null;
        long time = System.nanoTime();
        try {
            is = new FileInputStream("src/file/屏幕快照.png");
            os = new FileOutputStream("src/file/copy.png");
            int a =0;
            while ((a=is.read())!=-1){
                os.write(a);
            }
            System.out.println(System.nanoTime()-time);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if (is!=null) {
                    is.close();
                }
                if (os!=null){
                    os.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
2. 过滤流
	1.`BufferedOutputStream`
	2.`BufferedInputStream`
	```java
    public class CopyPic3 {
    public static void main(String[] args) {
        InputStream is = null;
        OutputStream os = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        long time = System.nanoTime();
        try {
            is = new FileInputStream("src/file/屏幕快照.png");
            os = new FileOutputStream("src/file/copy3.png");
            bis = new BufferedInputStream(is);
            bos = new BufferedOutputStream(os);

            int a =0;
            byte [] bytes = new byte[1024];
            while ((a=bis.read(bytes))!=-1){
                bos.write(bytes);
            }
            System.out.println(System.nanoTime()-time);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if (bis!=null){
                bis.close();}
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bos!=null){
                bos.close();}
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (is!=null) {
                    is.close();
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
            if (os!=null){
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

	```
3. 对象序列化
	1.`ObjectOutputStream`
	```java
     Student stu = new Student("孙益超",24,"男");
        ObjectOutputStream oos=null;
        try {
            oos = new ObjectOutputStream(new FileOutputStream("src/file/stu.save"));
            oos.writeObject(stu);
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(oos!=null){
                try {
                    oos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

	```
	2.`ObjectInputStream`
	```java
     ObjectInputStream ois=null;
        Student stu2 = null;
        try {
            ois = new ObjectInputStream(new FileInputStream("src/file/stu.save"));
            stu2= (Student) ois.readObject();
            System.out.println(stu2);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            if (ois!=null){
                try {
                    ois.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
	```