export function randomShow() {
    let randomId;
    const unusable = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442, 596, 606, 608, 639, 642, 715, 723, 724, 783, 784, 820, 852, 853, 876, 893, 925];

    while (!randomId) {
        const cache = Math.floor(Math.random() * 1000) + 1;

        if (!unusable.includes(cache)) {
            randomId = cache;
        }
    };

    return randomId;
}

export function noTags(string) {

    const pFilterOne = string.replace('<p>', '');
    const pFilterTwo = pFilterOne.replace('</p>', '');
    const bFilterOne = pFilterTwo.replace('<b>', '');
    const bFilterTwo = bFilterOne.replace('</b>', '');
    const iFilterOne = bFilterTwo.replace('<i>', '');
    const iFilterTwo = iFilterOne.replace('</i>', '');
    const spanFilterOne = iFilterTwo.replace('<span>', '');
    const spanFilterTwo = spanFilterOne.replace('</span>', '');
    const ampFilter = spanFilterTwo.replace('&amp;', '&');
    const spaceFilter = ampFilter.replace('&nbsp;', ' ');

    return spaceFilter;
}

export function enter(title) {
    if (title.includes(': ')) {
        let titleArr = title.split(': ');
        titleArr[0] += ':'
        console.log(titleArr);
        return titleArr;
    } else {
        return [title];
    }
}

export function average(reviews){
    if(!reviews.length){
        return 'N/A'
    }

    let sum = 0;
    for (let review of reviews){
        sum += review.rating;
    }
    const average = sum/reviews.length;
    return average;
}