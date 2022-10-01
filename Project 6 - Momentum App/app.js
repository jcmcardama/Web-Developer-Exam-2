// User Story number 2 Creating a clock
function time(){
    let greetings = document.querySelector('#welcome-name');
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var amPm = 'AM';
    greetings.innerHTML = 'Good morning,&nbsp;';
    if(h > 12 && h < 18){
        amPm = 'PM';
        h = h - 12;
        greetings.innerHTML = 'Good afternoon,&nbsp;';
    }
    else if(h >= 18){
        amPm = 'PM';
        h = h - 12;
        greetings.innerHTML = 'Good evening,&nbsp;';
    }
    clockToday.innerHTML = ("0" + h).substr(-2) + '<div class="separator">:</div>' + ("0" + m).substr(-2) + ' ' + amPm;
}
time();
setInterval(time, 1000);

// User Story number 5 and 7 showing the quote of the day and adding a new quote
let quoteCtr = -1;
const quoteList = ['Never forget what you are. The rest of the world will not.', 'A mind needs books like a sword needs a whetstone.', 'There is only one thing we say to death: Not today.', 'Chaos isn’t a pit. Chaos is a ladder.'];
let addQuote = document.querySelector('#addQuoteList');
let addQuoteInput = document.querySelector('#quoteListInput');
addQuote.addEventListener('click', addQuoteToList);
function quote(){
    quoteCtr += 1;
    quoteToday.textContent = '"' + quoteList[quoteCtr % quoteList.length] + '"';
}
quote();
setInterval(quote, 10000);
function addQuoteToList(){
    if(addQuoteInput.value != ""){
        quoteList.push(addQuoteInput.value);
        addQuoteInput.value = "";
    }
}

// User Story number 6 creating the To-Do App
// Showing and hiding the Add To Do List input Field
let plus = document.querySelector('.fa-plus');
let inputToDolist = document.querySelector('.inputToDolist');
plus.onclick = function(){
    inputToDolist.classList.toggle('hide');
}

// Adding To Do List Item
let toDoList = document.getElementsByTagName('ul');
inputToDolist.addEventListener('keyup', function(e){
    if(e.keyCode === 13 && this.value != ""){
        var inputText = this.value;
        var newList = document.createElement("li");
        newList.innerHTML += ('<span> <i class="fa fa-trash"></i> </span> ' + inputText + '<i class="fa fa-check-square check"></i>');
        toDoList[0].append(newList);
        toggleButton(newList);
        removeButton(newList);
        this.value = "";
    }
});

//adding function to radio button if to do is done
function toggleButton(newList){
    let check = newList.querySelectorAll('.check');
    check[0].addEventListener('click', function(){
        check[0].classList.toggle('green');
        newList.classList.toggle('completed');
    });
}

//adding function to delete button to remove to do
function removeButton(newList){
    let remove = newList.getElementsByTagName('span');
    remove[0].addEventListener('click', function(){
        newList.parentNode.removeChild(newList);
    });
}

// Changing the theme from dark to light
document.querySelector(".btn").addEventListener("click", () => {
document.body.classList.toggle("dark");
if(document.body.classList.contains("dark")){
    document.querySelector(".btn").innerHTML = "Light";
} 
else{
    document.querySelector(".btn").innerHTML = "Dark";
}
});