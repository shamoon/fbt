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
    
    @IBAction func openGithubPage(_ sender: AnyObject?) {
        let url = URL(string: "https://github.com/shamoon/fbt/issues")!
        NSWorkspace.shared.open(url)
    }
    
}
