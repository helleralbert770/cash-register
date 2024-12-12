
** start of undefined **

let price = 20;
let cid = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 3.1],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];
const total = document.getElementById("total-span");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cidTexts = document.querySelectorAll(".cid-text-span");
const changeDueText = document.getElementById("change-due-text");
const denominations = [100, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];


const updateCidTexts = () => {
  for (let i = 0; i < cidTexts.length; i++) {
    cidTexts[i].innerText = `$${cid[i][1].toFixed(2)}`;
  };
  total.textContent = `$${price.toFixed(2)}`;
};

const purchase = () => {
  const customerCash = parseFloat(cashInput.value);

  if (customerCash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (customerCash === price) {
    changeDueText.textContent = "No change due - customer paid with exact cash";
    return;
  }

  changeDueText.innerHTML = ``;

  let change = parseFloat((customerCash - price).toFixed(2));
  let fullCidSum = 0;
  let changeCidSum = 0;

  cid.forEach(cidEl => {
    fullCidSum += cidEl[1];
  });

  for (let i = 0; i < cid.length; i++) {
    if (denominations[i] <= change && cid[cid.length - i - 1][1] >= denominations[i]) {
      changeCidSum += cid[cid.length - i - 1][1];
    }
  }

  if (changeCidSum < change) {
    changeDueText.innerHTML = `Status: INSUFFICIENT_FUNDS`;
    return;
  } else if (fullCidSum === change) {
    changeDueText.innerHTML = `Status: CLOSED <br>`;
    giveChange(change);
    updateCidTexts();
    return;
  } else {
    changeDueText.innerHTML = `Status: OPEN <br>`;
    giveChange(change);
    updateCidTexts();
    return;
  }
}

const giveChange = (change) => {
  let result = [];

  for (let i = 0; i < denominations.length; i++) {
    let coinValue = denominations[i];
    let coinName = cid[cid.length - i - 1][0];
    let coinAmount = cid[cid.length - i - 1][1];

    if (coinValue <= change && coinAmount > 0) {
      let numCoins = Math.floor(change / coinValue);
      let coinsToGive = Math.min(numCoins, Math.floor(coinAmount / coinValue));

      if (coinsToGive > 0) {
        change -= coinsToGive * coinValue;
        change = parseFloat(change.toFixed(2));
        result.push([coinName, coinsToGive * coinValue]);
        cid[cid.length - i - 1][1] -= coinsToGive * coinValue;
      }
    }

    if (result.length) {
      result.forEach(r => {
        changeDueText.innerHTML += `${r[0]}: $${r[1].toFixed(2)} <br>`;
      });
    }
  }
}

updateCidTexts();
purchaseBtn.addEventListener("click", purchase);
cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    purchase();
  }
});


** end of undefined **

