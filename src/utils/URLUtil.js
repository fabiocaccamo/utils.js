/** global: URLUtil */

URLUtil = {
    getParameterByName: function (url, name, defaultValue) {
        var paramsDict = URLUtil.getParameters(url);
        return name in paramsDict
            ? paramsDict[name] || defaultValue || ''
            : defaultValue;
    },

    getParameters: function (url) {
        return URLUtil.getParametersDict(url);
    },

    getParametersDict: function (url) {
        var paramsList = URLUtil.getParametersList(url);
        var param;
        var paramsDict = {};
        for (var i = 0, j = paramsList.length; i < j; i++) {
            param = paramsList[i];
            paramsDict[param['key']] = param['value'];
        }
        return paramsDict;
    },

    getParametersList: function (url) {
        var paramsString = URLUtil.getParametersString(url);
        var paramsList = [];
        var paramsRE = /(([\w\-]+){1}(\=([^\&\n\r\t]*){1})?)/g;
        var paramMatch = paramsRE.exec(paramsString);
        while (paramMatch) {
            paramsList.push({
                key: paramMatch[2],
                value: decodeURIComponent(paramMatch[4] || ''),
            });
            paramMatch = paramsRE.exec(paramsString);
        }
        return paramsList;
    },

    getParametersString: function (url) {
        url = url || URLUtil.getURL();
        var queryStringPosition = url.indexOf('?');
        // prettier-ignore
        var queryString = (queryStringPosition > -1 ? url.substr(queryStringPosition + 1) : '');
        var hashDelimiterPosition = queryString.indexOf('#');
        if (hashDelimiterPosition > -1) {
            queryString = queryString.substring(0, hashDelimiterPosition);
        }
        return queryString;
    },

    getURL: function () {
        var url = '';
        try {
            url = window.location.href;
        } catch (e) {
            // catch exception if not running in browser
        }
        return url;
    },

    hasParameter: function (url, name) {
        return name in URLUtil.getParametersDict(url);
    },

    isFile: function (url) {
        return (url || URLUtil.getURL()).indexOf('file://') === 0;
    },

    isHttp: function (url) {
        return (url || URLUtil.getURL()).indexOf('http://') === 0;
    },

    isHttps: function (url) {
        return (url || URLUtil.getURL()).indexOf('https://') === 0;
    },

    isLocalhost: function (url) {
        var re =
            /^(https?\:\/\/)(localhost(.[a-z0-9\-])*|127\.0\.0\.1)(\:[\d]+)?(\/(.)*)?$/;
        return re.test(url || URLUtil.getURL());
    },
};
