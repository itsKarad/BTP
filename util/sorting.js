const sortChronologically = (a, b) => {
    let x = a.createdAt; 
    let y = b.createdAt;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

module.exports = sortChronologically;