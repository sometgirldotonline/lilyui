import gi
gi.require_version('Gtk', '4.0')
gi.require_version('WebKit', '6.0')
from gi.repository import Gtk, WebKit
import os
import json

def on_script_message(webview, result, user_data):
    """Handle messages from JavaScript"""
    try:
        value = webview.evaluate_javascript_finish(result)
        print(f"Script result: {value}")
    except Exception as e:
        print(f"Error: {e}")

def on_message_received(user_content_manager, message, webview):
    """Handle messages from the webview"""
    try:
        # message is a JavaScriptCore.Value object
        print(f"Message is object: {message.is_object()}")
        
        if message.is_object():
            message_dict = {}
            
            # Extract properties from the JavaScript object
            for prop in ['type', 'message']:
                try:
                    prop_value = message.object_get_property(prop)
                    if prop_value and prop_value.is_string():
                        message_dict[prop] = prop_value.to_string()
                except Exception as e:
                    print(f"Error getting property {prop}: {e}")
            
            print(f"Received from JS: {message_dict}")
            
            if message_dict.get('type') == 'echo':
                user_message = message_dict.get('message', '')
                # Echo the message back
                response = f"Echo: {user_message}"
                
                # Send response back to JavaScript
                script = f"onPythonResponse({json.dumps(response)})"
                webview.evaluate_javascript(script, -1, None, None, None)
        
    except Exception as e:
        print(f"Error handling message: {e}")
        import traceback
        traceback.print_exc()

def on_activate(app):
    win = Gtk.ApplicationWindow(application=app)
    win.set_title("Python WebKitGTK Echo App")
    win.set_default_size(640, 480)
    win.set_resizable(False)
    win.set_decorated(False)  # Remove window decorations (title bar, borders)
    
    # Unround corners with CSS
    css_provider = Gtk.CssProvider()
    css_provider.load_from_data(b"""
        window {
            border-radius: 0px;
        }
    """)
    Gtk.StyleContext.add_provider_for_display(
        Gtk.Widget.get_display(win),
        css_provider,
        Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    )
    
    # Create WebView
    webview = WebKit.WebView()
    settings = webview.get_settings()
    settings.set_property("enable-developer-extras", True)
    # Get the user content manager from webview
    user_content_manager = webview.get_user_content_manager()
    user_content_manager.register_script_message_handler('pythonBridge')
    
    # Connect signal to handle messages
    user_content_manager.connect('script-message-received::pythonBridge',
                                on_message_received, webview)
    
    win.set_child(webview)
    
    # Load local HTML file
    html_path = os.path.join(os.path.dirname(__file__), 'lilyui.html')
    html_uri = f"file://{html_path}"
    webview.load_uri(html_uri)

    win.present()

app = Gtk.Application()
app.connect('activate', on_activate)
app.run(None)
