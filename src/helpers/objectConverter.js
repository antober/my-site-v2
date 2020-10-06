const convertToObject = async (input) => {
	const properties = [...JSON.parse(input[0]).values[0]];
	const values = [...JSON.parse(input[0]).values[1]];
	const result = properties.reduce(
		(accumulator, value, index) => Object.assign(accumulator, {
    	[value]: values[index],
    	}), {}
    );
  
	return result;
}

const convertToMultipleObjects = (input) => {
	const copy = [...JSON.parse(input[1]).values];
	const keys = copy.shift();
	const result = []
	
	for (let i = 0; i < copy.length -1; i++) {
		for (let j = 0; j < copy[i].length -1; j++) {
			result.push(keys.reduce(
				(accumulator, value, index) => Object.assign(accumulator, {
				[value]: copy[j][index],
				}), {}
			));
		}
	}
	
	console.log(result)
	return result;
}

export {
	  convertToObject,
	  convertToMultipleObjects
}