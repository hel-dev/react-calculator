export const _s = (value) => {
    return {
        hasATrailingDot: () => {
            return value.slice(-1) === '.';
        },
        hasReachedMaxDigits: (maxDigits) => {
            return value.replace(/[^0-9]/g,"").length >= maxDigits;
        }
    }
}