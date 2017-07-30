$(function () {
	$('.textbox--password .textbox__toggle').on('click', function () {
		var $button = $(this);
		var $textbox = $button.closest('.textbox');
		var $input = $button.siblings(':input');

		if ($input.attr('type') === 'password') {
			$input.attr('type', 'text');
			$textbox.addClass('is-password-visible');
		} else {
			$input.attr('type', 'password');
			$textbox.removeClass('is-password-visible');
		}

		$button.trigger('blur');
	});
});
