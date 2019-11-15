var id = sessionStorage.getItem('lipin-recipID');


axios.get(`/api/giftsPurchased/${id}`).then(
  function(res) {
  var data = res.data;
  var purchasedArray = [];
  data.map(function(item) {
    purchasedArray.push(item.purchased);
  });

  var amountPurchased = 0;

  for(var i = 0; i < purchasedArray.length; ++i){
    if(purchasedArray[i] == true){
      amountPurchased++; 
    }
  }

  var amountNotPurchased = (purchasedArray.length - amountPurchased);
  
  console.log("Purchased: " + amountPurchased)
  console.log("Not Purchased: " + amountNotPurchased)
  
  var labels = [
    "Purchased",
    "Not Purchased",
  ];
  var data = [
    amountPurchased,
    amountNotPurchased,
  ];
  
  var pie = document.getElementById("pieChart").getContext('2d');
  var myChart = new Chart(pie, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [
            {
                data: data,
                borderColor: ["#2ef12e", "#ff4b2b"],
                backgroundColor: ["#2ef12e", "#ff4b2b"],
            }
        ]
    },
    options: {
        title: {
          display: false,
          text: "Amount Purchased",
        },
        events: ['click'],
        legend: {
          display: false,
        }
    },
  })
});
