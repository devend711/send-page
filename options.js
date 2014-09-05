// Saves options to chrome.storage
function save_options() {
  var email = $("input#email").val
  chrome.storage.sync.set({
    userEmail: email
  }, function() {
    // Update status to let user know options were saved.
    $("div#status").fadeIn(200).text("Options saved!").delay(400).fadeOut(400);
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
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);