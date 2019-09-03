//
//  AppDelegate.swift
//  Feedly Background Tabs
//
//  Created by Michael Shamoon on 8/27/19.
//  Copyright © 2019 Michael Shamoon. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        // Insert code here to initialize your application
    }
    
    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }
    
    internal func applicationShouldTerminateAfterLastWindowClosed(_: NSApplication) -> Bool {
        return true;
    }
    
}
