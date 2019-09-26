//
//  ViewController.swift
//  Feedly Background Tabs
//
//  Created by Michael Shamoon on 8/27/19.
//  Copyright © 2019 Michael Shamoon. All rights reserved.
//

import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = "FBT RSS Background Tabs";
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "io.mswd.feedlybackgroundtabs.extension") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.

            }
        }
    }

    @IBAction func openDonateLink(_ sender: AnyObject?) {
        let url = URL(string: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RD9TUVZFBUEWC&source=url")!
        if NSWorkspace.shared.open(url) {
            print("default browser was successfully opened")
        }
    }
    
    @IBAction func openDonateCryptoLink(_ sender: AnyObject?) {
        let url = URL(string: "https://commerce.coinbase.com/checkout/06e3c570-fee4-42ac-bdd2-5aa6cd1f8569")!
        if NSWorkspace.shared.open(url) {
            print("default browser was successfully opened")
        }
    }
    
}
