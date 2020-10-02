$(function() {

	$('.city-select').on('click', function(){
		if( $(this).hasClass('active') === false ){
			$(this).addClass('active').find('.city-select__list').addClass('active');
		}else{
			$(this).removeClass('active').find('.city-select__list').removeClass('active'); 
		}
		
	});

	$(document).on('mouseup',function (e){
		var div = $(".city"); 
		if (!div.is(e.target) 
				&& div.has(e.target).length === 0) { 
			div.find('.city-select__list').removeClass('active'); 
		}
	});

	$('.carousel-stock').owlCarousel({
		items: 1,
		nav: false,
		mouseDrag: false
	});
	$('.carousel-stock__bg').owlCarousel({
		items: 1,
		nav: false,
		dots: false
	});
	$('.carousel-stock').on('changed.owl.carousel', function(event) {
		$('.carousel-stock__bg').trigger('to.owl.carousel',[event.item.index]);
	});

	var reviewImg = $('.review-carousel__img');
			reviewText = $('.review-carousel__text');
	reviewImg.owlCarousel({
		items: 1,
		nav: false,
		dots: false,
		mouseDrag: false,
		touchDrag: false
	});

	reviewText.owlCarousel({
		items: 1,
		nav: false,
		dots: false,
		mouseDrag: false,
		touchDrag: false,
		margin: 40,
		autoHeight: true,
		onInitialize: function(event){
			var itemDot = $('.review-carousel__img-item').length;
			for(i=0; i < itemDot; i++){
				if( i === 0 ){
					var item = '<div data-item="0" class="dot-item active"><span>'+(i+1)+'</span></div>'
				}else{
					var item = '<div data-item="'+i+'" class="dot-item"><span>'+(i+1)+'</span></div>'
				}
				$('.wrap-dots').append(item);
			}


		}
	});



	reviewText.on('changed.owl.carousel', function(event) {
		 reviewImg.trigger('to.owl.carousel', [event.item.index]);
		 var dotItem = event.relatedTarget.relative(event.item.index)+1;
		 $('.content-review__right').addClass('anim-number').attr('data-count', dotItem);
		 setTimeout(function(){
				$('.content-review__right').removeClass('anim-number');
		 }, 180)
	});

	$('.nav a').on('click', function(){
		if( $(this).hasClass('prev') === true ){
			reviewText.trigger('prev.owl.carousel', [300]);
			reviewImg.trigger('prev.owl.carousel', [300]);
			if($('.dot-item.active').prev().is('.dot-item') == true){
				$('.dot-item.active').removeClass('active').prev().addClass('active');
			}else{
				$('.dot-item:first-child').addClass('active');
			}
		}else{
			reviewText.trigger('next.owl.carousel', [300]);
			reviewImg.trigger('next.owl.carousel', [300]);
			if($('.dot-item.active').next().is('.dot-item') === true){
				$('.dot-item.active').removeClass('active').next().addClass('active');
			}else{
				$('.dot-item:last-child').addClass('active');
			}
		}
		return false;
	});

	$('.wrap-dots').on('click', '.dot-item', function(){
		$(this).parent().find('.dot-item').removeClass('active');
		$(this).addClass('active');
		reviewText.trigger('to.owl.carousel', [$(this).data('item')]);
		reviewImg.trigger('to.owl.carousel', [$(this).data('item')]);
		return false;
	});

	$('.burger').on('click', function(){
		if( $('.xs-nav').hasClass('active') === false ){
			$(this).addClass('active');
			$('.xs-nav').addClass('active');
		}else{
			$(this).removeClass('active');
			$('.xs-nav').removeClass('active');
		}
	});






	function setEqualHeight(columns){
			var tallestcolumn = 0;
			columns.each(
				function(){
					$(this).removeAttr('style');
					currentHeight = $(this).height();
					if(currentHeight > tallestcolumn){
					tallestcolumn = currentHeight;
					}
				}
			);
		columns.height(tallestcolumn);
	}
	
	setEqualHeight($("content-popular__col .content-popular__text h3:not(.item-product .content-popular__text h3)"));
	setEqualHeight($(".content-popular__text p"));


	function topNav(){
		if(window.matchMedia('(max-width: 1230px)').matches){
			if( $('.nav-top ul li').is('.drop-down') === false ){
				$('.nav-top ul li:not(.drop-down)').slice(-2).hide();
				var cloneLi = $('.nav-top ul li:not(.drop-down)').clone().slice(-2);
				$('.nav-top ul')
					.append('<li class="drop-down"><span>Еще</span><div class="drop-menu"></div></li>');
				
				for(i=0; i < 2; i++){
					$('.nav-top').find('.drop-down').children('.drop-menu')
						.append(cloneLi[i].innerHTML);
				}
			}
			
		}else{
			$('.nav-top ul .drop-down').remove();
			$('.nav-top ul li:not(.drop-down)').slice(-2).show();
		}
	}

	$('.nav-top').on('click','.drop-down', function(){
		if( $(this).hasClass('active') === false ){
			$(this).addClass('active').find('.drop-menu').slideDown();
		}else{
			$(this).removeClass('active').find('.drop-menu').slideUp();
		}
	});

	var $grid = $('.grid-filter').isotope({
		itemSelector: '.grid-filter__item',
		layoutMode: 'fitRows'
	});

	$('.filter-button-group').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
			$('.filter-button-group button').removeClass('active');
			$(this).addClass('active');
		$grid.isotope({ filter: filterValue });
	});

	var $input = $('.count-el__cart input'),
			$buffer = $('.count-el__cart .input-buffer');

	$input.on('change', function() {
			$buffer.text($input.val());
			$input.width($buffer.width());
	});
	$input.on('input', function() {
			$buffer.text($input.val());
			$input.width($buffer.width());
	});

	$('.count-el-minus').on('click', function(){
		if( $(this).parent().next().length > 0 ){

			if( 
				(parseInt($(this).siblings('input').val())-1) == 0 
				|| 
				(parseInt($(this).siblings('input').val())-1) < 0){
				console.log((parseInt($(this).siblings('input').val())-1))
				$(this).parent().next().addClass('price-0');
			}else{
				$(this).parent().next().removeClass('price-0');
			}
		}
		$(this).siblings('input')[0].stepDown();
			$(this).siblings('.input-buffer').text($(this).siblings('input').val());
			$(this).siblings('input').width($(this).siblings('.input-buffer').width());
	});
	$('.count-el-plus').on('click', function(){
		if( $(this).parent().next().length > 0 ){
			if( (parseInt($(this).siblings('input').val())+1) > 0 ){
				console.log(parseInt($(this).siblings('input').val())+1)
				$(this).parent().next().removeClass('price-0');
			}else{
				$(this).parent().next().addClass('price-0');
			}
		}
		$(this).siblings('input')[0].stepUp();
			$(this).siblings('.input-buffer').text($(this).siblings('input').val());
			$(this).siblings('input').width($(this).siblings('.input-buffer').width());
	});

	function additionalOrder(){
		if(window.matchMedia('(max-width: 992px)').matches){
			$('.additional-order__content')
				.addClass('owl-theme owl-carousel')
				.owlCarousel({
					dots: false,
					nav: true,
					margin: 15,
					stagePadding: 30,
					responsive:{
						0:{
							items: 2
						},
						640:{
							items: 3
						}
					}
				});
		}else{
			$('.additional-order__content')
				.removeClass('owl-theme owl-carousel')
				.owlCarousel('destroy');
		}
	}



	additionalOrder();
	topNav();
	$(window).on('resize', function(){

		additionalOrder();
		topNav();
		setEqualHeight($(".content-popular__text h3:not(.item-product .content-popular__text h3)"));
		setEqualHeight($(".content-popular__text p"));

	});
});
