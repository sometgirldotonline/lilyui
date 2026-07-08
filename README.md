# lilyui
Work in progress early stages game console / 10foot UI. Literally only has changing between items because that is painful to implement.

Was originally targeted at the R36s console (https://handhelds.wiki/R36S_Overview), but has since been modified to work on any size display and also use keyboard for controls (arrow keys)

The reason theres some python stuff in here is because the final version will use Gtkwebkit in python to run, or at least that was the original plan but likely will migrate to just using Tauri and Rust.

# Demo: https://pages.sometgirl.online/lilyui/

<!-- 
## Requirements
### PIPs
```
pip install PyGObject pycairo
```
(you may need to add `--break-system-packages` to the end)

### Arch Linux
```
sudo pacman -S python-gobject python-cairo gtk4 webkitgtk-6.0
```

## Debian Distros
```
sudo apt-get install python3-gi python3-gi-cairo gir1.2-gtk-4.0 gir1.2-webkit-6.0
``` -->