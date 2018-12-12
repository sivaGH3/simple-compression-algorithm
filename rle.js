//rle has two functions compress and decompress

class RLE {
	static Compress([pos, str]) {
		let res = [];
		res.push(pos + '\n');
		let prevCh = str.charAt(0);
		let count = 1;
		for (let i = 1; i <=str.length; i++) {
			const ch = str.charAt(i);
			if (prevCh === ch) {
				count++;
			} else {
				let re = '';
				if (count === 1) {
					re = prevCh;
				} else {
					re = prevCh + prevCh + count;
				}
				res.push(re);
				prevCh = ch;
				count = 1;
			}
		}

		return res.join('');
	}
	//WWBCCC
	//WW2BCC3
	static Decompress(str) {
		//get position of first new line char
		let pos;
		//reassing str
		str = str.replace(/[0-9]+\s/, match => {
			pos = parseInt(match.replace(/\s/, ''), 10);
			return '';
		});
		//replace the count with the chars
		str = str.replace(/(\S\S|\s\s)[0-9]+/g, match => {
			const ch = match.charAt(0);
			const num = parseInt(match.substring(2), 10);
			let st = '';
			for (let i = 0; i < num; i++) {
				st += ch;
			}
			return st;
		});
		return [pos,str];
	}
}
module.exports = RLE;
