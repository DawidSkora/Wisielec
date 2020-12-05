var passwords = new Array(15); //max liczba haseł jednej kategorii
var password = "";
var password1 = "";
var passwordNumber;
var passwordLength = 0;
var misshit = 0;
var sound = true;
var passwordCategory = "";
var points = 0;
var games = 0;

var yes = new Audio("audio/yes.wav");
var no = new Audio("audio/no.wav");
var alphabet = ["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ż","Ź"];

function writeAlphabet()    //wypisanie alfabetu
{
    var letterElement = "";

    for (let i = 0; i < 35; i++) 
    {
        var element = "let" + i;
        letterElement += '<div class="letter" id="' + element + '" onclick="onClick(' + i + ')">' + alphabet[i] + "</div>";
        if((i+1)%7 == 0) letterElement += '<div style="clear:both;"></div>';
    }

    document.getElementById("alphabet").innerHTML = letterElement;

    writePassword();    //przekierowanie do wypisania hasła
}

function setPasswordCategory(category)      //wylosowanie hasła z wcześniej wybranej kategorii
{
    resetTimer();
    password = "";
    password1 = "";
    misshit = 0;
    document.getElementById("gallows").innerHTML = "<img src=\"img/s0.jpg\"/>";
    document.getElementById("points").innerHTML = "Punkty: "+points+"/"+games;
    games++;
    firstHit = true;    //zmienna oznaczająca pierwsze wybranie litery w rundzie

    if(category == "movie")
    {
        passwordCategory = "movie";
        passwords[0] = "przemineło z wiatrem";
        passwords[1] = "wilk z wallstreet";
        passwords[2] = "iniemamocni";
        passwords[3] = "gladiator";
        passwords[4] = "barbie i diamentowy pałac"; 
        passwords[5] = "pulp fiction";
        passwords[6] = "interstellar";
        passwords[7] = "asterix i obelix misja kleopatra";
        passwords[8] = "anioły i demony";
        passwords[9] = "gwiezdne wojny"; 
        passwords[10] = "mamma mia";
        passwords[11] = "wielki gatsby";
        passwords[12] = "ogniem i mieczem";
        passwords[13] = "kogiel mogiel";
        passwords[14] = "taksówkarz"; 
    }
    else if(category == 'animals')
    {
        passwordCategory = "animals";
        passwords[0] = "bóbr";
        passwords[1] = "antylopa";
        passwords[2] = "salamandra";
        passwords[3] = "koczkodan";
        passwords[4] = "małpka kapucynka"; 
        passwords[5] = "koza";
        passwords[6] = "koliber";
        passwords[7] = "diabeł tasmański";
        passwords[8] = "papuga ara";
        passwords[9] = "ropucha"; 
        passwords[10] = "koziorożec";
        passwords[11] = "delfin";
        passwords[12] = "szympans";
        passwords[13] = "mucha owocówka";
        passwords[14] = "dzięcioł"; 
    }   
    else if(category == 'netflix')
    {
        passwordCategory = "netflix";
        passwords[0] = "sex education";
        passwords[1] = "dom z papieru";
        passwords[2] = "trincets";
        passwords[3] = "picky blinders";
        passwords[4] = "orange is the new black"; 
        passwords[5] = "midnight gospel";
        passwords[6] = "paradise pd";
        passwords[7] = "szkoła dla elity";
        passwords[8] = "witcher";
        passwords[9] = "uwięziona"; 
        passwords[10] = "chłopaki z baraków";
        passwords[11] = "goog girls";
        passwords[12] = "lucyfer";
        passwords[13] = "big mouth";
        passwords[14] = "the umbrella academy"; 
    }

    passwordNumber = Math.floor(Math.random() * passwords.length);      //wylosowanie hasła
    password = passwords[passwordNumber];
    password = password.toUpperCase();
    passwordLength = password.length;


    writeAlphabet();        //wypisanie alfabetu
}

function chosePasswordCategory()    //wypisanie menu kategorii i wybranie jednej z nich
{
    document.getElementById("board").innerHTML = "";
    var movie = "<li onclick=\"setPasswordCategory('movie')\">-film<li>";
    var animals = "<li onclick=\"setPasswordCategory('animals')\">-zwierzeta<li>";
    var netflix = "<li onclick=\"setPasswordCategory('netflix')\">-seriale Netflix<li>";
    var message = 'Wybierz kategorie: </br></br> <ul class="category">'+movie+animals+netflix+'</ul>';
    document.getElementById("alphabet").innerHTML = message;
}

window.onload = chosePasswordCategory;  //załadowanie wyboru kategorii

function writePassword()    //wypisanie hasłą
{
    for (let i = 0; i < passwordLength; i++) 
    {
        if(password.charAt(i)==" ") password1 += " ";
        else password1 += "-";
    }

    document.getElementById("board").innerHTML = password1;
}

function rewritePassword()  //odświerzenie hasła 
{
    document.getElementById("board").innerHTML = password1;
}

String.prototype.setChar = function(location, char) //metoda zmieniająca hasło po wybraniu litery
{
    if(location > this.length-1) return this.toString();
    else return this.substr(0, location) + char + this.substr(location+1);
}

var firstHit = true;

function onClick(nr)    //funkcja po wybraniu litery
{
    if(firstHit == true)
    {
        setTimer();
        if(clockStatus == true) runTimer();
        firstHit = false;    
    }

    var charhit = false;
    for (let i = 0; i < passwordLength; i++) 
    {
        if(password.charAt(i) == alphabet[nr])
        {
           password1 = password1.setChar(i,alphabet[nr]); 
           charhit = true;
        }  
    }

    if(charhit==true)   //wybrana poprawna litera
    {
        if(sound == true) yes.play();
        var element = "let" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#3bcc62";
        document.getElementById(element).style.border = "3px solid #3bcc62";
        document.getElementById(element).style.cursor = "defout";
        document.getElementById(element).setAttribute("onclick",";")
        rewritePassword();
    }
    else        //wybrana błędna litera
    {
        if(sound == true) no.play();
        var element = "let" + nr;
        document.getElementById(element).style.background = "#520000";
        document.getElementById(element).style.color = "#cc1f1f";
        document.getElementById(element).style.border = "3px solid #cc1f1f";
        document.getElementById(element).style.cursor = "#defout";
        document.getElementById(element).setAttribute("onclick",";")

        misshit++;
        var picname = "img/s" + misshit + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="'+picname+'"/>';
    }

    if(password1 == password)   //wygranko
    {
        points++;
        document.getElementById("alphabet").innerHTML = 'Tak jest! Podano prawidłowe hasło! </br></br><span class=\"reset\" onclick="setPasswordCategory(\''+passwordCategory+'\')">JESZCZE RAZ?</span>';
        resetTimer();
    }

    if(misshit >= 9)        //przegranko
    {
        document.getElementById("alphabet").innerHTML = '</br></br>Przegrałeś :( Prawidłowe hasło:</br></br>'+password+'</br></br><span class=\"reset\" onclick="setPasswordCategory(\''+passwordCategory+'\')">JESZCZE RAZ?</span>';
        resetTimer();
    }

}

function soundStatus() //wł lub wył dźwięk po kliknięciu w ikonke
{
    if(sound == true) 
    {
        sound = false;
        document.getElementById("sound").innerHTML = '<i class="icon-volume-off"></i>';
    }
    else 
    {
        sound = true;
        document.getElementById("sound").innerHTML = '<i class="icon-volume-down"></i>';
    }
}

function reloadGame()   //przeładowanie hasła pozostając w bieżącej kategorii
{
    setPasswordCategory(passwordCategory);
}

var clockStatus = false;
var clockStatusMain = false;

function changeClockStatus()    //sprawdzenie czy ikona jest kliknięta
{
    if(clockStatusMain == false) 
    {
        clockStatusMain = true;
        document.getElementById("timerStatus").innerHTML = "Czas: włączony";
    }
    else 
    {
        clockStatusMain = false;
        document.getElementById("timerStatus").innerHTML = "Czas: wyłączony";
    }
}

function setTimer()     //ustawienie zmiennej clockStatus na true jeśli zaczynamy rundę i klikneliśmy ikone
{
    if(firstHit == true && clockStatusMain == true)
    {
        clockStatus = true;
    }
    else if(firstHit == false && clockStatusMain == false)
        clockStatus = false;
}


var timeInSec = 30;
var timeLeft = timeInSec;
var timer1;


function runTimer() //odliczanie czasu pod warunkiem clockStatus = true
{
    if(clockStatus == true)
    {
        clearTimeout(timer1);
        document.getElementById("timer").innerHTML = '<i class="icon-clock" title="Pozostały czas"></i> '+timeLeft+"s";
        timeLeft--;
        if(timeLeft < 0) //jeśli czas < 0 to zatrzymaj timer i zakończ runde
        {
            clearTimeout(timer1);
            resetTimer();
            document.getElementById("timer").innerHTML = '<i class="icon-clock" title="Pozostały czas"></i> --s';
            document.getElementById("alphabet").innerHTML = '</br></br>Czas minął :( Prawidłowe hasło:</br></br>'+password+'</br></br><span class=\"reset\" onclick="setPasswordCategory(\''+passwordCategory+'\')">JESZCZE RAZ?</span>';
        }
        timer1 = setTimeout("runTimer()",1000);     
    }   
}

function resetTimer()
{
    clockStatus = false;
    timeLeft = timeInSec;
    document.getElementById("timer").innerHTML = '<i class="icon-clock" title="Pozostały czas"></i> --s';
}