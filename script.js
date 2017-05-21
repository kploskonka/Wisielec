window.onload = titlescreen;
var passlist = ['Mądry Polak po szkodzie', 'Gość w dom, Bóg w dom', 'Na złodzieju czapka gore', 'Baba z wozu, koniom lżej', 'Czego Jaś się nie nauczy, tego Jan nie będzie umiał', 'Jak Cię widzą tak Cię piszą', 'Niedaleko pada jabłko od jabłoni', 'Kto mieczem wojuje, od miecza ginie', 'Kto pod kim dołki kopie, ten sam w nie wpada', 'Złej baletnicy przeszkadza rąbek u spódnicy', 'Komu w drogę, temu czas', 'Kto się czubi, ten się lubi', 'Cudze chwalicie, swego nie znacie', 'Nie rób drugiemu, co Tobie nie miłe', 'Trafiła kosa na kamień', 'Bez pracy nie ma kołaczy', 'Cicha woda brzegi rwie', 'Zapomniał wół, jak cielęciem był', 'Zamienił stryjek siekierkę na kijek', 'Po nitce do kłębka', 'Kto rano wstaje, temu Pan Bóg daje', 'Gdy kota nie ma, myszy harcują', 'Fortuna kołem się toczy', 'Co cię nie zabije, to cię wzmocni', 'Co dwie głowy, to nie jedna', 'Czuć się jak ryba w wodzie', 'Dla chcącego nic trudnego', 'Gdy się człowiek spieszy, to się diabeł cieszy', 'Gdyby kózka nie skakała, to by nóżki nie złamała', 'Gdzie dwóch się bije, tam trzeci korzysta', 'Im dalej w las, tym więcej drzew', 'Jak cię widzą, tak cię piszą', 'Jak Kuba Bogu, tak Bóg Kubie', 'Jak trwoga, to do Boga', 'Jedna jaskółka wiosny nie czyni', 'Każdy kij ma dwa końce', 'Kłamstwo ma krótkie nogi', 'Kombinuje jak koń pod górę', 'Kto daje i odbiera, ten się w piekle poniewiera', 'Lepszy rydz niż nic', 'Miłe złego początki', 'Myślał indyk o niedzieli, a w sobotę mu łeb ucięli', 'Nadzieja umiera ostatnia', 'Ni pies, ni wydra', 'Nie chwal dnia przed zachodem słońca', 'Nie ma róży bez kolców', 'Nie szata zdobi człowieka', 'Paluszek i główka to szkolna wymówka', 'Prawda w oczy kole', 'Przyganiał kocioł garnkowi, a sam smoli', 'Pieniądze szczęścia nie dają', 'Pod latarnią najciemniej', 'Porywać się z motyką na słońce', 'Raz na wozie, raz pod wozem', 'Stary, ale jary', 'Szczęśliwi czasu nie liczą', 'Szukać igły w stogu siana', 'Śpiesz się powoli', 'Tonący brzytwy się chwyta', 'Tu leży pies pogrzebany', 'Uderz w stół, a nożyce się odezwą', 'Wszystko, co dobre, szybko się kończy', 'Wyszło szydło z worka', 'Zapomniał wół, jak cielęciem był', 'Złego diabli nie biorą'];

var password = passlist[Math.floor((Math.random() * passlist.length) + 0)];
var password_hidden = "";
var error = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var letters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
password = password.toUpperCase();

/* ===================================== EKRAN TYTUŁOWY ===================================== */
function titlescreen() {
	document.getElementById("titlescreen").style.display = "block";
	document.getElementById("container").style.display = "none";
	document.getElementById("loader-wrapper").style.display = "none";
	return false;
}

/* ===================================== UKRYCIE HASLA ===================================== */
function password_hide() {
	for (var i = 0; i < password.length; i++) {
		if(password.charAt(i) == " ") {
			password_hidden = password_hidden + " ";
		} else if (password.charAt(i) == ",") {
			password_hidden = password_hidden + ",";
		} else {
			password_hidden = password_hidden + "_";
		}
	}
}
	function password_output() {
		document.getElementById("password").innerHTML = password_hidden;
	}
/* ===================================== START GRY ===================================== */
function start() {
	document.getElementById("titlescreen").style.display = "none";
	document.getElementById("container").style.display = "block";
	var value = "";
//Umieszczenie wszystkich liter alfabetu w divach 'letter' i nadanie im oddzielnego id
	for (var i = 0; i <= 34; i++) {
		var element = 'lit' + i;
		value = value + '<div class="letter" onclick="check('+ i +')" id="'+ element +'">'+ letters[i] +'</div>'
		if ((i + 1) % 7 == 0) {
			value = value + '<div style="clear:both;"></div>'; //Zmiana wiersza co 7 literę
		}
	}

	document.getElementById("alphabet").innerHTML = value;
	password_hide();	//Wykonanie funkcji ukrycia hasła
	password_output();
}
	
/* ===================================== ODKRYCIE LITER ===================================== */
String.prototype.letterShow = function(place, znak) {
	if (place > this.length - 1) {
		return this.toString();
	} else {
		return this.substr(0, place) + znak + this.substr(place + 1);
	}
}
/* ===================================== MECHANIZM GRY  ===================================== */
function check(n) {//n to 'numer' litery nadawany w petli w funkcji start()
	var correct = false; //Boolean majacy potwierdzac czy litera znajduje sie w hasle
	for (var i = 0; i < password.length; i++) {
		if (password.charAt(i) == letters[n]) { //Jezeli litera hasla jest rowna literze
			password_hidden = password_hidden.letterShow(i, letters[n]);
			correct = true;
		}
	}
	console.log(correct);
	if (correct == true) {
		yes.play();

		var element = 'lit' + n;

		document.getElementById(element).classList.add("correct");
		document.getElementById(element).setAttribute("onclick", ';');
		password_output();
		console.log(element);
	} else {
		no.play();

		var element = 'lit' + n;

		document.getElementById(element).classList.add("incorrect");
		document.getElementById(element).setAttribute("onclick", ';');
		error++;
		if (error < 9) {
			document.getElementById('board').innerHTML = '<img src="img/s' + error + '.jpg">';
		//PRZEGRANA
		} else if (error >= 9) {
			document.getElementById('restartbtn').style.display = "none";
			document.getElementById('password').innerHTML = password;
			document.getElementById('board').innerHTML = '<img src="img/s9.jpg">';
			document.getElementById('alphabet').innerHTML = '<h1 class="end">PRZEGRAŁEŚ!</h1><button class="endbtn" onclick="reset()">Jeszcze raz?</button><button class="endbtn backbtn" onclick="location.reload()">Powrót na stronę główną</button>';

		}
	}
	//WYGRANA
	if (password == password_hidden) {
		document.getElementById('restartbtn').style.display = "none";
		document.getElementById('alphabet').innerHTML = '<h1 class="end">BRAWO! PRAWIDŁOWE HASŁO!</h1><button class="endbtn" onclick="reset()">Jeszcze raz?</button><button class="endbtn backbtn" onclick="location.reload()">Powrót na stronę główną</button>';
	}
}
/* ===================================== RESET GRY  ===================================== */
function reset() {
	password = passlist[Math.floor((Math.random() * passlist.length) + 0)];
	password_hidden = "";
	error = 0;
	password = password.toUpperCase();
	document.getElementById('board').innerHTML = '<img src="img/s' + error + '.jpg">';
	start();
	document.getElementById('restartbtn').style.display = "inline-block";
}