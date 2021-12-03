from input import *

def binary_to_decimal(n):
  return int(n,2)

def count_bits(inputs):
	bit_map = {}

	for digit in inputs:
		for i in range(len(digit)):
			if (i not in bit_map):
				bit_map[i] = { '1': 0, '0': 0 }
			bit_map[i][digit[i]] += 1
	
	return bit_map

def get_common_bit(bit_map, index):
	if bit_map[index]['0'] > bit_map[index]['1']:
		return '0'
	return '1'

def get_uncommon_bit(bit_map, index):
	if bit_map[index]['0'] <= bit_map[index]['1']:
		return '0'
	return '1'

def last_dig_rem(index, values, func):
	key = func(count_bits(values), index)
	filtered_vals = list(filter(lambda val: val[index] == key, values))
	if len(filtered_vals) > 1:
		return last_dig_rem(index + 1, filtered_vals, func)
	return binary_to_decimal(filtered_vals[0])

def calculate_power_cons(input):
	inputs = input.split('\n');
	bit_map = count_bits(inputs)

	gamma = ''
	epsilon = ''

	for index in bit_map:
		gamma += get_common_bit(bit_map, index)
		epsilon += get_uncommon_bit(bit_map, index)

	print(gamma)
	print(epsilon)

	
oxy = last_dig_rem(0, test_input.split('\n'), get_common_bit)
co2 = last_dig_rem(0, test_input.split('\n'), get_uncommon_bit)
print(oxy)
print(co2)
print(oxy*co2)

# calculate_power_cons(test_input)