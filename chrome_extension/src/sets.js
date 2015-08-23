//exports.getAllSubsets = getAllSubsetsInternal;
//exports.containsSet   = containsSetInternal;

var sets = {};
sets.getAllSubsets = getAllSubsetsInternal;
sets.containsSet   = containsSetInternal;

function getAllSubsetsInternal (list) {
	if (list.length == 0) {
		return [[]];
	}
	else {
		var last_val = list.pop();
		var subsets = getAllSubsetsInternal(list);
		var ret_list = [];

		for (var i = 0; i < subsets.length; i++) {
			var set_base = subsets[i].slice();
			var set_plus = subsets[i].slice();
			set_plus.push(last_val);

			ret_list.push(set_base);
			ret_list.push(set_plus);
		}

		return ret_list;
	}
}

function containsSetInternal(container, elements) {
	for (var i = 0; i < elements.length; i++) {
		if (container.indexOf(elements[i]) != -1) {
			return true;
		}
	}
	return false;
}