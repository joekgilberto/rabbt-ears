export function randomShow(){
    let randomId;
    const unusable = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442, 596, 606, 608, 639, 642, 715, 724, 783, 784, 852, 853, 876, 893, 925];

    while (!randomId) {
        const cache = Math.floor(Math.random() * 1000) + 1;

        if (!unusable.includes(cache)) {
            randomId = cache;
        }
    };

    return randomId;
}