/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    let operList = operations;
    for(i=0; i<operList.length; i++) {
        console.log("oper number - ", i);
        operList[i]();
    }
};