function square(n){
    return n * n;
}

module.exports.long = function(a, b) {
    return Math.sqrt(square(a) + square(b));
}

module.exports.short = function(a, b) {
    return Math.round(Math.sqrt(square(a) + square(b)));
}