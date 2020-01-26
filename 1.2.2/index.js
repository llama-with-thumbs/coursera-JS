/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    var uniqueList = {};
    var returns = '';
    for( i = 0; i < hashtags.length; i++){
        if (!uniqueList.hasOwnProperty(hashtags[i].toLocaleLowerCase())){
            uniqueList[hashtags[i].toLocaleLowerCase()] = i;
            returns += hashtags[i].toLocaleLowerCase() + ', ';
            // console.log(i + ' ' + hashtags[i]);
        }
    }
    // console.log(uniqueList);
    // console.log(returns.slice(0, -2));
    return returns.trim().slice(0, -1);
};
