// 1,获取 localStorage 中的数据信息
const cateArr = JSON.parse(localStorage.getItem('cart'));
setPage(cateArr);

function setPage(array) {
  // 定义变量来存储数据,定义在函数中
  let NUM = 0;
  let TYPE = 0;
  let PAY = 0;


  // 2,根据数据内容来生成页面
  // 生成的页面部分分为三部分

  // 第一部分,是页面的上方内容,是固定内容
  let str = `

  <div class="panel panel-info ">
    <div class="panel-body bg-info">
      <div class="checkbox">
        <label>
          <button class="del btn btn-danger" name="all">全选</button>
          <button class="del btn btn-danger" name="no">不选</button>
          <button class="del btn btn-danger" name="not">反选</button>
        </label>
      </div>
    </div>
    <div class="panel-footer">
      <ul class="cart-list">`;

  // 第二部分是商品的信息部分,是根据 购物车信息 循环遍历生成的
  // 定义写的数据,选中效果,使用三元运算符,根据 buy的信息来判断
  // 定义 减 标签 如果数值是 1,禁用标签,不能再减了
  // 定义 加 标签 如果数值是 库存,禁用标签,不能再加了
  array.forEach(function (item) {
    str += `<li class="cart-item">
              <div class="left">
                <input name="checked" goods_id="${item.goods_id}" type="checkbox" ${item.buy === true ? 'checked' : ''}>
              </div>
              <div class="right">
                <div class="media">
                  <div class="media-left">
                    <a href="#">
                      <img class="media-object" src="${item.goods_small_logo}" alt="...">
                    </a>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">${item.goods_name}</h4>
                    <p>
                      <i class="glyphicon glyphicon-yen"></i>
                      <span>${item.goods_price}</span>
                    </p>
                    <div class="btn-group pull-right" role="group" aria-label="...">
                      <button type="button" name="lost" goods_id="${item.goods_id}" class="btn btn-default" ${ item.num == 1 ? 'disabled' : '' }>-</button>
                      <button type="button" class="btn btn-default" disabled>${item.num}</button>
                      <button type="button" name="odd" goods_id="${item.goods_id}" class="btn btn-default" ${ item.num == item.goods_number ? 'disabled' : '' }>+</button>
                    </div>
                    <button name="del" goods_id="${item.goods_id}"  class="del btn btn-danger">我不要了</button>
                  </div>
                </div>
              </div>
            </li>`;
  
  
    if(item.buy === true){
      TYPE++;           // 种类++
      NUM += item.num;  // 数量是 += 累加
      PAY += item.num * item.goods_price;   // 钱数是 数量*单价
    }
  
  })

  // 计算判断数据信息
  


  // 第三部分
  // 最后结束的部分
  // 有小数参与,会造成数值计算时精度丢失,需要保留两位小数
  str += `</ul>
    </div>
  </div>
  </div>
  <div>
    <h4>您购买了${TYPE}种商品</h4> 
    <h4>您购买了${NUM}件商品</h4> 
    <h4>您需要支付${ parseInt(PAY*100)/100 }元</h4>  
  
  </div>
  
  `;


  $('.container').html(str);

};

// 通过事件委托,给动态生成的内容,添加点击事件
// 如果只是少量标签,使用jQuery事件委托更简单
// 如果是大量事件委托,用js的语法更简单

const oDiv = document.querySelector('.container');

oDiv.addEventListener('click' , function(e){
  // 点击的是全选标签
  if(e.target.getAttribute('name') === 'all'){
    // 给数组中的所有数据,buy属性都设定为true
    cateArr.forEach(function(item){
      item.buy = true;
    })
  }

  // 点击的是不选标签
  if(e.target.getAttribute('name') === 'no'){
    // 给数组中的所有数据,buy属性都设定为false
    cateArr.forEach(function(item){
      item.buy = false;
    })
  }

  // 点击的是反选标签
  if(e.target.getAttribute('name') === 'not'){
    // 给数组中的所有数据,buy属性都设定为原始数值取反
    cateArr.forEach(function(item){
      item.buy = !(item.buy);
    })
  }

  if(e.target.getAttribute('name') === 'checked'){
    // 获取 goods_id 的属性
    let goods_id = e.target.getAttribute('goods_id');
    cateArr.forEach(function(item){
      // 如果当前item的goods_id 与 标签中存储的goods_id相同
      if(item.goods_id === goods_id){
        // 设定 数据 的 购买数据,是复选框当前的数据
        item.buy = $(e.target).prop('checked');
      }
    })

  }

  // 我不要了 按钮
  if(e.target.getAttribute('name') === 'del'){
    // 获取 goods_id 的属性
    let goods_id = e.target.getAttribute('goods_id');
    cateArr.forEach(function(item , key){
      // 如果当前item的goods_id 与 标签中存储的goods_id相同
      if(item.goods_id === goods_id){
        // 从当前的索引下标开始,删除数组中的一个数据单元
        cateArr.splice(key,1);
      }
    })
  }

  // 添加 按钮
  if(e.target.getAttribute('name') === 'odd'){
    // 获取 goods_id 的属性
    let goods_id = e.target.getAttribute('goods_id');
    cateArr.forEach(function(item , key){
      // 如果当前item的goods_id 与 标签中存储的goods_id相同
      if(item.goods_id === goods_id){
        // 购买数量++
        item.num++;
      }
    })
  }

  // 减少 按钮
  if(e.target.getAttribute('name') === 'lost'){
    // 获取 goods_id 的属性
    let goods_id = e.target.getAttribute('goods_id');
    cateArr.forEach(function(item , key){
      // 如果当前item的goods_id 与 标签中存储的goods_id相同
      if(item.goods_id === goods_id){
        // 购买数量--
        item.num--;
      }
    })
  }

  // 不管上面那个一个事件触发了,总会改变数组中的数据

  // 将新的数组,写入到页面中
  setPage(cateArr);
  // 把新数组的数据,写入到 localStorage 中
  localStorage.setItem('cart' , JSON.stringify(cateArr) );
})