const utils = require('../utils');

const sample = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

const inp = `121=0=-
1==02020022=
1==2==20--2==
1-11-
1==02=2=02=-1-00-=0
1011=-=--00
22-1-1=0--0=
1-=121-00=
1=1=-=10====10
1=-=-21002-2=--
211-2=2=-
1=-1=10
11221
2-21-20
1-0-
12221=0-0-1=
101-022121111-
11=01-==0211
1-2-00-=--11
1=-12=-=-2=1==02
1=-0111===202
20011
2=22
1=2=12-===-=
202=-2201=-2=
2=-0221
10=20-=2=--
1=01202=
202
12211=222=
2=1=1-0211-=0=
1-10
112=211112
11==-100-
1=21220=-122--2-2-
11-220
122=1110220==1
1=1-2210-21-=120102
1=0202=1=
11=2100==2-21121
2-21-=
2=00210-
1==--2
1-
1==
1220-1=22-=
1=1-==21021-=10
2=02=02000==1-
1--210-0-0
12-200==1=0-2=-0-
12110-020-2-1--
1-2
20=2=--12=120
112=20201
1=021-0-=2---
21202--1=-1=2--
101=
22=0---=-
21
10-1020
12=2-==-0-=12=000=
1-212-
200=1--0120=2==201
200-
2=0
1-1=1110211
1---1==2
1-2122==10--=0=10
1=0-0-2-=01-=220
2-0==00001002-=
1-0--0001-2=0=0-
1-02--01=-1
1=101121=0110021-
22-22===0-2
1=-0-----202=212201
120-00--10-=202=
1=00==
111022--0012=
11-2-0=01-=-02
1-011=-2
2=021-=--1
1--212000-2
1=-000-
1-=-==0
20=0012110
12=21-1-0
1=0021=1010=0=2
11-0-==01002
1102-20=-
102
12122
1-100121=
12=-1==20=20=20222
1-=-00--0--1-
1===-22-2201=01-=-2
1==0-11--==2=21=1-=1
20=0=20-110-1201-=2
112
22=-
2=2-2021
11100=
211-
10000==10-000--0
12
1-1---1=111=
11=-=102===-1-1=-
20210-2-2-==11
1012
1-0=-121==-0
1===0-0=-0=-=210
12--1-2---021=-=
1000
2-2011-
1--201001=002
2--
1---102=2=10110
1=0=2=011-=
12=--2-=1-0`;

function snafuToDecimal(strDigit) {
	const digits = strDigit.split('').reverse();
	let num = 0;
	digits.forEach((digit, i) => {
		let decimalDigit;
		if (digit === '-') {
			decimalDigit = -1;
		} else if (digit === '=') {
			decimalDigit = -2;
		} else {
			decimalDigit = parseInt(digit, 10);
		}
		num += Math.pow(5, i) * decimalDigit;
	});

	return num;
}

function decimalToSnafu(num) {
	let largestPow = 0;
	while(true) {
		if (num / Math.pow(5, largestPow + 1) > 1) {
			largestPow += 1;
		} else {
			break;
		}
	}

	let remainingNum = num;
	let digits = [];
	for (let i = 0; i <= largestPow; i++) {
		const power = largestPow - i;
		const numPlace = Math.floor(remainingNum / Math.pow(5, power));
		remainingNum -= numPlace * Math.pow(5, power);
		digits.push(numPlace);
	}

	digits.reverse();
	for (let i = 0; i < digits.length; i++) {
		const digit = digits[i];
		if (digit > 2) {
			if (digits?.[i + 1] === undefined) {
				digits.push(1);
			} else {
				digits[i + 1] += 1;
			}
		}
		
		switch (digit) {
			case 3:
				digits[i] = '=';
				break;
			case 4:
				digits[i] = '-';
				break;
			case 5:
				digits[i] = 0;
				break;
			default:
				digits[i] = digit;
				break;
		}
	}

	digits.reverse()
	return digits.join('');
}

function part1(input) {
	return decimalToSnafu(
		input
			.split('\n')
			.map(snafuToDecimal)
			.sum()
	);
}

// const result = part1(sample);
const result = part1(inp);
console.log(result);