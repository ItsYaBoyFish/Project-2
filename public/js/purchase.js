$(function() {
  $(".purchase").on("click", function(event) {
    console.log("this item is now purchased")
    var giftID = $(this).data("giftID");
    var isPurchased = $(this).data("isPurchased");

    var newPurchaseState = {
      purchased: isPurchased
    };

    $.ajax("api/gifts/" + giftID, {
      type: "PUT",
      data: newPurchaseState
    }).then(
      function() {
        console.log(giftID + "has been purchased", isPurchased);
        location.reload();
      }
    );
  });
});

