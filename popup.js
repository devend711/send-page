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

  showSuccess: function() {
    $("div#success").text('emailed the link!');
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

  sendEmailFunction: function (url){
    chrome.storage.local.get('userEmail', function (result) {
      $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'ZzTcuFPhdBA6ohwJUVR27A',
        'message': {
          'from_email': 'devend711@gmail.com',
          'to': [
              {
                'email': result.userEmail,
                'name': 'the recipients name',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'You sent yourself a link! (' + url + ')',
          'html': '<a href="'+ url +'">You sent yourself a link!</a><br/>' + url
        }
      },
      success: function(result) {
        console.log('send succeeded!');
      },
      failure: function(result) {
        console.log('send failed!');
      }
     });
    });
  },

  makeEmail: function() { 
    console.log('starting email send');
    var tabUrl;
    chrome.tabs.getSelected(null, function(tab) {
      tabUrl = tab.url;
      console.log(tabUrl);
      pageSender.sendEmailFunction(tabUrl);
      pageSender.showSuccess();
    });
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  pageSender.makeEmail();
});
