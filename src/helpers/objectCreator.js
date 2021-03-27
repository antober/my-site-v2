const toObject = (resultValues, resultIndex) => {
    return Object.assign(
        ...resultValues[0]?.map((k, i) => ({
            [k]: resultValues[resultIndex][i],
        })
    ))
}

export {
    toObject
}