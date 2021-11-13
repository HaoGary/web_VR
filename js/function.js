window.onload = function () {

    $(document).ready(function () {

        new Splide('.splide', {
            type: 'loop',
            perPage: 1,

        }).mount();
    });

    // ==================== sliding  
    const report = document.querySelector('.scroll_report');
    const nav_link = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');
    const about = document.querySelector('.about');

    // 創建空間
    const navTable = {};
    // forEach 獲取 nav_link 裡的所有標籤 值
    nav_link.forEach(function (link) {

        console.log("link 值:", link);
        // 獲取 data-target 裡的數據 得到客製化屬性
        const sectionId = link.dataset.target;
        console.log("sectionId 值:", sectionId);
        // 物件["屬性名"]=值    (建立關聯性)
        navTable[sectionId] = {
            link: link,
            // 抓取有ID是 section1 section2 section3 section4
            section: document.getElementById(sectionId)
        }

    });

    console.log(navTable);

    // 頁面滑動 判斷
    window.addEventListener('scroll', function () {
        const y = Math.round(window.scrollY + navbar.offsetHeight);
        if (y == 0) {
            $('.nav-item').removeClass('nav-act');
        }

        report.innerHTML = `位置: ${y}`;

        for (const getId in navTable) {
            // navTable 裡面的 獲取資料
            const section = navTable[getId].section;
            const link = navTable[getId].link;
            // 取上邊緣線 的值
            const top = section.offsetTop;
            // 取下邊緣線 的值
            const bottom = top + section.offsetHeight;
            // 判斷y值是否大於頂部的值 and 小於底部值
            if (y > top && y < bottom) {
                // link.classList.add('nav-act');
                $(link).addClass('nav-act');
            } else {
                // link.classList.remove('nav-act');
                $(link).removeClass('nav-act');
            }
        }

        // 按鈕出現
        if (window.pageYOffset >= about.offsetTop) {
            $('.scroll-top').css('opacity', 1);
        } else {
            $('.scroll-top').css('opacity', 0);
        }

        if (window.pageYOffset == 0) {
            $('.header').css('background-color', 'rgba(0, 0, 0, 0.5)');
            $('.nav-link').css('color', 'white');
        } else {
            $('.header').css('background-color', 'white');
            $('.nav-link').css('color', '#7e57c2');
        }

    });

    // 當點擊時 頁面的y座標就為 0
    $('.goTop').click(function () {
        $('html,body').animate({ 'scrollTop': 0 }, 500);
    });

    // ==================== sliding Top
    $('.navbar-nav li').click(function () {
        // 獲取menu indexs
        var menu_index = $(this).index();
        var currentTop = $('.main-section .page').eq(menu_index).offset().top;
        console.log("currentTop:", currentTop);
        $("body, html").stop().animate({
            scrollTop: currentTop
        });
    });

    // ====================================================================== header
    // ==================== search btn
    const search = document.querySelector('.search');
    const btn = document.querySelector('.search-btn');
    const input = document.querySelector('.input');

    btn.addEventListener('click', function () {
        search.classList.toggle('active');
        input.focus();
        // 如果有active 文字就顯示，不然就消失
        if ($('.nav-item').hasClass('active')) {
            $('.input').css('opacity', '1');
        } else {
            $('.input').css('opacity', '0');
        }
    });

    // ==================== slide page
    const slide_page = document.querySelector('.slide-page');
    const slides = document.querySelector('.slides');
    const circle = document.querySelector('.slide-indicators');
    const arrow_r = document.querySelector('.slide-control-next');
    const arrow_l = document.querySelector('.slide-control-prev');
    var slides_width = slides.offsetWidth;
    var slides_length = slides.children.length;
    console.log("width:", slides_width);

    slide_page.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    });
    slide_page.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });
    // 動態生成 圓圈 跟圖片的個數一樣
    for (i = 0; i < slides.children.length; i++) {
        const li = document.createElement('li');
        // 存取 i 到 index 裡面
        li.setAttribute('index', i);
        // 添加圓點
        circle.appendChild(li);
        // 當前的有白點，其餘的白點 刪除
        li.addEventListener('click', function () {

            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }

            this.className = 'active';
            // 獲取索引號
            var index = this.getAttribute('index');
            num = index;
            control_circle = index;
            console.log(index);
            // 向左移動
            $('.slides').animate({ "left": index * -100 + "%" }, 300);
        });
    }
    // 添加class 'active' 屬性 到第一個子物件
    circle.children[0].className = 'active';

    // 克隆第一張
    var first_img = slides.children[0].cloneNode(true);
    slides.appendChild(first_img);
    slides.children[3].style.left = 300 + "%";

    // 按鈕點擊
    let num = 0;
    var control_circle = 0;

    arrow_r.addEventListener('click', function () {
        if (num == slides_length) {
            slides.style.left = 0;
            num = 0;
        }
        num++;
        $('.slides').animate({ "left": num * -100 + "%" }, 300);

        control_circle++;
        if (control_circle == circle.children.length) {
            control_circle = 0;
        }
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[control_circle].className = 'active';

    });
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            num = slides_length - 1;
            slides.style.left = -num * 100 + "%";
        }
        num--;
        $('.slides').animate({ "left": -num * 100 + "%" }, 300);

        control_circle--;
        if (control_circle < 0) {
            control_circle = circle.children.length - 1;
        }
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[control_circle].className = 'active';

    });

    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);

    // ====================================================================== main section
    // gallery
    $('.buttons').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var filter = $(this).attr('data-filter')
        if (filter == 'all') {
            $('.image').show(1000);
        } else {
            $('.image').not('.' + filter).hide(500);
            $('.image').filter('.' + filter).show(1000);
        }
    });

    $('.gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

}
