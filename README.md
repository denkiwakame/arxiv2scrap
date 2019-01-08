# arxiv2scrap
[![Build Status](https://travis-ci.org/denkiwakame/arxiv2scrap.svg?branch=master)](https://travis-ci.org/denkiwakame/arxiv2scrap)  
easy-to-use arXiv clipper for scrapbox.io

![DEMO](doc/demo.gif)

## Usage
- `MUST` Log in to scrapbox.io https://scraopbox.io
- `MUST` Right-click on the extension icon >> **Options** >> set your scrapbox project-name
- Click on the extension icon at:
  - `https://arxiv.org/abs/[paper-id]`
  - `https://arxiv.org/pdf/[paper-id]`
  - `*.pdf`

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
