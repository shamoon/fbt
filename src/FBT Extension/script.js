// This extension was initially inspired by https://github.com/zakj/Google-Reader-Background-Tabs.safariextension

var shortcutKey = 'v'.charCodeAt(0);
var debug = false;
safari.self.addEventListener('message', messageHandler);
safari.extension.dispatchMessage('getSettings');
if (debug) console.log('[feedly background tabs] debug enabled');

document.addEventListener('keypress', function(event) {
  if (debug) console.log('[feedly background tabs] keypress event');
  if (debug) console.log(event);
  // Ignore keypresses on some common form elements.
  var tag = event.target.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') {
     return;
  }

  // Catch the shortcut key, but ignore modified key presses.
  if (event.which === shortcutKey && !event.ctrlKey && !event.metaKey) {
     var currents = document.getElementsByClassName('inlineFrame--selected');
     if (debug) console.log('[feedly background tabs] currents found w/ "inlineFrame--selected": ');
     if (debug) console.log(currents);
     // if at first you do not succeed... cycle through Feedly's different current entry classes
     if (currents.length == 0) {
         currents = document.getElementsByClassName('selected inlineFrame');
         if (debug) console.log('[feedly background tabs] currents found w/ "selected inlineFrame": ');
         if (debug) console.log(currents);
     }
     if (currents.length == 0) {
        var currents = document.getElementsByClassName('selected entry');
        if (debug) console.log('[feedly background tabs] currents found w/ "selected entry": ');
        if (debug) console.log(currents);
     }
     if (currents.length == 0) {
        currents = document.getElementsByClassName('selectedEntry');
        if (debug) console.log('[feedly background tabs] currents found w/ "selectedEntry": ');
        if (debug) console.log(currents);
     }
     if (currents.length == 0) {
        currents = document.getElementsByClassName('u100Entry');
        if (debug) console.log('[feedly background tabs] currents found w/ "u100Entry": ');
        if (debug) console.log(currents);
     }
     var current = currents[0];
     if (debug) console.log('[feedly background tabs] current found:');
     if (debug) console.log(current);
     var url = '';
     if (!current.hasAttribute('data-alternate-link')) {
        var currentChild;
        var children = current.getElementsByTagName('*');
        for (var i = 0; i < children.length; i++) {
           currentChild = children[i];
           if (currentChild.hasAttribute('data-alternate-link')) {
              if (debug) console.log('[feedly background tabs] found url on child:');
              if (debug) console.log(currentChild);
              url = currentChild.getAttribute('data-alternate-link');
              break;
           }
        }
     } else {
        url = current.getAttribute('data-alternate-link');
     }
     if (debug) console.log('[feedly background tabs] url found: ' + url);
     if (!url || url == '') {
        return;
     }
     event.stopPropagation();
     event.preventDefault();
     safari.extension.dispatchMessage('openFeedlyBackgroundTab', { "url" : url });
  }
}, true);


function messageHandler(event) {
   if (debug) console.log('[feedly background tabs] ' + event);
    if (event.name === 'settings') {
        shortcutKey = event.message.shortcutKey.charCodeAt(0);
        if (debug) console.log('[feedly background tabs] shortcut key is ' + shortcutKey);
    }
}
