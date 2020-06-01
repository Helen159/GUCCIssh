$(document).ready(function(){ 
    $(window).scroll(function(){
        if($(window).scrollTop()>50){
            // $('.navigation>.logo').css('display','none');
            $('.navigation').css('position','sticky');
            // $('.navigation').css('background-color','black');
            $('.navigation').css('height',60+'px');

            $('.logo').css('display','none');
            $('.news').css('position','absolute');
            // $('.find').css('z-index',999);

            $('.navigation').mouseout(function(){
                // $(this).css('background-color','black');
            });
        }else{
            // $('.navigation>.logo').css('display','block');
            $('.navigation').css('position','absolute');
            // $('.navigation').css('background-color','transparent');
            $('.navigation').css('height',92+'px');
            
            $('.logo').css('display','block');
            $('.news').css('position','initial');

            $('.navigation').mouseleave(function(){
                // $(this).css('background-color','transparent');
            });
        }
    })

    
    // 注册页面弹出
   $('[name="reg"]').on('click',function(){
    
        if($('.reg1').css('display')=='none'){
            $('.reg1').css('display','block');   
            $('.zhuce').css('display','block'); 
        }
         
   })
   $('.reg1').on('click',function(){
         if($('.reg1').css('display')=='block'){
            $('.reg1').css('display','none');   
            $('.zhuce').css('display','none');

        }  
   })



   
   //向后端发送请求获取用户信息登录
    $('#log3').on('click',function(e){
       // 先阻止默认事件的执行
       e.preventDefault();

       // 获取输入的数据
       let username = $('[id="log1"]').val();
       let userpwd = $('[id="log2"]').val();

    //    console.log(username,userpwd);
    $.ajax({
        url: '../server/login.php',
        type: 'post',
        data: { userName: username, userPwd: userpwd },
        dataType: 'json',
        success: function (res) {
          if (res == '1') {
            window.alert('您已登录成功');
            // 跳转回首页面时,要告诉首页面,登录成功
            // 在url地址后,拼接参数
            // 哪儿来的,回哪儿去

            // 判断一下,地址是否是首页面
            // 首页面要传参 login=1
            //  获取 url地址中的参数
            let str = decodeURIComponent(window.location.search);
            str = str.substr(1);

            // console.log(str.indexOf('index.html') === -1)
            // 判断数据中,是否有 'index.html' 这个 页面名称
            // 如果有,就是首页,如果没有就是其他页面

            // if (str.indexOf('index.html') === -1) {
            //   // 没有index.html,或其他页面,直接跳转回去就行了
            //   window.location.href = str;
            // } else {
            //   // 是首页面要拼接 login=1 参数
            //   window.location.href = str + '?login=1';
            // }

            // 首页面的跳转也不需要拼接参数 login=1,可以直接转换回来的页面
            window.location.href = str;


            // 登录成功,设定coolie
            // 此时的cookie 是 www文件夹 下的 cookie
            // 可以在登录页面上设定一个全局的cookie,任意一个文件都可以获取到cookie
            // 就不用在 首页面上设定 cookie
            setCookies('login' , 1 , 7*24*60*60);
          
          } else if (res == '0') {
            // 返回值是 0 ,表示没有数据,登录失败
            window.alert('您登录失败,请继续登录');
          }
        }
      })   
        
    }) 
 
})