// This extension was initially inspired by https://github.com/zakj/Google-Reader-Background-Tabs.safariextension

var shortcutKey = 'v';
var debug = false;
safari.self.addEventListener('message', messageHandler);
safari.extension.dispatchMessage('getSettings');
if (debug) console.log('[feedly background tabs] debug enabled');

window.addEventListener('keydown', function(event) {
  if (debug) console.log('[feedly background tabs] keydown event');
  if (debug) console.log(event);
  // Ignore keydowns on some common form elements.
  var tag = event.target.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') {
     return;
  }

  // Catch the shortcut key, but ignore modified key presses.
  if (event.key == shortcutKey && !event.ctrlKey && !event.metaKey) {
      var currentArticle;
      var articles = document.getElementsByClassName('u100Entry');
      if (debug) console.log('[feedly background tabs] articles found w/ "u100Entry": ');
      if (debug) console.log(articles);
      for (var i = 0; i < articles.length; i++) {
          article = articles[i];
          var rect = article.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
              // partially visible, but keep going to find last one
              currentArticle = article;
          }
     }
      
     var url = '';
      if (currentArticle) {
         if (debug) console.log('[feedly background tabs] current article:');
         if (debug) console.log(currentArticle);
         if (!currentArticle.hasAttribute('data-alternate-link')) {
            var currentChild;
            // try anchors
            var children = currentArticle.getElementsByTagName('a');
            for (var i = 0; i < children.length; i++) {
                currentChild = children[i];
                if (currentChild.classList.contains("entryTitle") || currentChild.classList.contains("Article__title--read")) {
                    if (debug) console.log('[feedly background tabs] found url on anchor:');
                    if (debug) console.log(currentChild);
                    url = currentChild.getAttribute('href');
                }
            }
            // look for child data-alternate-link
            if (!url) {
                 children = currentArticle.getElementsByTagName('*');
                 for (var i = 0; i < children.length; i++) {
                    currentChild = children[i];
                    if (currentChild.hasAttribute('data-alternate-link')) {
                       if (debug) console.log('[feedly background tabs] found url on child:');
                       if (debug) console.log(currentChild);
                       url = currentChild.getAttribute('data-alternate-link');
                       break;
                    }
                 }
             }
         } else {
            url = currentArticle.getAttribute('data-alternate-link');
         }
         if (debug) console.log('[feedly background tabs] url found: ' + url);
         if (!url || url == '') {
            return;
         }
         event.stopPropagation();
         event.stopImmediatePropagation();
         event.preventDefault();
         safari.extension.dispatchMessage('openFeedlyBackgroundTab', { "url" : url });
      }
  }
}, true);


function messageHandler(event) {
    console.log(event)
   if (debug) console.log('[feedly background tabs] ' + event);
    if (event.name === 'settings') {
        shortcutKey = event.message.shortcutKey;
        if (debug) console.log('[feedly background tabs] shortcut key is ' + shortcutKey);
    }
}
