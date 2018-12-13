# simple-compression-algorithm
- implementation of Burrows-Wheeler Transformation and Run Length Encoding.
- optimized [BWT](https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform) to run in linear time.
- optimized [RLE](https://en.wikipedia.org/wiki/Run-length_encoding) by using 2 letters to denote a run.

## Usage
- run either ```node index.js enocde test.txt``` or ```node index.js decode test.txt```
- all the *compressed* files are stored in *output* folder and *uncompressed* in *input* folder.
- to *compress a file* first place it in *input* folder.

## Dependencies
- no external dependencies

## Limitations
- becomes slow after 32 MB (*need to optimize I/O handling*)
- fails in cases where there are large amount of numbers due to RLE
