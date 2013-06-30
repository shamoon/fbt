// This extension essentially copied from https://github.com/zakj/Google-Reader-Background-Tabs.safariextension
// with minor modifications by michaelshamoon.com
// Safari extension whitelist wildcards are very limited. To work around the problem,
// we allow any domain in the extension whitelist, and check for feedly domain here.
if (document.location.host.indexOf('.feedly.') !== -1) {
    // Request the shortcut key setting from the global script; this injected
    // script lacks access to the extension settings object.
    var shortcutKey = 'v'.charCodeAt(0);
    safari.self.tab.dispatchMessage('getSettingValue', 'key');
    safari.self.addEventListener('message', function (event) {
        if (event.name === 'settingValueIs')
            shortcutKey = event.message.charCodeAt(0);
    }, false);

    document.addEventListener('keypress', function (event) {
        // Ignore keypresses on some common form elements.
        var tag = event.target.tagName;
        if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') {
            return;
        }

        // Catch the shortcut key, but ignore modified key presses.
        if (event.which === shortcutKey && !event.ctrlKey && !event.metaKey) {
            var currents = document.getElementsByClassName('selectedentry');
            var current = currents[0];
            if (!current) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            safari.self.tab.dispatchMessage('openBackgroundTab', current.getAttribute('data-alternate-link');
        }
    }, true);
}
