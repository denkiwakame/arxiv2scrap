# arxiv2scrap
[![Build Status](https://travis-ci.org/denkiwakame/arxiv2scrap.svg?branch=master)](https://travis-ci.org/denkiwakame/arxiv2scrap)  
easy-to-use arXiv clipper for scrapbox.io

![DEMO](doc/demo.gif)

## How to use
- Log in to scrapbox.io https://scraopbox.io
- Set your scrapbox project-name in arxiv2scrap option (right-click the extension icon)
- Click the extension icon at `https://arxiv.org/abs/[paper-id]` or `https://arxivorg/pdf/[paper-id]`

## Installation

### For users
- Download extension package from https://github.com/denkiwakame/arxiv2scrap/releases
- In Chrome, navigate to `chrome://extension`
- Install extension
  - `zip` Unzip extension and `Load unpacked` in Developer Mode
  - `crx` Drag and drop the extension from your file manager anywhere onto the extensions page in Chrome

### For developers
- `$ git clone https://github.com/denkiwakame/arxiv2scrap.git`
- `$ cd arxiv2scrap`
- `$ npm install`
- `$ npm run build`

## Development

### Watch build (for DEBUG)
- `$ npm run watch`

### Release build
- `$ npm run build`

### Packaging
- `$ npm run pack`

## Supported Browsers
- Google Chrome
