import { hasOwnProp } from './object.js';

export function getDomain(url = getURL(), level) {
    // remove protocol, www and port
    let domain = url.replace(/(^\w+:|^)\/\/(www\.)?/, '');
    domain = domain.split(':')[0];
    if (!level) {
        return domain;
    }
    let parts = domain.split('.');
    if (level > parts.length || level <= 0) {
        return '';
    }
    let domainName = parts[parts.length - level];
    return domainName;
}

function getSearchParams(url) {
    // same parsing of URL.searchParams: keys and values are decoded, '+' is decoded as space
    return new URLSearchParams(getParametersString(url));
}

export function getParameterByName(url, name, defaultValue = null) {
    // same behavior of URLSearchParams.get: first value of a repeated parameter,
    // empty string for a parameter without value, defaultValue only if missing
    const params = getSearchParams(url);
    return params.has(name) ? params.get(name) : defaultValue;
}

export function getParameters(url) {
    return getParametersDict(url);
}

export function getParametersDict(url) {
    // first value of a repeated parameter, same as getParameterByName
    const paramsDict = {};
    for (const [key, value] of getSearchParams(url)) {
        if (!hasOwnProp(paramsDict, key)) {
            // defineProperty stores keys like "__proto__" as own properties
            Object.defineProperty(paramsDict, key, {
                value,
                enumerable: true,
                writable: true,
                configurable: true,
            });
        }
    }
    return paramsDict;
}

export function getParametersList(url) {
    const paramsList = [];
    for (const [key, value] of getSearchParams(url)) {
        paramsList.push({ key, value });
    }
    return paramsList;
}

export function getParametersString(url = getURL()) {
    const queryStringPosition = url.indexOf('?');
    // prettier-ignore
    let queryString = (queryStringPosition > -1 ? url.substr(queryStringPosition + 1) : '');
    const hashDelimiterPosition = queryString.indexOf('#');
    if (hashDelimiterPosition > -1) {
        queryString = queryString.substring(0, hashDelimiterPosition);
    }
    return queryString;
}

export function getURL() {
    // location is not defined when not running in browser
    return globalThis.location?.href ?? '';
}

export function hasParameter(url, name) {
    return getSearchParams(url).has(name);
}

export function isFile(url) {
    return (url || getURL()).indexOf('file://') === 0;
}

export function isHttp(url) {
    return (url || getURL()).indexOf('http://') === 0;
}

export function isHttps(url) {
    return (url || getURL()).indexOf('https://') === 0;
}

export function isLocalhost(url) {
    const re = /^(https?:\/\/)(localhost(\.[a-z0-9-]+)*|127\.0\.0\.1)(:\d+)?(\/.*)?$/i;
    return re.test(url || getURL());
}

export default {
    getDomain,
    getParameterByName,
    getParameters,
    getParametersDict,
    getParametersList,
    getParametersString,
    getURL,
    hasParameter,
    isFile,
    isHttp,
    isHttps,
    isLocalhost,
};
