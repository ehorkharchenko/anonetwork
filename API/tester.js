function valid(val) {
    for (var l = 0; l <= val.length; l++) {
        var symbol = val.substr(l, 1);
        console.log(symbol);
        if (/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]/.test(symbol)) {
            if (l === (val.length - 1))
                return true;
        }
    }
    return false;
}
console.log(valid("HEL3ef$"));
