//
//  SafariExtensionHandler.swift
//  Feedly Background Tabs Extension
//
//  Created by Michael Shamoon on 8/27/19.
//  Copyright © 2019 Michael Shamoon. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    let shortcutKeyConstant = "shortcutKey"
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        switch messageName {
        case "getSettings":
            let shortcutKey = getShortcutKey()
            page.dispatchMessageToScript(withName: "settings", userInfo: ["shortcutKey": shortcutKey])
        case "openFeedlyBackgroundTab" :
            if let url = URL(string: userInfo!["url"] as! String) {
                SFSafariApplication.getActiveWindow { (activeWindow) in
                    activeWindow?.openTab(with: url, makeActiveIfPossible: false)
                }
            }
        default:
            page.dispatchMessageToScript(withName: messageName, userInfo: nil)
        }
    }
    
    override func popoverWillShow(in window: SFSafariWindow) {
        let popoverViewController = self.popoverViewController() as! SafariExtensionViewController
        popoverViewController.shortcutKeyField.stringValue = getShortcutKey()
    }
    
    override func popoverDidClose(in window: SFSafariWindow) {
        let popoverViewController = self.popoverViewController() as! SafariExtensionViewController
        let newShortcutKey = popoverViewController.shortcutKeyField.stringValue
        setShortcutKey(key: newShortcutKey)
        window.getActiveTab { (activeTab) in
            activeTab?.getActivePage { (activePage) in
                activePage?.dispatchMessageToScript(withName: "settings", userInfo: ["shortcutKey": newShortcutKey])
            }
        }
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }
    
    func getShortcutKey() -> String {
        let defaults = UserDefaults.standard
        return defaults.string(forKey: shortcutKeyConstant) ?? "v"
    }
    
    func setShortcutKey(key: String) -> Void {
        let defaults = UserDefaults.standard
        defaults.set(key, forKey: shortcutKeyConstant)
    }
}
