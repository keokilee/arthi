$(function () {
	"use strict";

	var $hamburgerOpen = $('.header-3__button__hamburger');
	var $hamburgerPopup = $('.header-3__hamburger');
	var $hamburgerClose = $('.header-3__hamburger__close');

	$hamburgerOpen.on('click', function (event) {
		event.preventDefault();

		$hamburgerPopup.removeClass('is-hidden').animate({
			opacity: 1
		}, 500);
	});

	$hamburgerClose.on('click', function (event) {
		event.preventDefault();

		$hamburgerPopup.animate({
			opacity: 0
		}, 500, function () {
			$hamburgerPopup.addClass('is-hidden');
		})
	});
});