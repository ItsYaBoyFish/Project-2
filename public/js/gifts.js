// console.log("hello");

const shoppingLink = $('#link-shopping');
shoppingLink.attr('href', `/api/recip/${sessionStorage.getItem('lipin-userID')}`);

if (sessionStorage.getItem('lipin-recipID') === null) {
  console.log(`Session Storage empty`);
  location.href = `http://${location.host}/`
}

const recipNamePlaceHolder = $('#recip-name');
recipNamePlaceHolder.text(`Gifts For: ${sessionStorage.getItem('lipin-recipient-name')}`); 

$(document).on('click', '.functionality-update', function() {
  console.log('button pressed');
  var id = $(this).attr('data-gift-id');
  axios.put(`/api/gifts/${id}`).then(function(response) {
    console.log(response);
    location.reload();
  });
});

$(document).on('click', '.functionality-delete', function() {
  var id = $(this).attr('data-gift-id');
  axios.delete(`/api/gifts/${id}`).then(function(response) {
    console.log(response);
    location.reload();
  })
  // console.log(`Delete Button Clicked, ID: ${id}`);
});

$(document).on('click', '.logOut-Button', function() {
  console.log(`Log Out Button Pressed.`);
  sessionStorage.clear();
});

// Modal Listeners
$(document).on('click', '#modal-show', function() {
  const modal = $('.modal');
  modal.addClass('is-active');
  console.log('Button Pressed');
});

$(document).on('click', '.close-modal', function() {
  const modal = $('.modal');
  modal.removeClass('is-active');
})

$(document).on('click', '#submit-modal', function() {
  const newItem = $('#new-item-name');
  

  // console.log(newRecipient.val());
  // console.log('Submit Button Pressed On The Modal');

  // Hit the create route to create the new recipient. 
  var data = {
    gift_name: newItem.val(),
    recipientID: sessionStorage.getItem('lipin-recipID'),
  }

  console.log(data);
  axios.post('/api/gifts', data).then(function(response) {
    console.log(response);

    // If all works appropriately, Reload the page. 
    location.reload();
  });

  // axios.post('/createNewRecip', data).then(function(response) {
  //   console.log(response);
  //   }).catch(err => console.log(err)); 
})
