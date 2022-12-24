$(document).ready(function() {
	USER_IS_AUTO = true;

	// Кнопка в хэдере "Аккаунт"
	$(".account_btn").on("click", function(){
		// Если пользователь не авторизован
		if (is_user_auto()) {
			// Показываем аккаунт
			$(".account_stage").toggleClass("hidden_item");
			console.log("show account_stage");
		} else {
			$(".sidebar_stage").toggleClass("hidden_item");
		}
	});

	// Кнопка "перейти к регистрации"
	$("#login_form .to_registration").on("click", function(){
		$(".autorize_stage").toggleClass("hidden_item");
		$(".registration_stage").toggleClass("hidden_item");
	});

	// Кнопка "отмена ставки" в сайдбаре
	$(".bet_events .cancel_icon").on("click", cancel_icon_handler);


	// Кнопка "Сделать ставку"
	$(".make_bet_form button").on("click", function(){
		bet_events = $(".bet_events").children();
		amount_of_kfs = 1
		for (var i = bet_events.length - 1; i >= 0; i--) {
			kf_div = $(bet_events[i]).find(".bet_info_kf")[0];
			event_type_div = $(bet_events[i]).find(".event_type")[0];
			match_title_div = $(bet_events[i]).find(".bet_info_title")[0];

			match_title = $(match_title_div).text().split(" ")[1];
			event_type = $(event_type_div).text().split(" ")[1];
			kf = $(kf_div).text().split(" ")[1];

			amount_of_kfs *= kf;
		}
		console.log(Math.round(amount_of_kfs * 100) / 100);
	});

	// Кнопка "Регистрация"
	$(".registration_stage button").on("click", function(){
		form_inps = $(".registration_stage input");
		console.log(form_inps);
	});

	// Кнопка "Вход"
	$(".autorize_stage button").on("click", function(){
		form_inps = $(".autorize_stage input");
		login = form_inps[0].value.trim();;
		password = form_inps[1].value.trim();;
		if (validate_login_and_password(login, password)) {
			console.log("Autorizetion success");
			$(".autorize_stage").toggleClass("hidden_item");
			$(".make_bet_stage").toggleClass("hidden_item");
		}
	});

	// Клик по коэффиценту в bet_card
	$(".kf_bet_card").on("click", function(){
		bet_card_div = $(this).parent().parent()[0];
		
		kf = $(this).find(".kf_p").text();
		date = $(bet_card_div).find(".match_main_time")[0].innerText;
		match_id = bet_card_div.getAttribute('match_id');
		match_title = bet_card_div.getAttribute('match_title');
		bet_type = $(this).parent().context.classList[1];

		// Если пользователь авторизован
		if (is_user_auto() & check_valide_express(match_title)){
			add_bet_event(kf, date, bet_type, match_title);
			if ($(".sidebar_stage").hasClass("hidden_item")) {
				$(".sidebar_stage").toggleClass("hidden_item");
				if ($(".make_bet_stage").hasClass("hidden_item")) {
					$(".make_bet_stage").toggleClass("hidden_item");
				}
			}
			update_possible_award();
		}
	});
	$(".kf_td").on("click", kf_item_handler);

	$(".bet_amount_inp").on("input", function() {
		// Убираем не числовые знаки
		$(this).val($(this).val().replaceAll(/\D*/g, ""));	
		// Обновляем "возможный выигрышь"
		kf = get_common_kf_in_bet_stage(); // Получаем общий кф из выбранных игроком ставок
		$(".possible_award_count").text(Math.round($(this).val() * kf * 100) / 100);
	});

	add_completed_match("Реал М. - Барселона", "13:30", "4 - 3", "1 - 2", "3 - 1");
	add_completed_match("Лестер - Челси", "17:00", "1 - 1", "0 - 0", "1 - 1");
	add_completed_match("Ювентус - Болонья", "16:00", "1 - 3", "1 - 2", "0 - 1");
	add_completed_match("Леганес - Мальорка", "19:30", "2 - 3", "1 - 0", "1 - 3", ".second_day");
	add_completed_match("Зенит - Сочи", "17:00", "0 - 4", "0 - 2", "0 - 2", ".second_day");
	add_completed_match("Атлетико - Севилья", "15:00", "0 - 0", "0 - 0", "0 - 0", ".second_day");

	add_future_match("Лестер - Челси", "21:30", 3.7, 3.1, 1.7, 1.4, 1.9, 2.25, 1.65);
	add_future_match("ЦСКА - Спартак", "22:30", 1.1, 3.1, 6.8, 1.2, 1.4, 3.4, 2.35);
	add_future_match("Арсенал - Тотенхэм", "23:30", 1.5, 3.1, 4.2, 1.34, 1.78, 3.33, 2.6, ".second_day");
});

function add_completed_match(match_title, match_time, all_time_result, first_time_res, second_time_res, tableClass=".first_day"){
	var match_wrapper = $("<tr>");
	match_wrapper.append($("<td>", {
		class:"match_title_td",
		text:match_title,
	}).append($("<span>", {class:"match_time",text:match_time}))).append($("<td>", {
		text:all_time_result
	})).append($("<td>", {
		text:first_time_res
	})).append($("<td>", {
		text:second_time_res
	}));
	$(".completed_matches "+tableClass).append(match_wrapper);
}


function add_future_match(match_title, match_time, P1, X, P2, TB2, TB3, TM2, TM3, tableClass=".first_day"){
	var match_wrapper = $("<tr>");
	match_wrapper.append($("<td>", {
		class:"match_title_td"
	}).append($("<span>", {class:"match_title_span",text:match_title}))
	  .append($("<span>", {class:"match_time",text:match_time}))).append($("<td>", {
		class:"kf_td P1",
		text:P1
	})).append($("<td>", {
		class:"kf_td X",
		text:X
	})).append($("<td>", {
		class:"kf_td P2",
		text:P2
	})).append($("<td>", {
		class:"kf_td TB2",
		text:TB2
	})).append($("<td>", {
		class:"kf_td TB3",
		text:TB3
	})).append($("<td>", {
		class:"kf_td TM2",
		text:TM2
	})).append($("<td>", {
		class:"kf_td TM3",
		text:TM3
	}));
	$($(match_wrapper).find(".kf_td")).on("click", kf_item_handler);
	$(".future_match_stage "+tableClass).append(match_wrapper);
};

function kf_item_handler() {
	kf = $(this).text();
	bet_element = $(this).parent()[0];
	match_title = $(bet_element).find(".match_title_span").text();
	date_day = $($(this).parent().parent()[0]).find(".match_day").text().split(" ")[1];
	date_time = $(bet_element).find(".match_time").text();
	date = date_day +" "+ date_time;
	bet_type = $(this).attr('class').split(" ")[1];

	// Если пользователь авторизован
	if (is_user_auto() & check_valide_express(match_title)){
		add_bet_event(kf, date, bet_type, match_title);
		if ($(".sidebar_stage").hasClass("hidden_item")) {
			$(".sidebar_stage").toggleClass("hidden_item");
			if ($(".make_bet_stage").hasClass("hidden_item")) {
				$(".make_bet_stage").toggleClass("hidden_item");
			}
		}
		update_possible_award();
	}
};
function update_possible_award() {
	// Обновляем "возможный выигрышь", если сумма ставки установлена
	if ($(".possible_award_count").text() > 0) {
		kf = get_common_kf_in_bet_stage();
		new_award = Math.round($(".bet_amount_inp").val() * kf * 100) / 100;
		$(".possible_award_count").text(new_award);
	}
};
function is_user_auto(){
	return !$(".username").hasClass("hidden_item");
};
function get_common_kf_in_bet_stage() {
	common_kf = 1;
	bet_list = $(".bet_events").children();
	for (var i = bet_list.length - 1; i >= 0; i--) {
		kf_each_item = $(bet_list[i]).find(".bet_info_kf").text().split(" ")[1];
		common_kf *= parseFloat(kf_each_item);
	}
	common_kf = parseInt(common_kf * 100) / 100;
	return common_kf;
};
function add_bet_event(kf, date, event_type, match_title) {
	var bet_info_wrapper = $("<div>", {class:"bet_info_wrapper"});
	bet_info_wrapper.append($("<div>", {
		class:"bet_info_title",
		text:match_title,
	})).append($("<div>", {
		class:"bet_info_date",
		text:date
	})).append($("<div>", {
		class:"event_type",
		text:"Ставка: " + event_type
	})).append($("<div>", {
		class:"bet_info_kf",
		text:"KF: " + kf,
	}));
	var cancel_icon = $("<img>", {src:"icons/cancel.png", class:"cancel_icon"});
	$(cancel_icon).on("click", cancel_icon_handler);

   	var bet_event = $("<div>", {
	   	class: "bet_event"
	});
	bet_event.append(bet_info_wrapper).append(cancel_icon);
	$(".bet_events").append(bet_event);
};
function cancel_icon_handler() {
	$(this).parents()[0].remove();
	if($(".bet_events").children().length == 0) {
		$(".make_bet_stage").toggleClass("hidden_item");
		$(".sidebar_stage").toggleClass("hidden_item");
	}
	update_possible_award();
};
function validate_login_and_password(login, password) {
	if (login.length < 5 || login.length > 35) {
		alert("Uncorrect length of login");
		return false;
	}else if (password.length < 6 || password.length > 35) {
		alert("Uncorrect length of password");
		return false;
	} else {
		alert("login: " + login + "\nPassword: "+password);
		return true;
	}
};
function check_valide_express(new_match_title="empty"){
	choosedMatchList = $(".bet_events").children();
	for (var i = 0; i < choosedMatchList.length; i++) {
		// Если новый матч уже есть в экспрессе
		if($(choosedMatchList[i]).find(".bet_info_title").text() == new_match_title){
			return false;
		};
	}
	return true;
};