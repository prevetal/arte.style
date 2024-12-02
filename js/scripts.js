$(function(){
	// Основной слайдер на главной
	$('.main_slider').owlCarousel({
		loop: true,
		margin: 0,
		dots: true,
		nav: true,
		navSpeed: 750,
		dotsSpeed: 750,
		smartSpeed: 750,
		autoplaySpeed: 750,
		items: 1
	})


	if(window.innerWidth >= 767) {
		// Карусель эффектов
		$('.effects .slider').owlCarousel({
			loop: false,
			nav: true,
			dots: false,
			navSpeed: 500,
			dotsSpeed: 500,
			margin: 8,
			responsive : {
				// breakpoint from 768 up
				768 : {
					items: 3
				},
				// breakpoint from 480 up
				480 : {
					items: 2
				},
				// breakpoint from 0 up
				0 : {
					items: 1
				}
			}
		})
	}




	// Карточка товара
	$product_info = $('.product_info .images .slider').owlCarousel({
		loop: false,
		margin: 4,
		dots: true,
		nav: false,
		navSpeed: 500,
		dotsSpeed: 500,
		items: 1,
		onTranslate: callback2
	})

	function callback2(event) {
		var item = event.item.index;
		if (item != $('.product_info .thumbs a').prop('data-slide-index')) {

			$('.product_info .thumbs a').removeClass('active')
			$('.product_info .thumbs a:eq(' + item + ')').addClass('active')
		}
	}

	$('.product_info .thumbs a').click(function(e) {
		e.preventDefault()

		$('.product_info .thumbs a').removeClass('active')
		$(this).addClass('active')

		$product_info.trigger('to.owl.carousel', $(this).attr('data-slide-index'))
	})


	// Отправка форм
	$('body').on('submit', '.form.ajax_submit', function(e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : '#success_modal',
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
});

const tagsCloudOptions = {
    loop: false,
    nav: true,
    dots: false,
    navSpeed: 500,
    dotsSpeed: 500,
    margin: 5,
    onInitialized: function(event){
            $(event.target).find('.item').height('auto');

            setHeight( $(event.target).find('.item') );

            var items = event.item.count;
            var size = event.page.size;

            if ( size < items ) {
                    $(event.target).addClass('loop');

                    $(event.target).next().addClass('show');
            } else {
                    $(event.target).removeClass('loop');

                    $(event.target).next().removeClass('show');
            }
    },
    onResized: function(event){
            $(event.target).find('.item').height('auto');

            setHeight( $(event.target).find('.item') );

            var items = event.item.count;
            var size = event.page.size;

            if ( size < items ) {
                    $(event.target).addClass('loop');

                    $(event.target).next().addClass('show');
            } else {
                    $(event.target).removeClass('loop');

                    $(event.target).next().removeClass('show');
            }
    },
    onRefreshed: function(event){
            $(event.target).find('.item').height('auto');

            setHeight( $(event.target).find('.item') );

            var items = event.item.count;
            var size = event.page.size;

            if ( size < items ) {
                    $(event.target).addClass('loop');

                    $(event.target).next().addClass('show');
            } else {
                    $(event.target).removeClass('loop');

                    $(event.target).next().removeClass('show');
            }
    },
    responsive : {
            1100 : {
                    items: 4
            },
            // breakpoint from 768 up
            768 : {
                    items: 3
            },
            // breakpoint from 480 up
            480 : {
                    items: 2
            },
            // breakpoint from 0 up
            0 : {
                    items: 2
            }
    }
};

function showTagsCloud(obj)
{
    var $obj = $(obj);
    
    if ($obj.hasClass('active')) {
        $obj.removeClass('active');
        
        $('.tags_cloud .slider').removeClass('flex').addClass('owl-carousel');
        $('.tags_cloud .slider').owlCarousel(tagsCloudOptions);
    } else {
        $obj.addClass('active');
        
        $('.tags_cloud .slider').removeClass('owl-carousel').addClass('flex');
        $('.tags_cloud .slider').trigger('destroy.owl.carousel');
        
        $('.tags_cloud .slider').find('.item').height('auto');
    }
}

$(window).load(function(){
	// Товары
	$('.products .products_slider').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		navSpeed: 500,
		dotsSpeed: 500,
		mouseDrag: false,
	    margin: 0,
		onInitialized: function(event){
			setHeight( $(event.target).find('.product_wrap') )
			setHeight( $(event.target).find('.product_wrap .name') )
			setHeight( $(event.target).find('.product_wrap .desc') )
		},
		onRefreshed: function(event){
			$(event.target).find('.product_wrap').height('auto')
			$(event.target).find('.product_wrap .name').height('auto')
			$(event.target).find('.product_wrap .desc').height('auto')

			setHeight( $(event.target).find('.product_wrap') )
			setHeight( $(event.target).find('.product_wrap .name') )
			setHeight( $(event.target).find('.product_wrap .desc') )
		},
		responsive : {
			// breakpoint from 1024 up
			1024 : {
	   			items: 5
			},
			// breakpoint from 768 up
			768 : {
	   			items: 4
			},
			// breakpoint from 480 up
			480 : {
	   			items: 3
			},
			// breakpoint from 0 up
			0 : {
				items: 1
			}
		}
	})


	$('.products .slider').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		navSpeed: 500,
		dotsSpeed: 500,
		mouseDrag: false,
	    margin: 0,
		onInitialized: function(event){
			setHeight( $(event.target).find('.product_wrap') )
			setHeight( $(event.target).find('.product_wrap .name') )
			setHeight( $(event.target).find('.product_wrap .desc') )
		},
		onRefreshed: function(event){
			$(event.target).find('.product_wrap').height('auto')
			$(event.target).find('.product_wrap .name').height('auto')
			$(event.target).find('.product_wrap .desc').height('auto')

			setHeight( $(event.target).find('.product_wrap') )
			setHeight( $(event.target).find('.product_wrap .name') )
			setHeight( $(event.target).find('.product_wrap .desc') )
		},
		responsive : {
			// breakpoint from 1024 up
			1024 : {
	   			items: 5
			},
			// breakpoint from 768 up
			768 : {
	   			items: 4
			},
			// breakpoint from 480 up
			480 : {
	   			items: 3
			},
			// breakpoint from 0 up
			0 : {
				items: 2
			}
		}
	})


	// Карусель в тексте
	$('.carousel_in_text').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		navSpeed: 500,
		dotsSpeed: 500,
	    margin: 8,
		onInitialized: function(event){
			$(event.target).find('.owl-nav .owl-prev, .owl-nav .owl-next').css(
				'top', ($(event.target).find('.img').innerHeight()/2)
			)

			$(event.target).find('.owl-item.cloned .img').removeAttr('data-fancybox')
		},
		responsive : {
			// breakpoint from 768 up
			768 : {
	   			items: 3
			},
			// breakpoint from 480 up
			480 : {
	   			items: 2
			},
			// breakpoint from 0 up
			0 : {
				items: 1
			}
		}
	})


	// Выравнивание товаров в сетке
	setProductsHeight()


	// Каталог эффектов
	effectsInit();


	if( $(window).width() < 1024 ) {
		$('.products .grid_big').owlCarousel({
			loop: false,
			nav: true,
			dots: false,
			navSpeed: 500,
			dotsSpeed: 500,
			mouseDrag: false,
		    margin: 0,
			onInitialized: function(event){
				setHeight( $(event.target).find('.product_wrap') )
				setHeight( $(event.target).find('.product_wrap .name') )
				setHeight( $(event.target).find('.product_wrap .desc') )
			},
			onRefreshed: function(event){
				$(event.target).find('.product_wrap').height('auto')
				$(event.target).find('.product_wrap .name').height('auto')
				$(event.target).find('.product_wrap .desc').height('auto')

				setHeight( $(event.target).find('.product_wrap') )
				setHeight( $(event.target).find('.product_wrap .name') )
				setHeight( $(event.target).find('.product_wrap .desc') )
			},
			responsive : {
				// breakpoint from 768 up
				768 : {
		   			items: 4
				},
				// breakpoint from 480 up
				480 : {
		   			items: 3
				},
				// breakpoint from 0 up
				0 : {
					items: 2
				}
			}
		})
	}
        
	$('.tags_cloud .slider:not(.flex)').owlCarousel(tagsCloudOptions);

	$('.tags_cloud .spoler_btn').click(function (e) {
            e.preventDefault();
            
            showTagsCloud(this);
	});
});



$(window).resize(function(){
	// Выравнивание товаров в сетке
	setProductsHeight();

	// Каталог эффектов
	effectsInit();
})


function setProductsHeight(){
	$('.products .grid .product_wrap').height('auto');
	$('.products .grid .product_wrap .name').height('auto');
	$('.products .grid .product_wrap .desc').height('auto');

	$('.products .grid_big:not(.owl-loaded) .product_wrap').height('auto');
	$('.products .grid_big:not(.owl-loaded) .product_wrap .name').height('auto');
	$('.products .grid_big:not(.owl-loaded) .product_wrap .desc').height('auto');

	if( $(window).width() > 767 ) {
		$('.products .grid').each(function(){
			productsHeight( $(this).find('.product_wrap'), $(this).data('in-line'))
		})
	}

	if( $(window).width() < 768 && $(window).width() > 479 ) {
		$('.products .grid').each(function(){
			productsHeight( $(this).find('.product_wrap'), $(this).data('in-line767'))
		})
	}

	if( $(window).width() < 480 ) {
		$('.products .grid').each(function(){
			productsHeight( $(this).find('.product_wrap'), $(this).data('in-line479'))
		})
	}

	if( $(window).width() > 1023 ) {
		$('.products .grid_big').each(function(){
			productsHeight( $(this).find('.product_wrap'), $(this).data('in-line'))
		})
	}
}


function productsHeight(selector, step){
	var start = 0
	var finish = step

	var products = selector

	for( var i = 0; i < products.length; i++ ){
		var obj = products.slice(start, finish).find('.name')
		var obj2 = products.slice(start, finish).find('.desc')
		var obj3 = products.slice(start, finish)

		setHeight( obj3 )
		setHeight( obj2 )
		setHeight( obj )

		start = start+step
		finish = finish+step
	}
}


function effectsInit(){
	// Каталог эффектов
	var effects = $('.effects_catalog .carousel .effect')
	var sizes = new Object()


	if(effects.size() > 3 && $(window).width() < 1023 ){
		effects.width( Math.ceil($('.effects_carousel').width()/3) )
	}

	if(effects.size() > 2 && $(window).width() < 1024 ){
		effects.width( Math.ceil($('.effects_carousel').width()/2) )
	}

	if(
		effects.size() > 3 && $(window).width() < 1023
		|| ( effects.size() > 2 && $(window).width() < 1024 )
	){
		$('.effects_carousel').addClass('active')

		$frame = $('.effects_carousel .effects_wrap')
		$wrap  = $frame.parent()

		$SLY = $frame.sly({
			horizontal: 1,
			itemNav : 'basic',
			activateMiddle: 1,
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar : $wrap.find('.scrollbar'),
			scrollBy: 0,
			speed : 500,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1
		})
	}
}