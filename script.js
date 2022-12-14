'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Apple',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Banana',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Cat',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Dog',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//displaying movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //slice to get new array since sort will mutate the original/database array.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    }. ${type}</div>
    <div class="movements__value">Rs. ${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

//displaying balance
const displayBalance = function (movs) {
  labelBalance.textContent = movs.reduce((a, c) => a + c, 0);
};
// const displayBalance = function (movements) {
//   // labelBalance.textContent = 123;
//   let bal = 0;
//   movements.forEach(function (mov, i) {
//     bal += mov;
//   });
//   labelBalance.textContent = 'Rs. ' + bal;
// };
//displayBalance(account2.movements);

//displaying summary
const displaySummary = function (account) {
  const deposits = account.movements
    .filter(mov => mov > 0)
    .reduce((a, c) => a + c, 0);
  const withdrawals = account.movements
    .filter(mov => mov < 0)
    .reduce((a, c) => a + c, 0);
  labelSumIn.textContent = 'Rs. ' + deposits;
  labelSumOut.textContent = 'Rs. ' + Math.abs(withdrawals);
  const interests = movements
    .filter(mov => mov > 0)
    .reduce((a, c) => a + (c * account.interestRate) / 100, 0);
  labelSumInterest.textContent = `Rs. ${interests}`;
  // let movIn = 0,
  //   movOut = 0;
  // movements.forEach(function (mov, i) {
  //   mov > 0 ? (movIn += mov) : (movOut += mov);
  // });
  // labelSumIn.textContent = 'Rs. ' + movIn;
  // labelSumOut.textContent = 'Rs. ' + Math.abs(movOut);
};
//displaySummary(account1.movements);
const a = [1, 2, 3, 4, 5];
// let b = [];
// b = a.map((c, i) => (i === 0 ? c : c + a.));
//[1,3,6]
// console.log(b);

//computing username
const usersName = function (users) {
  users.forEach(function (user) {
    user.userName = user.owner
      .toLowerCase()
      .split(' ')
      .map(c => c.slice(0, 1)) //c=>c[0]
      .join('');
  });
  // const userName=user.map((c)=>c.owner);
  // const spc = user.indexOf(' ');
  // const userName = users.map(currentUser =>
  //   currentUser.owner
  //     .toLowerCase()
  //     .split(' ')
  //     .map(c => c.slice(0, 1)) //c=>c[0]
  //     .join('')
  // );
  // return userName;
};
usersName(accounts);
// console.log(accounts);
// const ab = 'abc';
// console.log(ab.indexOf('b'));

//implementing login

// const loginCheck = function () {
//   const user = inputLoginUsername.value;
//   const passwd = inputLoginPin.value;
//   // if (account1.userName === user) console.log('hy');
//   const loggedinUser = accounts.find(
//     acc => acc.userName === user && acc.pin === passwd
//   );
//   console.log(loggedinUser);
//   //if (loggedinUser) containerApp.classList.remove('opacity');
// };
//displayUI
const displayUserCurrentInfo = function (user) {
  displayBalance(user.movements);
  //display summary
  displaySummary(user);
  //display movements
  displayMovements(user.movements);
};
const clearFields = function () {
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputLoanAmount.value = '';
  // inputCloseUsername.value = '';
  // inputClosePin.value = '';
};
//implementing login
let loggedinUser = '';
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  loggedinUser = accounts.find(
    acc =>
      acc?.userName === inputLoginUsername.value &&
      acc?.pin === Number(inputLoginPin.value)
  );
  //display UI and welcome message
  if (loggedinUser) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back ${
      loggedinUser.owner.split(' ')[0]
    }!`;
  }
  //clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  //displayUI
  displayUserCurrentInfo(loggedinUser);
  clearFields();
  //display balance
  //displayBalance(loggedinUser.movements);
  //display summary
  //displaySummary(loggedinUser);
  //display movements
  //displayMovements(loggedinUser.movements);
  console.log(loggedinUser);
});

//implementing transfer function

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const transferAmt = Number(inputTransferAmount.value);
  const currentBal = loggedinUser.movements.reduce((a, c) => a + c, 0);

  //transfer if 1. current bal>transferAmt  2. receiver!=transferer
  //3. receiver should have account
  //after transfer 1. deduct amount/withdraw in sender
  //2. add/deposit in receiver.
  const receiver = accounts.find(acc => acc.userName === transferTo);
  if (
    transferAmt > 0 &&
    receiver &&
    currentBal > transferAmt &&
    loggedinUser.userName !== transferTo
  ) {
    loggedinUser.movements.push(-transferAmt);
    console.log(loggedinUser);
    receiver.movements.push(transferAmt);
    displayUserCurrentInfo(loggedinUser);
  }
  clearFields();
});

//transfer money functionality
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && loggedinUser.movements.some(mov => mov >= amount * 0.1)) {
    //add to movements
    loggedinUser.movements.push(amount);

    //update UI
    displayUserCurrentInfo(loggedinUser);
  }
  clearFields();
});

//closing account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //inputCloseUsername.value = inputClosePin.value = '';
  const closingUser = inputCloseUsername.value;
  const closingPin = Number(inputClosePin.value);
  console.log(closingPin, closingUser);
  if (
    closingUser === loggedinUser.userName &&
    closingPin === loggedinUser.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === loggedinUser.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    // console.log(loggedinUser);
    // for (let i = 0; i < accounts.length; i++) {
    //   if (accounts[i].userName === loggedinUser.userName) {
    //     //const deleteUserIndex = accounts.findIndex(accounts[i]);
    //     accounts.splice(i, i + 1);
    //     containerApp.style.opacity = 0;
    //     console.log(accounts);
    //   }
    // }
  } else console.log('incorrect psw or username');
  clearFields();
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

//sorting with display movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(loggedinUser.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;
const newm = [];
/*
//movements.reduce((a, c, i) => (newm[i] = a + c), 0);
// console.log(movements.splice(1));
//challenge 1.
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaShallow = dogsJulia;

  dogsJuliaShallow.splice(0, 1);
  dogsJuliaShallow.splice(-2);
  console.log(dogsJuliaShallow);
  const newDogs = [...dogsJuliaShallow, ...dogsKate];
  newDogs.forEach((age, i) =>
    console.log(
      `Dog number ${i + 1} is ${age >= 3 ? 'an adult' : 'still a puppy'}.`
    )
  );
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const calcAverageHumanAge = function (ages) {
  const dogsAgesInHuman = ages.map(a => (a <= 2 ? 2 * a : 16 + a * 4));
  const adultAges = dogsAgesInHuman.filter(a => a >= 18);
  return adultAges.reduce((a, c) => a + c, 0) / adultAges.length;
};
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// console.log(movements.reduce((a, c, i) => (a < c ? c : a), movements[0]));
// console.log(newm);
// movements.reduce
//map
// console.log(movements.map(c => c * euroToUsd));

//filter - condition false, then filtered out
//-returns true or false, if true mov will be filtered in else it will be filtered out
// console.log(2 > 1);
//if mov is greater than 0(true) keep it else(false) remove from array, resulting new filtered array
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawals);
/////////////////////////////////////////////////
*/
