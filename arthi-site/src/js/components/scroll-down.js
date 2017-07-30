$(function () {
	$('.js-scroll-down').click(function (e) {
		var $this = $(this);

		e.preventDefault();

		$('html, body').animate({
			scrollTop: $this.closest('.js-block').next().offset().top,
		}, 600);

		$this.trigger('blur');
	});
});
