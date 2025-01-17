function getDomain(url = getURL(), level) {
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

function getParameterByName(url, name, defaultValue) {
    const paramsDict = getParameters(url);
    return name in paramsDict ? paramsDict[name] || defaultValue || '' : defaultValue;
}

function getParameters(url) {
    return getParametersDict(url);
}

function getParametersDict(url) {
    const paramsList = getParametersList(url);
    let param;
    const paramsDict = {};
    for (let i = 0, j = paramsList.length; i < j; i++) {
        param = paramsList[i];
        paramsDict[param['key']] = param['value'];
    }
    return paramsDict;
}

function getParametersList(url) {
    const paramsString = getParametersString(url);
    const paramsList = [];
    const paramsRE = /(([\w\-]+){1}(\=([^\&\n\r\t]*){1})?)/g;
    let paramMatch = paramsRE.exec(paramsString);
    while (paramMatch) {
        paramsList.push({
            key: paramMatch[2],
            value: decodeURIComponent(paramMatch[4] || ''),
        });
        paramMatch = paramsRE.exec(paramsString);
    }
    return paramsList;
}

function getParametersString(url = getURL()) {
    const queryStringPosition = url.indexOf('?');
    // prettier-ignore
    let queryString = (queryStringPosition > -1 ? url.substr(queryStringPosition + 1) : '');
    const hashDelimiterPosition = queryString.indexOf('#');
    if (hashDelimiterPosition > -1) {
        queryString = queryString.substring(0, hashDelimiterPosition);
    }
    return queryString;
}

function getURL() {
    let url = '';
    try {
        url = window.location.href;
    } catch (e) {
        // catch exception if not running in browser
    }
    return url;
}

function hasParameter(url, name) {
    return name in getParametersDict(url);
}

function isFile(url) {
    return (url || getURL()).indexOf('file://') === 0;
}

function isHttp(url) {
    return (url || getURL()).indexOf('http://') === 0;
}

function isHttps(url) {
    return (url || getURL()).indexOf('https://') === 0;
}

function isLocalhost(url) {
    const re =
        /^(https?\:\/\/)(localhost(.[a-z0-9\-])*|127\.0\.0\.1)(\:[\d]+)?(\/(.)*)?$/;
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
