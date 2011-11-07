/**
 * @fileoverview Suffix Array implementation for study.
 */
var sys = require('sys');
var events = require('events');

/**
 * @constructor
 * @extends {events.EventEmitter}
 */
module.exports = SuffixArray = function() {
    events.EventEmitter.call(this);
    this.suffixes_ = [];
    this.srcLength_ = 0;
};
sys.inherits(SuffixArray, events.EventEmitter);

/**
 * @type {Array.<string>}
 * @private
 */
SuffixArray.prototype.suffixes_ = null;

/**
 * @type {number}
 */
SuffixArray.prototype.srcLength_ = null;

/**
 * @param {string} target
 */
SuffixArray.prototype.search = function(target) {
    if (this.srcLength_ === 0) {
        return target.length === 0 ? 0 : -1;
    }

    var low = 0;
    var high = this.suffixes_.length - 1;
    while (low < high) {
        var middle = parseInt(low + (high - low) / 2);
        if (this.suffixes_[middle] >= target) {
            high = middle;
        } else {
            low = middle + 1;
        }
    }
    if(this.suffixes_[high].indexOf(target, 0) === 0) {
        return this.srcLength_ - this.suffixes_[high].length;
    }
    return -1;
};

/**
 * @param {string} src
 * @param {string} sortFn
 */
SuffixArray.prototype.build = function(src, sortFn) {
    this.srcLength_ = src.length;
    for (var i = 0; i < this.srcLength_; i++) {
        this.suffixes_[i] = src.substring(i);
    }
    try {
        switch (sortFn) {
            case"quicksort":
                this.quickSort_();
                break;
            default:
                throw Error("sortFn is required!");
        }
    } catch (err) {
        console.log("Error...try normal sort.");
        this.suffixes_.sort(function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
        });
    }
    this.emit(SuffixArray.EventType.BUILD_COMPLETE);
};

/**
 * @private
 */
SuffixArray.prototype.quickSort_ = function() {
    SuffixArray.quickSort.call(this, this.suffixes_, 0, this.suffixes_.length - 1);
};

/**
 * @param {Array.<string>} data
 * @param {number} low
 * @param {number} high
 * @static
 */
SuffixArray.quickSort = function(data, low, high) {
    if (low > high) {
        return;
    }
    var i = low + 1, p = low, c = parseInt((low + high) / 2);
    var pivot = data[c];
    data[c] = data[low];

    while(i <= high) {
        if(data[i] < pivot) {
            var tmp = data[++p];
            data[p] = data[i];
            data[i] = tmp;
        }
        i++;
    }
    data[low] = data[p];
    data[p] = pivot;
    SuffixArray.quickSort.call(this, data, low, p - 1);
    SuffixArray.quickSort.call(this, data, p + 1, high);
};


/**
 * @enum {number}
 */
SuffixArray.EventType = {
    BUILD_COMPLETE: 'complete'
};
