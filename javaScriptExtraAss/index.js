function generateOrderSummary() {
    var glovesQuantity = document.getElementById("gloves").value;
    var hatsQuantity = document.getElementById("hats").value;
    var scarfsQuantity = document.getElementById("scarfs").value;
    var customerName = document.getElementById("name").value;
    var customerEmail = document.getElementById("email").value;
    var curDate = new Date();
    var currentDateTimeString = curDate.toLocaleString();
    var orderSummary = "Order made by: " + customerName + " " + customerEmail + " " + curDate + "\n";
    orderSummary += "Gloves Quantity: " + glovesQuantity + "\n";
    orderSummary += "Hats Quantity: " + hatsQuantity + "\n";
    orderSummary += "Scarfs Quantity: " + scarfsQuantity + "\n";
    document.getElementById("message").value = orderSummary;
}
