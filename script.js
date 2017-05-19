var password = "Bez pracy nie ma kołaczy";
var password_hidden = "";
var error = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
password = password.toUpperCase();


for (var i = 0; i < password.length; i++) {
	if(password.charAt(i) == " ") {
		password_hidden = password_hidden + " "
	} else {
		password_hidden = password_hidden + "-"
	}
}

function password_output() {
	document.getElementById("password").innerHTML = password_hidden;
}

window.onload = start;

var letters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];

function start() {
	var value = "";

	for (var i = 0; i <= 34; i++) {
		var element = 'lit' + i;
		value = value + '<div class="letter" onclick="check('+ i +')" id="'+ element +'">'+ letters[i] +'</div>'

		if ((i + 1) % 7 == 0) {
			value = value + '<div style="clear:both;"></div>';
		}
	}

	document.getElementById("alphabet").innerHTML = value;

	password_output();
}
//ODKRYCIE
String.prototype.ustawZnak = function(miejsce, znak) {
	if (miejsce > this.length -1) {
		return this.toString();
	} else {
		return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
	}
}

function check(n) {
	var trafiona = false;

	for (var i = 0; i < password.length; i++) {
		if (password.charAt(i) == letters[n]) {
			password_hidden = password_hidden.ustawZnak(i, letters[n]);
			trafiona = true;
		}
	}
	if (trafiona == true) {
		yes.play();

		var element = 'lit' + n;

		document.getElementById(element).classList.add("trafiona");
		document.getElementById(element).setAttribute("onclick", ';');
		password_output();
	} else {
		//SKUCHA
		no.play();

		var element = 'lit' + n;

		document.getElementById(element).classList.add("nietrafiona");
		document.getElementById(element).setAttribute("onclick", ';');
		error++;
		if (error < 9) {
			document.getElementById('board').innerHTML = '<img src="img/s' + error + '.jpg">';
		//PRZEGRANA
		} else if (error >= 9) {
			document.getElementById('board').innerHTML = '<img src="img/s9.jpg">';
			document.getElementById('alphabet').innerHTML = '<h1 class="end">PRZEGRAŁEŚ!</h1><button class="endbtn" onclick="location.reload()">Jeszcze raz?</button>';

		}
	}
	//WYGRANA
	if (password == password_hidden) {
		document.getElementById('alphabet').innerHTML = '<h1 class="end">BRAWO! PRAWIDŁOWE HASŁO!</h1><button class="endbtn" onclick="location.reload()">Jeszcze raz?</button>';
	}
}