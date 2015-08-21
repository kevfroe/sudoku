console.log("START");

var sets = require("./sets.js");

console.log("getAllSubsets []          = " + JSON.stringify(sets.getAllSubsets([])));
console.log("getAllSubsets [1]         = " + JSON.stringify(sets.getAllSubsets([1])));
console.log("getAllSubsets [1,2]       = " + JSON.stringify(sets.getAllSubsets([1,2])));
console.log("getAllSubsets [1,2,3]     = " + JSON.stringify(sets.getAllSubsets([1,2,3])));
//console.log("[1,2,3,4]   = " + JSON.stringify(sets.getAllSubsets([1,2,3,4])));
//console.log("[1,2,3,4,5] = " + JSON.stringify(sets.getAllSubsets([1,2,3,4,5])));

//console.log("containsSet [1,2,3,4,5], [3,4,6]     = " + sets.containsSet([1,2,3,4,5], [3,4,6]));
//console.log("containsSet [1,2,3,4,5], []          = " + sets.containsSet([1,2,3,4,5], []));
//console.log("containsSet [1,2,3,4,5], [1,2,3]     = " + sets.containsSet([1,2,3,4,5], [1,2,3]));
//console.log("containsSet [1,2,3,4,5], [5,4,3,2,1] = " + sets.containsSet([1,2,3,4,5], [5,4,3,2,1]));

console.log("END");