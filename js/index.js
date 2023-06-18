var order = [];

function calculateSubCost() {
  var breadCost = parseFloat(document.querySelector('input[name="baseRadio"]:checked').value);

  var toppings = document.querySelectorAll('input[type="checkbox"]:checked');
  var toppingsCost = 0;
  for (var i = 0; i < toppings.length; i++) {
    toppingsCost += parseFloat(toppings[i].value);
  }

  var sauces = document.querySelectorAll('input[name="sauce"]:checked');
  var sauceCost = 0;
  for (var i = 0; i < sauces.length; i++) {
    sauceCost += parseFloat(sauces[i].value);
  }

  var subCost = breadCost + toppingsCost + sauceCost;

  document.getElementById("subCost").textContent = "R " + subCost.toFixed(2);
}

function addToOrder() {
  var subName = document.getElementById("subName").value;
  var subCost = parseFloat(document.getElementById("subCost").textContent.replace("R ", ""));

  // Retrieve the selected bread
  var base = document.querySelector('input[name="baseRadio"]:checked + label').textContent.trim();

  // Retrieve the selected toppings
  var toppings = [];
  var selectedToppings = document.querySelectorAll('input[type="checkbox"]:checked');
  selectedToppings.forEach(function(topping) {
    toppings.push(topping.nextElementSibling.textContent.trim());
  });

  // Retrieve the selected sauces
  var sauces = [];
  var selectedSauces = document.querySelectorAll('input[name="sauce"]:checked');
  selectedSauces.forEach(function(sauce) {
    sauces.push(sauce.nextElementSibling.textContent.trim());
  });
  

  // Create an object to represent the selected sub
  var sub = {
    subName: subName,
    baseRadio: base,
    toppings: toppings,
    sauce: sauces,
    subCost: subCost
  };

  // Add the sub to the order array
  order.push(sub);

  document.getElementById("subName").value = "";
  document.querySelector('input[name="baseRadio"]:checked').checked = false;

  var toppings = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < toppings.length; i++) {
    toppings[i].checked = false;
  }

  var sauces = document.querySelectorAll('input[name="sauce"]');
  for (var i = 0; i < sauces.length; i++) {
    sauces[i].checked = false;
  }

  document.getElementById("subCost").textContent = "R 0.00";

  // Update the "Current Order" value
  var orderTotal = document.getElementById("orderTotal");
  var currentTotal = parseFloat(orderTotal.textContent.replace("R", ""));
  currentTotal += subCost;
  orderTotal.textContent = "R" + currentTotal.toFixed(2);
}

displayOrder = () => {
  let area = document.getElementById("order");
  let total = document.getElementById("orderTotal");

  area.innerHTML = "";

  let subCost = 0;

  for (let i = 0; i < order.length; i++) {
    let name = order[i].subName;
    let base = order[i].baseRadio;
    let toppings = order[i].toppings.join(", ");
    let sauce = order[i].sauce.join(", ");
    let price = order[i].subCost;

    subCost += price;

    area.innerHTML += `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"><strong>Bread:</strong> ${base}</p>
          <p class="card-text"><strong>Toppings:</strong> ${toppings.join(", ")}</p>
          <p class="card-text"><strong>Sauce:</strong> ${sauce.join(", ")}</p>
          <p class="card-text"><strong>Cost:</strong> R${price.toFixed(2)}</p>
        </div>
      </div>`;
  }

  total.innerHTML = "R" + subCost.toFixed(2);
};

displaySelectedOptions = () => {
  let selectedOptions = document.getElementById("selectedOptions");
  selectedOptions.innerHTML = "";

  let toppings = document.getElementsByName("toppings");
  let sauces = document.getElementsByName("sauce");

  let selectedToppings = [];
  let selectedSauces = [];

  toppings.forEach((topping) => {
    if (topping.checked) {
      selectedToppings.push(topping.labels[0].textContent);
    }
  });

  sauces.forEach((sauce) => {
    if (sauce.checked) {
      selectedSauces.push(sauce.labels[0].textContent);
    }
  });

  if (selectedToppings.length > 0) {
    let toppingsHeader = document.createElement("h5");
    toppingsHeader.textContent = "Selected Toppings:";
    selectedOptions.appendChild(toppingsHeader);

    let toppingsList = document.createElement("ul");
    selectedToppings.forEach((topping) => {
      let toppingItem = document.createElement("li");
      toppingItem.textContent = topping;
      toppingsList.appendChild(toppingItem);
    });

    selectedOptions.appendChild(toppingsList);
  }

  if (selectedSauces.length > 0) {
    let saucesHeader = document.createElement("h5");
    saucesHeader.textContent = "Selected Sauces:";
    selectedOptions.appendChild(saucesHeader);

    let saucesList = document.createElement("ul");
    selectedSauces.forEach((sauce) => {
      let sauceItem = document.createElement("li");
      sauceItem.textContent = sauce;
      saucesList.appendChild(sauceItem);
    });

    selectedOptions.appendChild(saucesList);
  }
};



checkout = () => {
  let data = JSON.stringify(order);
  localStorage.setItem('order', data);
  window.location.href = '../pages/checkout.html';
}
