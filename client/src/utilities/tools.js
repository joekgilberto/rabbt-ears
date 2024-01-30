export function randomShow() {
    let randomId;
    const unusable = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442, 596, 606, 608, 639, 642, 715, 723, 724, 783, 784, 820, 852, 853, 876, 893, 925,927];

    while (!randomId) {
        const cache = Math.floor(Math.random() * 1000) + 1;

        if (!unusable.includes(cache)) {
            randomId = cache;
        }
    };

    return randomId;
}

export function noTags(string) {
    let filtered = string

    const tags = ['<p>', '</p>', '<b>', '</b>', '<i>', '</i>', '<span>', '</span>']
    const inserts = [
        { symbol: '&amp;', replacement: '&' },
        { symbol: '&nbsp;', replacement: ' ' }
    ]

    for (let tag of tags) {
        while (filtered.indexOf(tag) !== -1) {
            filtered = filtered.replace(tag, '');
        }
    }

    for (let insert of inserts) {
        while (filtered.indexOf(insert.symbol) !== -1) {
            filtered = filtered.replace(insert.symbol, insert.replacement);
        }
    }

    return filtered;
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

export function average(reviews) {
    if (!reviews.length) {
        return 'N/A'
    }

    let sum = 0;
    for (let review of reviews) {
        sum += review.rating;
    }
    const average = sum / reviews.length;
    return average;
}

export function simplifyErrorMessage(error) {
    if(error.includes('The provided username or password is incorrect')){
        return 'Username or password is incorrect'
    } else if(error.includes('E11000')){
        return 'That username is already taken, please choose another';
    }

    return error;
}