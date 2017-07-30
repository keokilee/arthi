$(function () {
	$(document).foundation();

	AOS.init({
		duration: 1050,
		once: true,
		delay: 20
	});

	setTimeout(function () {
		AOS.refresh();
	}, 0);
});

// @include('components/scroll-down.js')
// @include('components/textbox.js')

// @include('../blocks/header-3/script.js')
// @include('../blocks/contents-14/script.js')
// @include('../blocks/custom-1/script.js')
// @include('../blocks/portfolio-2/script.js')
// @include('../blocks/team-2/script.js')
// @include('../blocks/footer-7/script.js')
