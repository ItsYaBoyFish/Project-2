// console.log("hello");

const shoppingLink = $('#link-shopping');
shoppingLink.attr('href', `/api/recip/${sessionStorage.getItem('lipin-userID')}`);


if (sessionStorage.getItem('lipin-userID') === null) {
  console.log(`Session Storage empty`);
  location.href = `http://${location.host}/`
}

$(document).on('click', '.functionality-showGifts', function() {
  var id = $(this).attr('data-recipient-id');
  var name = $(this).attr('data-recipient-name');
  sessionStorage.setItem('lipin-recipient-name', name);
  sessionStorage.setItem('lipin-recipID', id);
  location.href = `http://${location.host}/api/gifts/${id}`
  // console.log(`Show Gifts Button Clicked, ID: ${id}`);
  // axios.get(`/api/gifts/${id}`).then(function(response) {
  //   // console.log(response.data);
  //   location.href = `http://${location.host}/api/gifts/${id}`
  // }).catch(err => console.log(err));
});

$(document).on('click', '.functionality-delete', function() {
  var id = $(this).attr('data-recipient-id');
  console.log(`Delete Button Clicked, ID: ${id}`);
  axios.delete(`/api/recip/${id}`).then(function(response) {
    console.log(response);
    location.reload();
  })
});

$(document).on('click', '.logOut-Button', function() {
  console.log(`Log Out Button Pressed.`);
  sessionStorage.clear();
});

// Modal Listener

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
  const newRecipient = $('#new-recip-name');
  const userId = sessionStorage.getItem('lipin-userID');
  // console.log(newRecipient.val());
  // console.log('Submit Button Pressed On The Modal');

  // Hit the create route to create the new recipient. 
  var data = {
    name: newRecipient.val(),
    userId: userId
  }

  // console.log(data);

  axios.post('/api/recip', data).then(function(response) {
    console.log(response);
    location.reload();
    console.log('After the reload');
  })
})
