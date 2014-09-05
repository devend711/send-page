// Saves options to chrome.storage
function save_options() {
  var email = $("input#email").val();
  chrome.storage.sync.set({
    'userEmail': email
  }, function() {
    // Update status to let user know options were saved.
    console.log('saving');
    $('img#save').attr("src","icons/checkmark-circled.png")
      .delay(200)
      .fadeTo('medium', 50)
      .delay(200)
      .queue(function(next){ $(this).attr("src","icons/checkmark-round.png"); next();})
      .fadeTo('medium', 100);
    // $("div#status").fadeTo('medium', 100).text('options saved!').delay(800).fadeTo('medium', 0);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    email: 'enter your email here!'
  }, function(items) {
    $("input#email").val = items.userEmail;
  });
}
// document.addEventListener('DOMContentLoaded', restore_options);
$("img#save").click(function() {
  save_options();
});


$(document).ready(function() {
  chrome.storage.sync.get('userEmail', function (result) {
    $("input#email").attr("value", result.userEmail);
  });
});