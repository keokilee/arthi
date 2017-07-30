$(function () {
	"use strict";

	var $moreButton = $('.portfolio-2__button');
	var $block = $('.portfolio-2__row');
	var $items = $('.portfolio-2__column');

	$moreButton.on('click', function (event) {
		event.preventDefault();

		var items = $items.clone().toArray();
		var shuffled = _.shuffle(items);

		$(shuffled).appendTo($block);


		$('html, body').animate({
			scrollTop: $moreButton.offset().top - $(window).height() + $moreButton.outerHeight()
		}, 600);
	});
});