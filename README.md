# BetterDiscord Plugin Banners Library

> Library to assist in displaying a top banner bar for BetterDiscord plugins.

[![NPM](https://nodei.co/npm/betterdiscord-plugin-banners.png)](https://nodei.co/npm/betterdiscord-plugin-banners/)

Full Documentation: https://notmike101.github.io/betterdiscord-plugin-banners/

## Installation

```
npm install betterdiscord-plugin-banners
```

## Usage

This plugin **should** be compatible with both ESM and CJS.

To display a banner, use the `createBanner` method.

## Example

**CJS**

```javascript
const { Banners } = require('betterdiscord-plugin-banners');

class Plugin {
  load() {
    this.banners = new Banners();
  }

  start() {
    this.banners.createBanner('This is a banner', {
      acceptCallback: () => { console.log('Accepted!' )},
    });
  }
}

module.exports = Plugin;
```

**ESM**
```javascript
import { Banners } from 'betterdiscord-plugin-banners';

class Plugin {
  load() {
    this.banners = new Banners();
  }

  start() {
    this.banners.createBanner('This is a banner', {
      acceptCallback: () => { console.log('Accepted!' )},
    });
  }
};

export default Plugin;
```
