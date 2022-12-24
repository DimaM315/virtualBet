$(document).ready(function() {
	// Клик по кнопке "Расчитанные ставки"
	$(".bet_history_header .completed_bets_btn").on("click", function() {
		if (!$(this).hasClass("btn_header_active")){
			apply_toggleClass([".uncompleted_bets_btn", ".completed_bets_btn"], "btn_header_active")
			apply_toggleClass([".history_uncompleted_bet", ".history_completed_bet"], "hidden_item")
		}
		
	});
	
	// Клик по кнопке "Не расчитанные ставки"
	$(".bet_history_header .uncompleted_bets_btn").on("click", function() {
		if (!$(this).hasClass("btn_header_active")){
			apply_toggleClass([".uncompleted_bets_btn", ".completed_bets_btn"], "btn_header_active")
			apply_toggleClass([".history_uncompleted_bet", ".history_completed_bet"], "hidden_item")
		}
	});

	// Клик по кнопке "Параметры аккаунта"
	$(".account_stage_header .btn_params").on("click", function(){
		if (!$(this).hasClass("btn_header_active")){
			apply_toggleClass([".account_stage_header .btn_params", ".account_stage_header .btn_history"], 
			"btn_header_active")
			apply_toggleClass([".data_stage", ".user_bet_history"], "hidden_item")
		}
	});
	// Клик по кнопке "История ставок"
	$(".account_stage_header .btn_history").on("click", function(){
		if (!$(this).hasClass("btn_header_active")){
			apply_toggleClass([".account_stage_header .btn_params", ".account_stage_header .btn_history"], 
			"btn_header_active")
			apply_toggleClass([".data_stage", ".user_bet_history"], "hidden_item")
		}
	});

	add_completed_bet(1.2, "13/12/22 14:00", "TB1", "Болонья - Лечче", 400, "(1-2)", "win");
	add_completed_bet(1.75, "19/12/22 18:00", "TB3", "Бавария - Ман.Сити", 500, "(1-1)", "lose");

	add_uncompleted_bet(1.39, "11/12/22 15:30", "P1", "Барселона - Леванте", 200);
	add_uncompleted_bet(1.75, "19/12/22 18:00", "TB3", "Бавария - Ман.Сити", 500);

	show_user_params();
});

function apply_toggleClass(classList, withClassName) {
	for (var i = 0; i < classList.length; i++) {
		$(classList[i]).toggleClass(withClassName);
	}
};

function add_uncompleted_bet(kf, date, event_type, match_title, amount) {
	var bet_wrapper = $("<tr>");
	bet_wrapper.append($("<td>", {
		text:match_title,
	})).append($("<td>", {
		text:date
	})).append($("<td>", {
		text:event_type
	})).append($("<td>", {
		text:kf,
	})).append($("<td>", {
		text:amount,
	}));
	$(".history_uncompleted_bet table").append(bet_wrapper);
};

function add_completed_bet(kf, date, event_type, match_title, amount, match_result, bet_result) {
	var bet_wrapper = $("<tr>");
	bet_wrapper.append($("<td>", {
		text:match_title+" "+match_result,
	})).append($("<td>", {
		text:date
	})).append($("<td>", {
		text:event_type
	})).append($("<td>", {
		text:kf,
	})).append($("<td>", {
		text:amount,
	}));
	if (bet_result == "win") {
		bet_wrapper.append($("<td>", {
			class: "bet_win_ceil",
			text:"Выигрыш "+ (kf*amount)
		}));
	} else {
		bet_wrapper.append($("<td>", {
			class: "bet_lose_ceil",
			text:"Проигрыш"
		}));
	}
   $(".history_completed_bet table").append(bet_wrapper);
};
function show_user_params(){
	user_balance = 2000;
	most_largest_kf = 6.8;
	successed_bet = 6;
	all_bet = 17;

	$(".account_stage .data_wrapper").append($("<p>", {
		text: "Имя пользователя: Dima Malyk"
	})).append($("<p>", {
		text: "Баланс: " + user_balance
	})).append($("<p>", {
		text: "Статистика ставок пользователя: " + successed_bet + "/" + all_bet
	})).append($("<p>", {
		text: "Самый большой выигрышный кф: " + most_largest_kf
	}));
};