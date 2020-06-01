
let str = decodeURIComponent(window.location.search);
str = str.substr(1);
// 数组的 0索引 对应的是 键名,也就是字段名称
// 数组的 1索引 对应的是 数据,也就是字段数据
// 根据数据,进行查询操作
const arr = str.split('=');



// 2,发送ajax请求
// 查询的数据内容过多,要做分页查询
// 前端通过插件,实现分页的页面解构,通过点击分页按钮,实现分页查询
// 页面显示,第一次默认显示的是,第一页的内容
// 之后根据分页显示,来显示对应页面的内容

// 第一次调用函数,查询的是第一页的内容,参数是1
getAjax(1);

function getAjax(page) {

    $.ajax({
        url: '../server/men.php',
        data: {
            cat_one_id: arr[1],  // 前端url地址中,分类名称数据
            page: page,          // 当前页数,也就是函数的参数
            line: 8,             // 每页显示的数据数量,根据项目需求而定
        },
        type: 'get',
        dataType: 'json',

        success: function (res) {
            console.log(res);
            let str = '';
            res.forEach(function (item) {
                str += ` <li>
                            <a href="#">
                                <img class="media-object"src="${item.goods_small_logo}"alt="...">
                            </a>
                            <span>${item.goods_name}</span>
                            <h3>￥${item.goods_price}</h3>
                            <p><a href="./详情页.html?goods_id=${item.goods_id}">商品详情</a></p>                               
                        </li>`;
            })
            $('.content').html(str);

            // 分页显示内容

            $('.M-box').pagination({
                mode: 'fixed',               // 固定显示的页面数量
                pageCount: res[0].sumPage,  // 总页数 
                totalData: res[0].row,      // 总数据数量
                current: res[0].page,       // 当前页数
                showData: 8,                // 每页数据数量
                activeCls: 'active',        // 点中标签的样式
                coping: true,                // 显示首页末页
                homePage: '首页',            // 首页的文字内容
                endPage: '末页',             // 末页的文字内容
                prevContent: '上页',         // 上页的文字内容
                nextContent: '下页',         // 下页的文字内容
                callback: function (result) {    // 点击的时候,触发的程序
                    // 获取当前的页数
                    let p = result.getCurrent();  // 获取当前点击的按钮,所表示的下一次请求的页数
                    // 这个页数,就是下次请求的参数
                    getAjax(p);                   // 点击时,再次发送ajax请求,参数是点击的按钮,表示的页数
                }
            });


        }

    })
}