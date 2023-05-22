function loadOrderDetails() {
    // Retrieve the order details from local storage or any other data source
    var orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  
    if (orderDetails) {
      var orderDetailsContainer = document.getElementById("orderDetails");
      orderDetailsContainer.innerHTML = ""; // Clear existing order details
  
      for (var i = 0; i < orderDetails.length; i++) {
        var subName = orderDetails[i].subName;
        var subCost = orderDetails[i].subCost;
  
        var subElement = document.createElement("div");
        subElement.textContent = subName + " - $" + subCost.toFixed(2);
  
        orderDetailsContainer.appendChild(subElement);
      }
    }
  }
  
  function applyCoupon() {
    var couponCode = document.getElementById("couponCode").value;
    // Apply the coupon logic and update the final amount
  }
  
  window.addEventListener("load", function() {
    loadOrderDetails();
  });
  