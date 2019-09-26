//
//  SafariExtensionViewController.swift
//  Feedly Background Tabs Extension
//
//  Created by Michael Shamoon on 8/27/19.
//  Copyright © 2019 Michael Shamoon. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    @IBOutlet weak var shortcutKeyField: NSTextField!
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:360, height:150)
        return shared
    }()
}
