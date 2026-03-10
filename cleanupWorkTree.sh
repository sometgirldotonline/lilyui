#!/bin/bash
mkdir icons screenshots platform_icons other_assets
mv icons_*.png icons
mv icons_*.svg icons
mv platforms_*.png platform_icons
mv *creenshot*.png screenshots
mv *.png other_assets
cd icons
rename 'icons_' '' *
cd ..
cd platform_icons
rename 'platforms_' '' *
cd ..
