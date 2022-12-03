exports.sum = function sum(a, b) {
	return a + b;
}

exports.intersection = function intersection(str1, str2) {
	return str1
		?.match(new RegExp('[' + str2 + ']', 'g'))
		?.join('')
		?? '';
}