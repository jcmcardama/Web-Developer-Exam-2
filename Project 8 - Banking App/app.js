let adminPassword = '1';
let admintEmail = 'admin';

//initialization
let userList = [];
userList = JSON.parse(localStorage.getItem("users")) || [];
let manageAccountIndex = 0;
let createAccountForm = document.querySelector("#createAccountForm");
let depositMoneyForm = document.querySelector("#depositMoneyForm");
let withdrawMoneyForm = document.querySelector("#withdrawMoneyForm");
let transferMoneyForm = document.querySelector("#transferMoneyForm");
let expenseMoneyForm = document.querySelector("#expenseMoneyForm");
let amountsSubtract = [];
//creating a user class
var User = function(name, email, password, balance = 0){
  this.name = name;
  this.email = email;
  this.password = password;
  this.balance = balance;
  this.transactionHistory = [];
}

//finding user with either email or name
function findUser(detail){
  for(let i = 0; i < userList.length; i++){
    if(detail.toUpperCase() === userList[i].name.toUpperCase()){
      return i;
    }
    else if(detail === userList[i].email){
      return i;
    }
  }
  return 'User not found';
}

//login for the homepage
document.querySelector(".loginButton").onclick = function(){
  let emailChecker = document.querySelector(".inputEmail");
  let passwordChecker = document.querySelector(".inputPassword");
  
  if(emailChecker.value === admintEmail && passwordChecker.value === adminPassword){
    document.querySelector(".loginPage").classList.toggle("remove");
    document.querySelector(".homePage").classList.toggle("remove");
    document.querySelector("#logOutButton").classList.toggle("remove");
    listUsers(userList);
  }
  else if(!isNaN(findUser(emailChecker.value))){
    if(emailChecker.value === userList[findUser(emailChecker.value)].email && passwordChecker.value === userList[findUser(emailChecker.value)].password){
      document.querySelector(".loginPage").classList.toggle("remove");
      document.querySelector(".manageAccount").classList.toggle("remove");
      document.querySelector("#logOutButton").classList.toggle("remove");
      document.querySelector(".welcomeUserName").textContent = `Welcome ${userList[findUser(emailChecker.value)].name}!`;
      document.querySelector(".balanceUser").textContent = `Php ${userList[findUser(emailChecker.value)].balance}`;
      manageAccountIndex = findUser(emailChecker.value);
      loadTransactionHistory(userList[manageAccountIndex].transactionHistory);
      let expenseHistory = document.querySelector(".expenseHistory");
      expenseHistory.innerHTML = "";
    }
    else{
      alert("Please enter the correct email and password");
    }
  }
  else{
    alert("Please enter a valid email");
  }
}

//logout button
document.querySelector("#logOutButton").onclick = function(){
  let emailChecker = document.querySelector(".inputEmail");
  let passwordChecker = document.querySelector(".inputPassword");

  emailChecker.value = "";
  passwordChecker.value = "";
  amountsSubtract = [];

  document.querySelector(".loginPage").classList.toggle("remove");
  document.querySelector(".homePage").classList.add("remove");
  document.querySelector(".manageAccount").classList.add("remove");
  document.querySelector("#logOutButton").classList.toggle("remove");
}

//function that will list all users
function listUsers(userList){
  let userLists = document.querySelector("#userList");
  
  //reset UL
  while(userLists.firstChild){
    userLists.removeChild(userLists.firstChild);
  }
  //print UL
  for(let i = 0; i < userList.length; i++){
    var userItem = document.createElement("li");
    userItem.innerHTML += (`<span><i class="fa-solid fa-bars-progress"></i></span> Name: ${userList[i].name} Balance: Php ${userList[i].balance}`);
    userLists.append(userItem);
  }
  manageButton(userLists);
}

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var closeBTN = document.getElementsByClassName("close");
// When the user clicks on (x), close the modal
for(let i = 0; i < closeBTN.length; i++){
  closeBTN[i].onclick = function() {
    modal.style.display = "none";
  }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event){
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//clicking sign up and open the modal
document.querySelector("#signUpButton").onclick = function(){
  document.querySelector(".newBalance-container").classList.add("remove");
  modal.style.display = "block";
  createAccountForm.classList.remove("remove");
  depositMoneyForm.classList.add("remove");
  withdrawMoneyForm.classList.add("remove");
  transferMoneyForm.classList.add("remove");
  expenseMoneyForm.classList.add("remove");
}

//clicking Add Account and open the modal
document.querySelector(".addNewAccount").onclick = function(){
  document.querySelector(".newBalance").classList.remove("remove");
  modal.style.display = "block";
  createAccountForm.classList.remove("remove");
  depositMoneyForm.classList.add("remove");
  withdrawMoneyForm.classList.add("remove");
  transferMoneyForm.classList.add("remove");
  expenseMoneyForm.classList.add("remove");
}

//clicking Deposit Button and open the modal
document.querySelector("#depositButton").onclick = function(){
  modal.style.display = "block";
  createAccountForm.classList.add("remove");
  depositMoneyForm.classList.remove("remove");
  withdrawMoneyForm.classList.add("remove");
  transferMoneyForm.classList.add("remove");
  expenseMoneyForm.classList.add("remove");
}

//clicking Withdraw Button and open the modal
document.querySelector("#withdrawButton").onclick = function(){
  modal.style.display = "block";
  createAccountForm.classList.add("remove");
  depositMoneyForm.classList.add("remove");
  withdrawMoneyForm.classList.remove("remove");
  transferMoneyForm.classList.add("remove");
  expenseMoneyForm.classList.add("remove");
}

//clicking Transfer Button and open the modal
document.querySelector("#transferButton").onclick = function(){
  modal.style.display = "block";
  createAccountForm.classList.add("remove");
  depositMoneyForm.classList.add("remove");
  withdrawMoneyForm.classList.add("remove");
  transferMoneyForm.classList.remove("remove");
  expenseMoneyForm.classList.add("remove");
}

//clicking Expense Button and open the modal
document.querySelector("#expenseButton").onclick = function(){
  modal.style.display = "block";
  createAccountForm.classList.add("remove");
  depositMoneyForm.classList.add("remove");
  withdrawMoneyForm.classList.add("remove");
  transferMoneyForm.classList.add("remove");
  expenseMoneyForm.classList.remove("remove");
}

//creating new Accounts
document.querySelector("#submitNewAccountButton").onclick = function(){
  let newName = document.querySelector(".newName");
  let newEmail = document.querySelector(".newEmail");
  let newPassword = document.querySelector(".newPassword");
  let newBalance = document.querySelector(".newBalance");

  //if user sign up instead of admin creating account setting balance to 0
  if(isNaN(parseInt(newBalance.value))){
    newBalance.value = 0;
  }
  
  //error checking for inputs in creating a account
  if(!isNaN(newName.value[0])){
    alert("Please enter a valid name");
    newName.value = "";
  }
  else if(newEmail.value.indexOf('@') === -1){
    alert("Please enter a valid email");
    newEmail.value = "";
  }
  else if(!isNaN(findUser(newName.value))){
    alert("User already exist please enter a new name");
    newName.value = "";
  }
  else if(!isNaN(findUser(newEmail.value))){
    alert("User already exist please enter a new email");
    newEmail.value = "";
  }
  else{
    userList.push(new User(newName.value, newEmail.value, newPassword.value, parseInt(newBalance.value)));
    localStorage.setItem("users", JSON.stringify(userList));
    newName.value = "";
    newEmail.value = "";
    newPassword.value = "";
    newBalance.value = "";
    modal.style.display = "none";
    listUsers(userList);
  }
}

//clicking the manage button and going to manage section
function manageButton(userLists){
  let manage = userLists.getElementsByTagName('span');
  for(let i = 0; i < manage.length; i++){
    manage[i].addEventListener('click', function(){
      document.querySelector(".homePage").classList.toggle("remove");
      document.querySelector(".manageAccount").classList.toggle("remove");
      let expenseHistory = document.querySelector(".expenseHistory");
      expenseHistory.innerHTML = "";
      document.querySelector(".welcomeUserName").textContent = `Welcome ${userList[i].name}!`;
      document.querySelector(".balanceUser").textContent = `Php ${userList[i].balance}`;
      manageAccountIndex = i;
      loadTransactionHistory(userList[manageAccountIndex].transactionHistory);
    });
  }
}

//loading transaction history
function loadTransactionHistory(userList){
  let transactionHistory = document.querySelector(".transactionHistory");
  transactionHistory.textContent = "";
  for(let i = 0; i < userList.length; i++){
    transactionHistory.innerHTML += '</br>';
    transactionHistory.innerHTML += userList[i];
  }
  amountToBeSubtract();
  localStorage.setItem("users", JSON.stringify(userList));
}

//performing deposit
document.querySelector("#submitDepositMoneyButton").onclick = function(){
  let amountDeposit = document.querySelector(".amountDeposit");
  let accountPassword = document.querySelector(".accountPasswordDeposit");
  
  if((accountPassword.value === userList[manageAccountIndex].password || accountPassword.value === adminPassword) && parseInt(amountDeposit.value) > 0){
    userList[manageAccountIndex].balance = userList[manageAccountIndex].balance + parseInt(amountDeposit.value);
    document.querySelector(".balanceUser").textContent = `Php ${userList[manageAccountIndex].balance}`;
    userList[manageAccountIndex].transactionHistory.push(`Deposit Php ${amountDeposit.value}`);
    loadTransactionHistory(userList[manageAccountIndex].transactionHistory);
    amountDeposit.value = "";
    accountPassword.value = "";
    modal.style.display = "none";
  }
  else if(parseInt(amountDeposit.value) < 0){
    alert("Please enter valid amount");
  }
  else{
    alert("Please enter correct password");
  }
}

//performing withdraw
document.querySelector("#submitWithdrawMoneyButton").onclick = function(){
  let amountWithdraw = document.querySelector(".amountWithdraw");
  let accountPassword = document.querySelector(".accountPasswordWithdraw");
  
  if((accountPassword.value === userList[manageAccountIndex].password || accountPassword.value === adminPassword) && userList[manageAccountIndex].balance >= parseInt(amountWithdraw.value) && parseInt(amountWithdraw.value) > 0){
    userList[manageAccountIndex].balance = userList[manageAccountIndex].balance - parseInt(amountWithdraw.value);
    document.querySelector(".balanceUser").textContent = `Php ${userList[manageAccountIndex].balance}`;
    userList[manageAccountIndex].transactionHistory.push(`Withdraw Php ${amountWithdraw.value}`);
    loadTransactionHistory(userList[manageAccountIndex].transactionHistory);
    amountWithdraw.value = "";
    accountPassword.value = "";
    modal.style.display = "none";
  }
  else if(userList[manageAccountIndex].balance < parseInt(amountWithdraw.value)){
    alert("Insufficient Balance");
  }
  else if(parseInt(amountWithdraw.value) < 0){
    alert("Please enter valid amount");
  }
  else{
    alert("Please enter correct password");
  }
}

//performing transfer
document.querySelector("#submitTransferMoneyButton").onclick = function(){
  let nameTransfer = document.querySelector(".nameTransfer");
  let amountTransfer = document.querySelector(".amountTransfer");
  let accountPassword = document.querySelector(".accountPasswordTransfer");
  let findName = findUser(nameTransfer.value);
  
  if((accountPassword.value === userList[manageAccountIndex].password || accountPassword.value === adminPassword) && userList[manageAccountIndex].balance >= parseInt(amountTransfer.value) && findName != 'User not found' && parseInt(amountTransfer.value) > 0){
    userList[manageAccountIndex].balance = userList[manageAccountIndex].balance - parseInt(amountTransfer.value);
    userList[findName].balance = userList[findName].balance + parseInt(amountTransfer.value);
    document.querySelector(".balanceUser").textContent = `Php ${userList[manageAccountIndex].balance}`;
    userList[manageAccountIndex].transactionHistory.push(`Transfer Php ${amountTransfer.value} to ${userList[findName].name}`);
    userList[findName].transactionHistory.push(`Receive Php ${amountTransfer.value} from ${userList[manageAccountIndex].name}`);
    loadTransactionHistory(userList[manageAccountIndex].transactionHistory);
    nameTransfer.value = "";
    amountTransfer.value = "";
    accountPassword.value = "";
    modal.style.display = "none";
  }
  else if(userList[manageAccountIndex].balance < parseInt(amountTransfer.value)){
    alert("Insufficient Balance");
  }
  else if(findName === 'User not found'){
    alert("User not found");
  }
  else if(parseInt(amountTransfer.value) < 0){
    alert("Please enter valid amount");
  }
  else{
    alert("Please enter correct password");
  }
}

//using Budget App
document.querySelector("#submitExpenseMoneyButton").onclick = function(){
  let amountItem = document.querySelector(".amountItem");
  let expenseItem = document.querySelector(".expenseItem");
  let expenseHistory = document.querySelector(".expenseHistory");
  let expenseItemLi = document.createElement("li");
  
  amountsSubtract.push(parseInt(amountItem.value));
  
  expenseItemLi.classList.add("expenseItemLi");

  expenseItemLi.innerHTML += `<span class="expenseItemTrash"><i class="fa-solid fa-trash-can"></i></span> ${expenseItem.value}: Php ${amountItem.value}`;
  expenseHistory.append(expenseItemLi);
  removeItem(expenseItemLi);
  amountToBeSubtract();
  
  amountItem.value = "";
  expenseItem.value = "";
  modal.style.display = "none";
}

//Deleting items in the Budget App
function removeItem(expenseItemLi){
  let remove = expenseItemLi.getElementsByTagName("span");
  let properIndex = expenseItemLi.textContent.indexOf("Php") + 4;
  let amountToBeRemove = "";
  remove[0].addEventListener('click', function(){
    for(let i = 0; i < expenseItemLi.textContent.length; i++){
      amountToBeRemove += expenseItemLi.textContent[i + properIndex];
    }
    
    amountsSubtract.splice(amountsSubtract.indexOf(parseInt(amountToBeRemove)), 1);
    
    amountToBeSubtract();

    expenseItemLi.parentNode.removeChild(expenseItemLi);
  });
}

//updating the balance if budget app is used
function amountToBeSubtract(){
  let amountSubtract = 0;
  for(let i = 0; i < amountsSubtract.length; i++){
    amountSubtract += amountsSubtract[i];
  }
  document.querySelector(".balanceUser").textContent = `Php ${userList[manageAccountIndex].balance - amountSubtract}`;
}