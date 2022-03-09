export class Helpers {
    static fancyNumber(num) {
        num = parseInt(num);

        return `${num < 0 ? num : `+${num}`}`;
    }

    static interation(num) {
        num = parseInt(num);

        if (num <= 0) {
            return `${num}`;
        }

        if (num === 1) {
            return `${num}st`;
        }
        if (num === 2) {
            return `${num}nd`;
        }
        if (num === 3) {
            return `${num}rd`;
        }

        return `${num}th`;
    }
}