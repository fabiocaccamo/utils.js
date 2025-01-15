export default {
    isBetween,
    isEven,
    isFloat,
    isNegative,
    isOdd,
    isPositive,
    isPrime,
};

export function isBetween(n, min, max) {
    return n >= min && n <= max;
}

export function isEven(n) {
    return n % 2.0 === 0.0 && !isFloat(n);
}

export function isFloat(n) {
    return n % 1 !== 0;
}

export function isNegative(n) {
    return n < 0.0;
}

export function isOdd(n) {
    return n % 2.0 !== 0.0 && !isFloat(n);
}

export function isPositive(n) {
    return n >= 0.0;
}

export function isPrime(n) {
    if (typeof n !== 'number' || Number.isNaN(n) || isFloat(n)) {
        return false;
    }
    if (n <= 1) {
        return false;
    }
    if (n <= 3) {
        return true;
    }
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
