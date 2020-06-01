
// js的打包压缩规范

//     1, 第三方依赖包只能打包压缩ES5规范的js代码
//     2, 要先将其他ES语法规范的代码转化为ES5语法规范

//     npm i gulp-uglify     打包压缩ES5语法规范依赖包
//     npm i gulp-babel      将其他ES语法规范转化为ES5语法规范
//     npm i @babel/core         这是两个和 gulp-babel 配合使用的依赖包
//     npm i @babel/preset-env   说白了就是 gulp-babel 的两个补丁文件,是让 gulp-babel 能更正确的执行


// html的打包规范
//     1, 将HTML文件打包压缩即可
//        关键是 HTML 文件的压缩,要有很多的参数设定
//        实际项目中,根据项目规范手册来定义即可,目前,我们演示一些基本的规范设定

//     npm i gulp-htmlmin


// 图片,音频,视频等,不需要打包压缩,直接复制到指定的文件夹即可


// 通过 gulp 来建立一个 服务器 有点类似于 通过 node内置 http 模块 创建 服务器
// 现在 是通过 gulp 来创建服务器

//     npm i gulp-webserver 


//sass完全兼容css3的代码。即：在sass里可以写css3的代码。
// npm i gulp-sass







// 定义 gulp 的打包规范

// 1,加载 依赖包

// gulp依赖包
const gulp = require('gulp');

// css相关的依赖包
// cssmin依赖包
const cssmin = require('gulp-cssmin');
// autoprefixer依赖包
const autoprefixer = require('gulp-autoprefixer');


// 加载js相关的依赖包
// 打包压缩ES5规范的的依赖包
const uglify = require('gulp-uglify');

// 将其他语法规范,转化为ES5语法规范
// 需要的是三个依赖包 gulp-babel 和配合使用的 @babel/core  @babel/preset-env 
// 实际中 @babel/core  @babel/preset-env 只是配合 gulp-babel 使用的,不需要加载
// 只要加载 gulp-babel 即可,另外两个会加载到 gulp-babel 中
const babel = require('gulp-babel');
// 下载4个,加载2个,另外两个自动加载到 gulp-babel 中


// html依赖包
const htmlmin = require('gulp-htmlmin');

// server依赖包
const webserver = require('gulp-webserver');



// del依赖包
const del = require('del');

//sass依赖包
const sass = require('gulp-sass');

// 2,执行打包压缩规范
// 是 return 方式 通过返回值,来定义打包规范
// gulp语法的规定
// 定义压缩规范,可以使用类似 jQuery 的链式编程

// css压缩规范

// 这两种方式都可以,只要有变量或者函数名称,存储函数内存地址就可以

// 声明方式定义函数
// function cssHandler (){}     

// 匿名函数形式声明
const cssHandler = function () {
    return gulp.src('./src/css/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\css'));
    // gulp.src('./src/css/*.css')      指定要压缩的源文件内容
    // .pipe(autoprefixer())            先自动添加css语法中的兼容前缀
    // .pipe(cssmin())                  将 src() 中 执行路径下的指定文件,打包压缩
    // .pipe(gulp.dest('./dist/css'))   将 打包压缩的程序,存储在指定位置上
}

// js的压缩规范
// 添加到 watch 监听中 和 default 默认执行中
const jsHandler = function () {
    return gulp.src('./src/js/*.js')          // 设定打包的js文件位置
        .pipe(babel({presets:['@babel/env']}))    // 将其他语法规范,转化为ES5语法规范, babel() 中的参数是固定的语法格式
        .pipe(uglify())                           // 打包压缩js文件
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\js'))             // 将 打包压缩的程序,存储在指定位置上
}

// html文件的打包压缩
// 添加到 watch 监听中 和 default 默认执行中
const htmlHandler = function () {
    return gulp.src('./src/pages/*.html')    // 设定打包的html文件位置
           .pipe(htmlmin({
               removeAttributeQuotes : true ,       //  打包时删除属性上的双引号
               removeComments : true ,              //  删除程序中的注释内容
               collapseBooleanAttributes : true ,   //  删除布尔属性中定义的属性值
               collapseWhitespace : true ,          //  删除程序中多余的空格,只删除标签之前的空格,标签内部和内容的空格不会删除
               minifyCSS : true ,                   //  压缩HTML标签中的css程序代码
               minifyJS : true ,                    //  压缩html标签中的js代码
           // 压缩html文件,会有很多的参数,这些参数之间,必须以逗号间隔
           // 实际项目中,到底执行什么规范,看项目手册中的规定,或者问你的项目经理
           // 看到那个知道是什么意思就可以了
           }))
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\pages'))         // 将 打包压缩的程序,存储在指定位置上
}


// 音频,视频,图片等,不打压缩,直接移动到指定的文件夹位置
// 将所有格式的图片,都移动到指定的文件夹位置中
// 添加到 watch 监听中 和 default 默认执行中

// 图片
const imgHandler = function () {
    return gulp.src('./src/img/*.*')        // 指定要移动的图片的文件夹位置
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\img'))   // 指定移动到的文件夹位置
}

// iconfont移动
const iconHandler = function () {
    return gulp.src('./src/iconfont/iconfonts/*.*')        // 指定要移动的iconfont的文件夹位置
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\iconfont\\iconfonts'))   // 指定移动到的文件夹位置
}

// swiper移动
const swiperHandler = function () {
    return gulp.src('./src/swiper-5.3.8/**/*')        // 指定要移动的iconfont的文件夹位置
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\swiper-5.3.8'))   // 指定移动到的文件夹位置
}

//php移动
const serverHandler = function () {
    return gulp.src('./src/server/*.*')        // 指定要移动的iconfont的文件夹位置
        .pipe(gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\server'))   // 指定移动到的文件夹位置
}


//sass压缩
// sass规范
// 定义路径,sass编辑成css,css添加前缀,css压缩,css转存
// 在 package.json 中定义 前缀规范
// **  *.*  都表示所有文件
const sassHandler = function(){
    return gulp.src('./src/css/*.scss')
    .pipe( sass() )                    // 将sass 转化为 css文件
    .pipe( autoprefixer() )            // 自动添加css前缀
    .pipe( cssmin() )                  // 将css程序压缩
    .pipe( gulp.dest('D:\\phpStudy\\WWW\\Gucci\\dist\\css') )   // 将打包压缩好的程序,移动到指定的文件夹
}




// 制定通过gulp来建立服务器
// 只定义在 default 中,在watch监听之前
// 当您运行 gulp 时,会自动打开定义的默认页面
// 但是当你从浏览器地址栏输入时,直接输入 127.0.0.1:8080 是 不行的
// 必须要 输入 完整的 路径地址 才能 访问 http://127.0.0.1:8080/pages/index.html

// 当然这个服务器的功能还不完善,我们之后3阶段,配合框架语法,搭建一个完整的服务器

// const webserverHandler = function(){
//     return gulp.src('./WWW/Gucci/dist')           // 指定的路径是压缩文件的路径,也就是在服务器上运行的都是压缩文件,提高页面中程序的执行效率
//     .pipe(webserver({
//         host : '127.0.0.1' ,            // 定义的域名地址,目前使用本地域名地址127.0.0.1,实际项目中,根据项目需求而定
//         port : 8080 ,                   // 定义端口号
//         open : 'D:\\phpStudy\\WWW\\Gucci\\dist\\pages\\index.html' ,   // 默认打开执行的网页,也就是 输入 127.0.0.1:8080 直接打开的网页
//                                         // 之前在 node.js 中 通过内置http模块 执行访问请求时 必须有 文件名称  127.0.0.1:8080/index.html
//                                         // 在 gulp 中 搭建的服务器 , 有默认的打开页面设定, 直接输入 127.0.0.1:8080 即可
//         livereload : true ,             // 热启动 当文件内容,代码,css,js等发生改变时,会自动重新加载页面,执行效果,不用手动刷新                                       
//     }))
// }



// 3,指定删除程序
const delHandler = function () {
        return del(['./dist']);
    }


    // 3,制定监听程序
    // 当指定的监听文件夹下的文件内容,发生改变,会自动执行打包规范
    // 执行的监听程序,影响的是,修改源文件时,自动打包压缩程序

    const watchHandler = function () {
        gulp.watch('./src/css/*.css', cssHandler);         // 监听 css 文件
        gulp.watch('./src/js/*.js', jsHandler);            // 监听 js 文件
        gulp.watch('./src/pages/*.html', htmlHandler);     // 监听 html 文件
        gulp.watch('./src/img/*.*', imgHandler);        // 监听 图片 文件 
        gulp.watch('./src/iconfont/iconfonts/*.*', iconHandler)        // 监听 iconfont 下iconfonts 里 的文件
        gulp.watch('./src/swiper-5.3.8/**/*', swiperHandler)    //移动swiper轮播插件
        gulp.watch('./src/server/*.*', serverHandler)   //移动php文件
        gulp.watch('./src/css/*.scss',sassHandler)     //监听scss文件
    }


    // 4,定义 gulp 的默认执行程序
    module.exports.default = gulp.series(
        delHandler,
        gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, iconHandler, swiperHandler, serverHandler,sassHandler),   //  默认的,第一次,初始化,先执行一次所有的打包规范
        // webserverHandler,       // 通过 gulp 启动一个服务器 gulp 运行到 webserverHandler 会自动打开设定的默认页面,不用做任何操作
        watchHandler,
    )


// 执行gulp时的基本执行步骤

// 执行 default 当中定义的程序内容
// 之前都是在定义 函数 也就是 定义各种规范
// 只有在 default 中,才是执行这些定义好的函数

// 按照定义的代码顺序,来执行函数
// 1, 执行 delHandler 将之前打包压缩的程序删除掉
//    为了防止生成重复的打包压缩文件,造成程序执行有误
//    这个 delHandler 在整个 监听的过程中,只会执行一次

// 2, 同时执行 所有的打包压缩规范
//    根据当前的源文件,初次生成压缩文件

// 3, 执行 watchHandler 监听源文件
//    每次有监听的文件内容改变,只会重新打包压缩这一个源文件,不会重新压缩所有的项目中的源文件

// 实际项目中,我们只要定义好gulp的压缩规范,然后运行gulp监听
// 会自动生成压缩的打包文件
// 当项目开发结束,所有的压缩文件也就自动生成了
// 将压缩的文件,作为项目文件,布置上线