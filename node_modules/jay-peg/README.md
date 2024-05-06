# jay-peg

<a href="https://www.npmjs.com/package/jay-peg">
  <img src="https://img.shields.io/npm/v/jay-peg.svg" />
</a>
<a href="https://github.com/diegomura/jay-peg/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/diegomura/jay-peg.svg" />
</a>
<a href="https://github.com/prettier/prettier">
  <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" />
</a>

## Overview

A blazing-fast and compact JavaScript library dedicated to efficiently decoding JPEG images.

## Installation

Using npm:

```bash
npm install jay-peg
```

Using yarn:

```bash
yarn add jay-peg
```

## Usage

Use the `decoder` providing a JPEG data buffer as input.

```javascript
import JPEG from 'jay-peg';

const jpegBuffer = /* your JPEG buffer here */;
const imageMarkers = JPEG.decoder(jpegBuffer);

console.log(imageMarkers);
```

## Example Output

The output consists of a structured array of image markers:

```javascript
[
  {
    type: 65496,
    name: "SOI",
  },
  {
    type: 65505,
    name: "EXIF",
    length: 16382,
    identifier: "Exif\x00\x00",
    entries: [Object],
  },
  {
    type: 65499,
    name: "DAC",
    length: 132,
    tables: [[Object], [Object]],
  },
  // ... and so forth
  {
    type: 65497,
    name: "EOI",
  },
];
```

## API

### `decoder(buffer: Buffer | Uint8Array): Array<ImageMarker>`

The `decoder` function accepts a JPEG buffer as its sole argument and returns an array of image markers.

#### Parameters

- `buffer`: A Buffer or Uint8Array containing the JPEG image data.

#### Returns

An array of objects representing various markers found in the JPEG image.

### `ImageMarker`

Each `ImageMarker` object in the output array adheres to the following structure:

- `type` (Number): The marker type.
- `name` (String): The marker name.
- `length` (Number): The length of the marker data.
- Additional properties specific to certain marker types.

## Performance

Performance is a key focus of `jay-peg``. In a benchmark test using a 2448×3264, 2.2MB JPEG image, the decoding speed was measured as follows:

```
Benchmarked: small:  x 11,597 ops/sec ±0.60% (95 runs sampled)
Benchmarked: medium:  x 11,219 ops/sec ±0.20% (98 runs sampled)
Benchmarked: large:  x 7,744 ops/sec ±0.27% (100 runs sampled)
Benchmarked: huge:  x 2,019 ops/sec ±0.36% (96 runs sampled)
```

It's worth noting that the performance is significantly improved on smaller and simpler images.

## License

`jay-peg` is released under the [MIT License](LICENSE)
