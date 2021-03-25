const convertToObject = (input) => {
    const inputPropsCopy = [...JSON.parse(input[0]).values[0]];
    const inputValsCopy = [...JSON.parse(input[0]).values[1]];
    const result = inputPropsCopy.reduce(
        (accumulator, value, index) =>
            Object.assign(accumulator, {
                [value]: inputValsCopy[index],
            }),
        {}
    );

    return Object.freeze(result);
};

const convertToMultipleObjects = (input) => {
    const inputCopy = [...JSON.parse(input[1]).values];
    const keys = inputCopy.shift();
    const result = [];

    for (let i = 0; i < inputCopy.length; i++) {
        for (let j = 0; j < inputCopy[i].length; j++) {
            var obj = keys.reduce(
                (accumulator, value, index) =>
                    Object.assign(accumulator, {
                        [value]: inputCopy[i][index],
                    }),
                {}
            );
        }
        Object.freeze(obj);
        result.push(obj)
    }

    return result;
};

const isLastIndex = (input, i) => {
    const inputCopy = [...JSON.parse(input[1]).values];
    if (i == inputCopy.length - 1) {
        return true;
    }

    return false;
};

export { convertToObject, convertToMultipleObjects, isLastIndex };
