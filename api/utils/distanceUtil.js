exports.euclideanDistance = (arr1, arr2)  => {
    if (arr1.length !== arr2.length) return Infinity;
    return Math.sqrt(arr1.reduce((acc, val, i) => acc + Math.pow(val - arr2[i], 2), 0));
}