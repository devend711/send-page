/* U+200B below */
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */

var pageSender = {

  showSuccessMessage: function(message) {
    $("div#success").fadeTo('medium', 100).text(message).delay(800).fadeTo('medium', 0);
  },

    showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  sendEmailFunction: function (url, title){
    chrome.storage.sync.get('userEmail', function (result) {
      console.log(result.userEmail);
      if (result.userEmail==null) { // 'get' failed
          pageSender.showSuccessMessage('set your email!');
          return;
      } else {
        $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          'key': 'ZzTcuFPhdBA6ohwJUVR27A',
          'message': {
            'from_email': result.userEmail,
            'to': [
                {
                  'email': result.userEmail,
                  'name': 'the recipients name',
                  'type': 'to'
                }
              ],
            'autotext': 'true',
            'subject': 'You sent yourself a link! (' + title + ')',
            'html': '<a href="'+ url +'">You sent yourself a link!</a><br/>' + url
          }
        },
        success: function(result) {
          console.log('send succeeded :)');
          pageSender.showSuccessMessage('sent yourself the link!');
        },
        failure: function(result) {
          console.log('send failed :(');
        }
       }); // end of ajax call
      }
    });
  },

  makeEmail: function() { 
    console.log('starting email send');
    var tabUrl;
    chrome.tabs.getSelected(null, function(tab) {
      tabUrl = tab.url;
      tabTitle = tab.title;
      pageSender.sendEmailFunction(tabUrl, tabTitle);
    });
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
// document.addEventListener('DOMContentLoaded', function () {
//   pageSender.makeEmail();
// });

$(document).ready(function() {
  $("img#send-button").click(function() {
    pageSender.makeEmail();
  });
});
