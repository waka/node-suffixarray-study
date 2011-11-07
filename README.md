Suffix Arrayのお勉強
==========

Suffix Array検索アルゴリズムの勉強として、Node.jsで書いてみた。
http://ja.wikipedia.org/wiki/%E6%8E%A5%E5%B0%BE%E8%BE%9E%E9%85%8D%E5%88%97


使い方
==========

    var sa = new SuffixArray();
    sa.on(SuffixArray.EventType.BUILD_COMPLETE, function(arg) {
        var target = "ac";
        console.log("Search: ", target);
        console.log("index: ", sa.search(target)); // output -> 3
    });

    var source = "abdacadabra";
    try {
        sa.build(source, "quicksort");
    } catch (err) {
        console.dir(err);
    }

