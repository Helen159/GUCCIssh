console.log(window.location.href);

// 定义一个变量,来存储 ajax的请求结果
    // 方便在其他函数数据中使用
    let result = [];

    // 1,先获取地址栏中的数据信息
    let str = decodeURIComponent(window.location.search.substr(1));
    // 转化成数组
    const arr = str.split('=');

    // 2,发送ajax请求,获取结果,生成页面内容
    // 与列表页需要分页显示,需要反复查询不同
    // 详情页只需要查询一次

    $.ajax({
      url:'../server/detail.php',
      type:'post',
      data:{goods_id : arr[1]},
      dataType : 'json',
      success : function(res){
        console.log(res);

        // 对全局作用域变量 result 进行赋值,便于在函数外调用
        result = res;

        // 根据数据,生成页面
        let str = '';
        str = `<div class="left">
                    <img src="${res.goods_small_logo}" alt="">
                </div>
                <div class="right">
                    <h1>${res.goods_name}</h1>
                    <p>￥${res.goods_price}</p>
                    <span>${res.cat_id}</span><br/>
                    <button class="panel">加入购物车</button>
                </div>`;
            
            // 将字符串内容,吸入到标签中
            $('.con').html(str);
      }
    })

    // 需要给 加入购物车 按钮添加点击事件效果
    // 加入购物车 按钮,是动态生成的内容
    // 如果你直接写,ajax是异步请求,无法给标签添加事件
    // 如果直接 获取 标签,会是空数组
    // 必须写成事件委托的形式
    // console.log($('.panel'));
    

    $('.con').on('click' , '.panel' , function(){
      
        // 1,判断是否登录了
        // 如果登录,可以正常加入购物车
        // 如果没有登录,不加入购物车,要去登录
        // 判断是否是 cookie login 这个属性
        const cookieObj = getCookieObj(document.cookie);
        
        if( cookieObj.login === undefined ){
            // 没有登录,弹出确认框
            let bool = window.confirm('您还没有登录,点击确定,跳转登录页面');
            if(bool === true){
              // 传参当前页面的地址信息,告诉登录页面,我是从哪儿来的
              // window.location.href就是当前地址栏中的url信息
              window.location.href = `../pages/login.html?${window.location.href}`;
            }else{
              // 如果点击取消,后面的加入购物车的程序,也不执行了
              return false;
            }
        }else if(cookieObj.login === '1'){
            // 跳转购物车页面
            window.location.href = './cart.html';

            // 将这条数据,添加在购物车页面中
            // 如果购车中没有这条数据,要新增这条数据
            // 如果购物车中有这条数据,要在购买数量上,增加1

            // 在点击事件函数中,就可以使用 ajax的请求结果 res
            
            if(localStorage.getItem('cart') === null  ){
              // 证明购物车是空的
              // 直接把这个商品信息,写入购车中就可以了
              // 但是要要有数据的基础上,增加一些内容
              result.num = 1;     // 购买数量信息,第一次默认是1
              result.buy = true   // 默认当前商品是购买状态
              // 不能直接存储在 购物车信息中
              // 购物车信息有可能会有多条信息,要定义成数组的形式
              // 建立一个空数组
              var arr = [];
              // 将对象写入空数组,作为第一条数据信息
              // 也就是购物车中的第一条信息
              arr.push(result);
              
            }else{
              // 跟判断质数的开关变量,思路相同
              // 先默认购物车中没有当前商品
              let bool = true;

              // 购物车数据已经存在
              // 如果已经有当前商品,是在购买商品数量的基础上+1
              // 如果没有当前商品,是在有购物车原有数据的基础上,新增当前商品数据

              // 先获取 localStorage 中的信息,解析为对应的数据类型
              var arr = JSON.parse(localStorage.getItem('cart')) ;

              // 循环遍历这个数组
              arr.forEach(function(item){
                // 也就是 如果 购车车中的数据,goods_id 数值
                // 与当前商品 goods_id数值 相同,证明购车中,已经有当前商品了
                if(item.goods_id === result.goods_id){
                    item.num++;
                    // 给变量赋值false,表示购物车中,有当前商品
                    bool = false;
                }
              })
              
              // 循环结束
              // 如果 bool仍然是 true 证明 购物车中没有当前商品,要新增当前商品
              // 如果 bool是false 证明 购物车中有当期商品,已经增加够买数量,不用再操作了
              if(bool === true){
                result.buy = true;
                result.num = 1;
                arr.push(result);   // 在最后新增数据
                //arr.unshift(result);   // 在起始新增数据
              }

            }

            // 当所有的判断都结束了,会有一个新的 arr
            // 存储的是 点击 按钮之后,新的数据内容
            // 将新的数据内容,写入到 localStorage 中 
            localStorage.setItem('cart' , JSON.stringify(arr) );
        }
    })