window.onload = function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 横向切换选项
        // loop: true, // 循环模式选项
        autoplay: true,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },


        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        }
    })
    //鼠标覆盖停止自动切换
    mySwiper.el.onmouseover = function () {
        mySwiper.autoplay.stop();
    }

    //鼠标离开开始自动切换
    mySwiper.el.onmouseout = function () {
        mySwiper.autoplay.start();
    }
}