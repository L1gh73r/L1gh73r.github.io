$(function () {
    /**
     * 添加文章卡片hover效果.
     */
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();

    const drawer = document.getElementById('mobile-nav');
    const drawerTrigger = document.querySelector('[aria-controls="mobile-nav"]');
    $(drawer).sidenav({
        draggable: false,
        onOpenStart() {
            drawer.classList.add('visible');
            drawerTrigger.setAttribute('aria-expanded', 'true');
        },
        onOpenEnd() {
            drawer.querySelector('.sidenav-close').focus();
        },
        onCloseEnd() {
            if (drawer.contains(document.activeElement)) {
                drawerTrigger.focus();
            }
            drawer.classList.remove('visible');
            drawerTrigger.setAttribute('aria-expanded', 'false');
        }
    });
    drawer.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            M.Sidenav.getInstance(drawer).close();
        }
    });

    /*初始化瀑布流布局*/
    $('#articles.articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        $('#articleContent a').attr('target', '_blank');

        $('#articleContent img').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    captionText = title;
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('b');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
    articleInit();

    $('.modal').modal({
        onOpenEnd(modal) {
            const searchInput = modal.querySelector('#searchInput');
            if (searchInput) searchInput.focus();
        }
    });

    /*回到顶部*/
    $('#backTop').click(function () {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
        return false;
    });

    /*监听滚动条位置*/
    const $backTop = $('.top-scroll');
    function updateBackTop() {
        $backTop.toggle(window.scrollY > 100);
    }
    updateBackTop();
    window.addEventListener('scroll', updateBackTop, { passive: true });
	
    $('.m-nav-item>a').on('click',function(){
            if ($(this).next('ul').css('display') == "none") {
                $('.m-nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(100);
                $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
            }else{
                $(this).next('ul').slideUp(100);
                $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
            }
    });

    // 初始化加载 tooltipped.
    $('.tooltipped').tooltip();
});
