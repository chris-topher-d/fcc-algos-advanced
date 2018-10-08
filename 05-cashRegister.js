function checkCashRegister(price, cash, cid) {
  let values = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100,
  };

  let cidTotal = cid.reduce((acc, next) => acc + next[1], 0).toFixed(2);
  let cidRemaining = cid.slice();
  var difference = cash - price;
  let output = cid.slice().reduce((acc, next) => {
    acc[next[0]] = 0;
    return acc;
  }, {});

  if (cash - price == cidTotal) {
    return {status: "CLOSED", change: [...cid]};
  } else if (cash - price > cidTotal) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else {
    for (let i = cidRemaining.length - 1; i >= 0; i--) {
      difference = Math.round(100 * difference)/100;
      if (cidRemaining[i][0] === "PENNY" && cidRemaining[i][1] === 0 && difference > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
      } else if (values[cidRemaining[i][0]] > difference || cidRemaining[i][1] === 0) {
        continue;
      } else if (difference > 0){
        output[cidRemaining[i][0]] += Number(values[cidRemaining[i][0]].toFixed(2));
        cidRemaining[i][1] -= values[cidRemaining[i][0]].toFixed(2);
        difference -= values[cidRemaining[i][0]].toFixed(2);
        i = cidRemaining.length - 1;
      }
    }
  }

  return {
    status: "OPEN",
    change: Object.entries(output).reverse().filter(item => item[1] !== 0)
  }
}

let output = checkCashRegister(
  3.26,
  100,
  [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]
);

console.log(output);
