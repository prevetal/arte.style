$(function() {

	$("input[name = 'packing']").change(function(){
		var price = $(this).data("price");
		if(price){
			$("td.price .val").text(price);
		}
	});
	$("input[name = 'packing']:checked").trigger("change");

	$(".default_buy_link").click(function(){
		var packing = $("input[name = 'packing']:checked");
		if($(packing).length){
			$("input[name = 'data[new][packing]']").val($(packing).val());
		}
	});

	jQuery(document).on('click', '#user-cookie-confirm-btn, #user-cookie-close-btn', function() {
		localStorage.setItem("cookie", true);
		jQuery('#user-cookie-confirm').stop().hide();
	});
	if (!localStorage.getItem("cookie")) {
		jQuery('#user-cookie-confirm').stop().show();
	}

	$(".sorting select").change(function() {
		$(this).parents("form").trigger("submit");
	});

	$(".buy_link").click(function() {
		$("input[name*=product_name]").val($(this).data("name"));
		$("input[name*=product_link]").val($(this).data("href"));
	});

	$('.faq__head').on('click', function() {
		$(this).closest('.faq__block').toggleClass('active');
	})

	$('.ajax_submit,.webforms').submit(function(e) {
		e.preventDefault();

		var form = $(this);
		checkForm(form);
		if ($(form).find(".error").length === 0) {

			var xhr = new XMLHttpRequest();

			xhr.onload = xhr.onerror = function(e) {
				if (this.status == 200) {
					response = JSON.parse(this.response);
					if (response.status === "ok") {
						//location.reload();

						var success = "#success_modal";
						if ($(form).data('success')) {
							success = $(form).data('success');
						}
						$.fancybox.close()

						$.fancybox.open({
							src: success,
							type: 'inline',
							opts: {
								speed: 300,
								autoFocus: false,
								i18n: {
									'en': {
										CLOSE: 'Закрыть'
									}
								}
							}
						})

					} else {
						renderCaptcha(form);
						if (data.status === "error_captcha") {

							$(form).find(".g-recaptcha").append('<p class="error">Проверка не пройдена.</p>');
						}
						$(form).find(".required").addClass("error");
					}
				} else {
					console.log("error " + this.status);
				}
			};
			fd = new FormData(form[0]);
			xhr.open("POST", $(form).attr("action"), true);
			xhr.send(fd);

		}

		return false;
	});

	if ($('.icons_desc').length) {
		$(document).on("click", function() {
			$('.icons_desc .icon_item').removeClass('active')
		});
		$(".icon_item, .icon_item .close").on("click", function(event) {
			event.stopPropagation();
			$('.icons_desc .icon_item').removeClass('active')
			$(this).addClass('active');
		});
	}
});


function checkForm(form) {
	var valid = true;
	$(form).find(".error").removeClass("error");
	$(form).find(".error_text").remove();
	$.each($(form).find("input.required:visible:enabled,textarea.required:visible:enabled,input[type=checkbox].required"), function(i, required) {
		valid = checkInput(this)
	});
	return valid;
}

function checkInput(element) {
	valid = true;
	var input = $(element),
		parent = $(input).parent();
	if ($(input).attr("type") == "checkbox") {
		if (!$(input).is(":checked")) {
			$(parent).addClass("error").append('<div class="error_text">Это поле необходимо заполнить</div>');
			valid = false;
		} else {
			$(parent).removeClass("error");
			$(parent).find(".error_text").remove();
		}
	} else {
		if ($(input).val() === "") {
			$(parent).addClass("error").append('<div class="error_text">Это поле необходимо заполнить</div>');
			valid = false;
		} else {
			$(parent).removeClass("error");
			$(parent).find(".error_text").remove();
		}
	}
	return valid;
}

function plural(n, f) { n %= 100; if (n > 10 && n < 20) return f[2];
	n %= 10; return f[n > 1 && n < 5 ? 1 : n == 1 ? 0 : 2] }

function number_format(number, decimals, dec_point, thousands_sep) { // Format a number with grouped thousands
	//
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +	 bugfix by: Michael White (http://crestidg.com)

	var i, j, kw, kd, km;

	// input sanitation & defaults
	if (isNaN(decimals = Math.abs(decimals))) {
		decimals = 2;
	}
	if (dec_point == undefined) {
		dec_point = ",";
	}
	if (thousands_sep == undefined) {
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if ((j = i.length) > 3) {
		j = j % 3;
	} else {
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


	return km + kw + kd;
}