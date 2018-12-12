//Burrows-Wheeler transform

class BWT {
	_sort(a,b){
		for(let i=0;i<len;i++){
			const diff = a[i].charCodeAt() - b[i].charCodeAt();
			if(diff !== 0) return diff;
		}
		return 0;
	}
	static Transform(str){
		const len = str.length;
		let rotations = [];
		let arr = Array.from(str);
		for(let i=0;i<len;i++){
			rotations.push(arr.join(''));
			//rotation left
			arr.push(arr.shift());
		}
		rotations.sort(this._sort);
		let pos;
		for(let i=0;i<len;i++){
			if(rotations[i] === str){pos=i;break;}
		}
		let retStr = [];
		for(let i=0;i<len;i++){
			retStr.push(rotations[i][len-1]);
		}
		return [pos,retStr.join('')];
	}
	static InverseTransform([pos,str]){
		const len = str.length;
		let arr = Array.from(str);
		let fin = [];
		for(let i=0;i<len;i++){
			fin.push('');
		}
		for(let i=0;i<len;i++){
			for(let i=0;i<len;i++){
				fin[i]=arr[i]+fin[i];
			}
			fin.sort(this._sort);
		}
		
		return fin[pos];
	}
}

module.exports = BWT;