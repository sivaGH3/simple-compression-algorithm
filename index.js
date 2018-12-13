//read in a text file

//Dependencies
const fs = require('fs');
const path = require('path');
const RLE = require('./rle');
const BWT = require('./bwt');

//read in the command and the filename
const [command = 'encode', fileName = 'test.txt'] = [...process.argv.slice(2)];

let readPath,
	writePath,
	finalSize = 0;
if (command === 'encode') {
	readPath = 'input';
	writePath = 'output';
} else if (command === 'decode') {
	readPath = 'output';
	writePath = 'input';
} else {
	console.log(`Please give either "encode" or "decode" command.`);
	return;
}
const reader = fs.createReadStream(path.join(__dirname, readPath, fileName), {
	highWaterMark: 128 * 1024 *1024
});
const writer = fs.createWriteStream(path.join(__dirname, writePath, fileName), {
	highWaterMark: 128 * 1024 *1024
});

reader.on('error', () => {
	console.log('file not found');
});
writer.on('error', e => {
	console.log(e);
});

//const writeFd = fs.openSync('./testdecomp.txt','wx');

reader.on('data', chunk => {
	console.log(`recieved ${chunk.length} bytes of data`);
	const str = chunk.toString('utf-8');
	console.log(`recieved string ${str.length} bytes of data`);
	if (command === 'encode') {
		const transform = BWT.Transform(str);
		console.log(`transformed string ${transform[1].length} bytes of data`);
		const compress = RLE.Compress(transform);
		console.log(`compressed string ${compress.length} bytes of data`);
		writer.write(compress);
	} else if (command === 'decode') {
		const decompress = RLE.Decompress(str);
		console.log(`decompress string ${decompress[1].length} bytes of data`);
		const original = BWT.InverseTransform(decompress);
		console.log(`original string ${original.length} bytes of data`);
		finalSize += original.length;
		writer.write(original);
	} else {
		return;
	}
});

reader.on('end', () => {
	console.log('Done executing.');
	writer.end();
});

writer.on('finish', () => {
	console.log('file has been written and its size is ' + finalSize);
});
// split the string on new line char
// do bwt and rle on each element
