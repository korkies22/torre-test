# ASSETS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your un-compiled assets such as LESS, SASS, or JavaScript.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#webpacked).

## Usage in the project

These files get optimized at building time, therefore, they should be called inside code as `require('<file-path>')`.
Here there are also css files used by pre-processors (SASS, LESS, etc). Due to compiling at css standard files at building

scss files defines reusable styles, in order to generate global usable styles styleResources must be used and configured in nuxt.config.js. main.scss file has the bundle of all scss and is imported in the general project.

Icons folder defines icons to be used in the app. There icons are sometimes used are images `<img :src="require('<icon-path>')"`, but in case they need to change color like in a hover for example, they must be imported as `xlink`. For this, inside the svg file the `fill` property must be removed, as well as the `width` and `height` attributes. So fill, width and height are defined in css.

Images folder defines images to be used in the app.
