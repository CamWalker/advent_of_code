# fish = [3,4,3,1,2]
fish = [1,1,3,1,3,2,1,3,1,1,3,1,1,2,1,3,1,1,3,5,1,1,1,3,1,2,1,1,1,1,4,4,1,2,1,2,1,1,1,5,3,2,1,5,2,5,3,3,2,2,5,4,1,1,4,4,1,1,1,1,1,1,5,1,2,4,3,2,2,2,2,1,4,1,1,5,1,3,4,4,1,1,3,3,5,5,3,1,3,3,3,1,4,2,2,1,3,4,1,4,3,3,2,3,1,1,1,5,3,1,4,2,2,3,1,3,1,2,3,3,1,4,2,2,4,1,3,1,1,1,1,1,2,1,3,3,1,2,1,1,3,4,1,1,1,1,5,1,1,5,1,1,1,4,1,5,3,1,1,3,2,1,1,3,1,1,1,5,4,3,3,5,1,3,4,3,3,1,4,4,1,2,1,1,2,1,1,1,2,1,1,1,1,1,5,1,1,2,1,5,2,1,1,2,3,2,3,1,3,1,1,1,5,1,1,2,1,1,1,1,3,4,5,3,1,4,1,1,4,1,4,1,1,1,4,5,1,1,1,4,1,3,2,2,1,1,2,3,1,4,3,5,1,5,1,1,4,5,5,1,1,3,3,1,1,1,1,5,5,3,3,2,4,1,1,1,1,1,5,1,1,2,5,5,4,2,4,4,1,1,3,3,1,5,1,1,1,1,1,1]
# days = 80
days = 256

def calc_fish_growth(total, number_of_fish, days_until_birth, days_left):
	print(total, days_until_birth, days_left)
	while days_until_birth < days_left:
		days_left -= days_until_birth
		days_until_birth = 7
		total += calc_fish_growth(number_of_fish, number_of_fish, 9, days_left)
	else:
		return total

def group_fish(fish):
	mapping = [0] * 9
	for num in fish:
		mapping[num] += 1
	return mapping

def get_calc_from_mapping(mapping, days):
	total = 0
	print(mapping)
	for i in range(days):
		mapping.append(mapping.pop(0))
		mapping[6] += mapping[8]

	print(mapping)
	return sum(mapping)

print(get_calc_from_mapping(group_fish(fish), days))