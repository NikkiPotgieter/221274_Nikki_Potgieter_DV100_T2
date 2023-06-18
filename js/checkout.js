function loadOrderDetails() {
  // Retrieve the order details from local storage or any other data source
  var orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  if (orderDetails) {
    var orderDetailsContainer = document.getElementById("orderDetails");
    orderDetailsContainer.innerHTML = "";

    for (var i = 0; i < orderDetails.length; i++) {
      var subName = orderDetails[i].subName;
      var subCost = orderDetails[i].subCost;

      var subElement = document.createElement("div");
      subElement.textContent = subName + " - R" + subCost.toFixed(2);

      orderDetailsContainer.appendChild(subElement);
    }
  }
}

function applyCoupon() {
  var couponCode = document.getElementById("couponCode").value;
  var finalAmountElement = document.getElementById("finalAmount");
  var finalAmount = parseFloat(finalAmountElement.textContent.replace("R", ""));

  if (couponCode === "12345") {
    // Apply 10% discount
    var discount = finalAmount * 0.1;
    finalAmount -= discount;
  }

  finalAmountElement.textContent = "R" + finalAmount.toFixed(2);
 
}

window.addEventListener("load", function() {
  loadOrderDetails();
});

displayCheck = () => {
  let data = JSON.parse(localStorage.getItem('order'));
  let items = document.getElementById('orderDetails');
  let totalArea = document.getElementById('finalAmount');

  let final = 0;

  for (let i = 0; i < data.length; i++) {
      let name = data[i].subName;
      let base = data[i].baseRadio;
      let toppings = data[i].toppings;
      let sauce = data[i].sauce;
      let price = data[i].subCost;

      totalArea.innerHTML = "R" + final + ".00";

      items.innerHTML += `
          <div class="orderDetails">
              <h5 class="card-title">${name}</h5>
              <p class="card-text"><strong>Bread:</strong> ${base}</p>
              <p class="card-text"><strong>Toppings:</strong> ${toppings}</p>
              <p class="card-text"><strong>Sauce:</strong> ${sauce}</p>
              <p class="card-text"><strong>Cost:</strong> R${price}.00</p>
          </div>`

      final += price; // Accumulate the total cost
  }

  totalArea.innerHTML = "R" + final + ".00"; // Display the total cost
}

resetReturn = () => {
  localStorage.removeItem('order');
  window.location.href = '../index.html';
}