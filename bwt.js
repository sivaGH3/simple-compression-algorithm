//Burrows-Wheeler transform

class BWT {
	_sort(a,b){
		for(let i=0;i<len;i++){
			const diff = a[i].charCodeAt() - b[i].charCodeAt();
			if(diff !== 0) return diff;
		}
		return 0;
	}
	//@TODO: limit str
	static Transform(str){
		const len = str.length;
		const buff = str + str;
		let sorted_arr_idx = [];
		for(let i=0;i<len;i++){
			sorted_arr_idx.push(i);
		}
		sorted_arr_idx.sort((x,y) =>{
			for(let i=0;i<len;i++){
				const diff = buff[x+i].charCodeAt() - buff[y+i].charCodeAt();
				if(diff !== 0){return diff;}
			}
			return 0;
		})
		let pos;
		let retStr = [];
		for(let i=0;i<len;i++){
			const ch_id = sorted_arr_idx[i];
			if(ch_id === 0){
				pos = i;
			}
			retStr.push(buff[ch_id + len -1]);
		}
		return [pos, retStr.join('')];
	}
	static InverseTransform([pos,str]){
		const len = str.length;
		let bwt_arr = Array.from(str);
		let sorted_arr_idx = [];
		for(let i=0;i<len;i++){
			sorted_arr_idx.push(i);
		}
		sorted_arr_idx.sort((x,y) =>{
			const diff = bwt_arr[x].charCodeAt() - bwt_arr[y].charCodeAt();
			return diff === 0 ? x-y : diff ;
		});
		let p = sorted_arr_idx[pos];
		let retStr = [];
		for(let i=0;i<len;i++){
			retStr.push(bwt_arr[p]);
			p = sorted_arr_idx[p];
		}
		return retStr.join('');
	}
}

module.exports = BWT;