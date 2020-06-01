// window.onload = function(){
//新闻的鼠标移入出现三角形    
$('.news>ul li').mouseover(function(){
    // console.log(this);
    $(this).children('span').css('display','block');
}).mouseout(function () {
    // console.log("鼠标移除");
    $(this).children('span').css('display','none');
});
// }
