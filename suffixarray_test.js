var SuffixArray = require('./suffixarray');

var source = "abdacadabra";
var target = "ac";

var sa = new SuffixArray();
sa.on(SuffixArray.EventType.BUILD_COMPLETE, function(arg) {
    console.log("Search: ", target);
    console.log("index: ", sa.search(target));
});

console.log("Source: ", source);
try {
    sa.build(source, "quicksort");
} catch (err) {
    console.dir(err);
}

