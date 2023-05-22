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
  
    document.getElementById("subCost").textContent = "R 0";
    
    console.log(subName + " will cost you " + "R " + subCost)
  }
  