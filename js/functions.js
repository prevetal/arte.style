$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').html('<div style="text-align: center; padding: 30px; font-family: Arial, sans-serif;">Ваш браузер устарел рекомендуем обновить его до последней версии<br> или использовать другой более современный</div>')
	}


	// Анимированное появление страницы
	setTimeout(function(){
		$('body').addClass('show')
	}, 300)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll())


	// Кнопка 'Вверх'
	$('body').on('click', '.buttonUp a', function(e) {
		e.preventDefault()

		$('body, html').stop(false, false).animate({
			scrollTop: 0
		}, 1000)
	})


	// Всплывающие окна
	$('body').on('click', '.modal_link', function(e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : $(this).attr('href'),
			type : 'inline',
			opts : {
				touch : false,
				speed : 300,
				backFocus : false,
				trapFocus : false,
				autoFocus : false
			}
		})
	})


	// Увеличение картинки
	$('.fancy_img').fancybox({
		backFocus : false,
		trapFocus : false,
		autoFocus : false
	})


	// Аккордион
	$('body').on('click', '.accordion .item .title', function(e) {
    	e.preventDefault()

    	let parent = $(this).closest('.accordion')

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			parent.find('.item .title').removeClass('active')
			parent.find('.item .data').slideUp(300)

			$(this).addClass('active').next().slideDown(300)
		}
    })


    // Табы
	var loationHash = window.location.hash

	$('.tabs_container').each(function(){
	    $(this).find('> .tab_content:first').show()
	})

	$('body').on('click', '.tabs a', function(e) {
		e.preventDefault()

	    if( !$(this).hasClass('active') ) {
	    	let parent = $(this).closest('.tabs_container')
		    let activeTab = $(this).attr('href')

		    parent.find('> .tabs a').removeClass('active')
		    parent.find('> .tab_content').hide()

		    $(this).addClass('active')
		    $(activeTab).fadeIn()
	    }
	})

	if( loationHash ) {
		let activeTab = $('.tabs a[href='+ loationHash +']')
		let parent = activeTab.closest('.tabs_container')

		parent.find('> .tabs a').removeClass('active')
		parent.find('> .tab_content').hide()

		activeTab.addClass('active')
		$( activeTab.attr('href') ).fadeIn()

		$('html, body').stop().animate({
		   	scrollTop: $( activeTab.attr('href') ).offset().top
		}, 1000)
	}


	// Плавная прокрутка к якорю
	// Работает и при прокрутке к табу
	$('body').on('click', '.scroll_link', function(e) {
		e.preventDefault()

		let href = $(this).attr('href')
		let addOffset = 0

		if( $(this).data('offset') ) {
			addOffset = $(this).data('offset')
		}

		if( $('.tabs a[href='+ href +']') ) {
			let activeTab = $('.tabs a[href='+ href +']')
			let parent = activeTab.closest('.tabs_container')

			parent.find('> .tabs a').removeClass('active')
			parent.find('> .tab_content').hide()

			activeTab.addClass('active')
			$( activeTab.attr('href') ).fadeIn()
		}

		$('html, body').stop().animate({
		   	scrollTop: $(href).offset().top - addOffset
		}, 1000)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()


	// Моб. меню
	$('body').on('click', 'header .mob_menu_link', function(e) {
    	e.preventDefault()

		$('header .info, header .col_l, .mob_close').addClass('show')
		$('.overlay').fadeIn(300)
    })

    $('body').on('click', 'header .mob_close, .overlay', function(e) {
    	e.preventDefault()

		$('header .info, header .col_l, .mob_close').removeClass('show')
		$('.overlay').fadeOut(300)
    })


    if( is_touch_device() ){
    	$('header .menu .item > a.sub_link').addClass('touch_link')

    	$('body').on('click', 'header .menu .item > a.touch_link', function(e) {
    		if( $(this).next().css('visibility') == 'hidden' ) {
	    		e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')
    		}
	    })
    }


    // Списки в сайдбаре
	$('body').on('click', 'aside .link_mob', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('aside')

	    if( $(this).hasClass('active') ) {
	    	$(this).removeClass('active')
	    	
	    	$(this).next().slideUp(300)
	    } else {
	    	$('aside .link_mob').removeClass('active')
	    	$(this).addClass('active')

	    	parent.find('.list').slideUp(300)

	    	$(this).next().slideDown(300)
	    }
	})
})




$(window).scroll(function(){
	// Кнопка 'Вверх'
	if( $(window).scrollTop() > $(window).innerHeight() ) {
		$('.buttonUp').fadeIn(300)
	} else {
		$('.buttonUp').fadeOut(200)
	}
})



// Вспомогательные функции
function setHeight(className){
    let maxheight = 0
    let object = $(className)

    object.each(function() {
    	let elHeight = $(this).innerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    object.innerHeight( maxheight )
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}