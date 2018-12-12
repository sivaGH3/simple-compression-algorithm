//read in a text file

//Dependencies
const fs = require('fs');
const path = require('path');
const RLE = require('./rle');
const BWT = require('./bwt');

const readable = fs.createReadStream('./test.txt');
const writeFd = fs.openSync('./testCompress.txt','wx');
//const writeFd = fs.openSync('./testdecomp.txt','wx');

readable.on('data',(chunk) => {
	console.log(`recieved ${chunk.length} bytes of data`);
	const str = chunk.toString('utf-8');
	console.log(`recieved string ${str.length} bytes of data`);
	const transform = BWT.Transform(str);
	console.log(`transformed string ${transform[1].length} bytes of data`);
	const compress = RLE.Compress(transform);
	console.log(`compressed string ${compress.length} bytes of data`);
	const decompress = RLE.Decompress(compress);
	console.log(`decompress string ${decompress[1].length} bytes of data`);
	const original = BWT.InverseTransform(decompress);
	console.log(`original string ${original.length} bytes of data`);
	// console.log(str);
	// console.log('transform',transform);
	// console.log('compress',compress);
	// console.log('decompress',decompress[1]);
	// console.log('original',original);
	console.log(str === original);
	fs.writeFile(writeFd,compress,() =>{
		console.log('written succesfully');
	});
})

// split the string on new line char
// do bwt and rle on each element