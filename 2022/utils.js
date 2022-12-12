exports.sum = function sum(a, b) {
	return a + b;
}

exports.product = function product(a, b) {
	return a * b;
}

exports.intersection = function intersection(str1, str2) {
	return str1
		?.match(new RegExp('[' + str2 + ']', 'g'))
		?.join('')
		?? '';
}

exports.extractAll = function extractAll(input, regex) {
	return [...input.matchAll(new RegExp(regex, 'g'))].reduce((arr, match) => arr.concat(match),[]);
}