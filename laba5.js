function mapSync(array, fn) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i));
    }

    return result;
}
function mapCallback(array, fn, cb) {
    let i = 0;
    const result = [];

    function next() {
        if (i >= array.length) {
            return cb(null, result);
        }

        setTimeout(() => {
            try {
                result.push(fn(array[i], i));
                i++;
                next();
            } catch (err) {
                cb(err, null);
            }
        }, 100);
    }

    next();
}