const app = {
  count: 0,
  cash: 0,
  rate: 0,
  producers: [
    {
      name: "Hire Worker",
      cost: 25,
      rate: 1,
      count: 0,
    },
    {
      name: "Get Extra Cow",
      cost: 40,
      rate: 2,
      count: 0,
    },
    {
      name: "Acquire Farm",
      cost: 150,
      rate: 10,
      count: 0,
    },
    {
      name: "Be Milk CEO",
      cost: 1000,
      rate: 100,
      count: 0,
    },
    {
      name: "Own Cow Planet",
      cost: 50000,
      rate: 1000,
      count: 0,
    },
    {
      name: "Rule Milkverse",
      cost: 1000000,
      rate: 10000,
      count: 0,
    },
  ],
};

const cow = document.querySelector("#cow");
const bottleCounter = document.querySelector("#bottle-counter");
const cashCounter = document.querySelector("#cash-counter");
const sellMilk = document.querySelector("#sell-milk");
const cashContainer = document.querySelector("#cash-container");
const menuList = cashContainer.children[1];
const producerContainer = document.querySelector("#producer-container");

console.log(app.cash);

cow.addEventListener("click", () => {
  app.count += 1;
  const totalProfit = app.count * 0.5;
  bottleCounter.textContent = app.count;

  const span = sellMilk.children[0];
  span.textContent = `+$${totalProfit.toFixed(2)}`;

  if (app.count > 0) {
    sellMilk.style.display = "block";
  }
});

sellMilk.addEventListener("click", () => {
  app.cash += app.count * 0.5;
  app.count = 0;
  bottleCounter.textContent = app.count;

  if (app.count === 0) {
    sellMilk.style.display = "none";
  }

  cashCounter.textContent = `$${app.cash.toFixed(2)}`;
  updateProducersDisplay();
});

Array.from(menuList.children).forEach((child, i) => {
  child.children[0].addEventListener("click", () => {
    if (app.cash >= app.producers[i].cost) {
      app.cash -= app.producers[i].cost;
      app.rate += app.producers[i].rate;
      app.producers[i].count += 1;

      cashCounter.textContent = `$${app.cash.toFixed(2)}`;
      producerContainer.children[i].children[0].textContent =
        app.producers[i].count;

      producerContainer.children[i].children[1].textContent = `+${app.producers[
        i
      ].rate.toLocaleString()} bottles/sec`;

      producerContainer.children[i].style.display = "flex";

      updateProducersDisplay();
    }
  });
});

function updateProducersDisplay() {
  for (let i = 0; i < app.producers.length; i++) {
    if (app.cash >= app.producers[i].cost) {
      cashContainer.children[1].children[i].style.display = "block";
    } else {
      cashContainer.children[1].children[i].style.display = "none";
    }
  }
}

setInterval(() => {
  app.count += app.rate;
  bottleCounter.textContent = app.count;

  if (app.count > 0) {
    sellMilk.style.display = "block";
    const totalProfit = app.count * 0.5;
    const span = sellMilk.children[0];
    span.textContent = `+$${totalProfit.toFixed(2)}`;
  } else {
    sellMilk.style.display = "none";
  }
}, 1000);
