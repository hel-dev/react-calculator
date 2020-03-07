export const _s = (value) => {
    return {
        hasATrailingDot: () => {
            return value.slice(-1) === '.'
        }
    }
}