var URLUtil = {

    getParameterByName: function(url, name, defaultValue)
    {
        var paramsDict = URLUtil.getParameters(url);
        return ((name in paramsDict) ? (paramsDict[name] || defaultValue || '') : defaultValue);
    },

    getParameters: function(url)
    {
        return URLUtil.getParametersDict(url);
    },

    getParametersDict: function(url)
    {
        var paramsList = URLUtil.getParametersList(url);
        var param;
        var paramsDict = {};
        for (var i = 0, j = paramsList.length; i < j; i++) {
            param = paramsList[i];
            paramsDict[param['key']] = param['value'];
        }
        return paramsDict;
    },

    getParametersList: function(url)
    {
        var paramsString = URLUtil.getParametersString(url);
        var paramsList = [];
        var paramsRE = /(([\w]+){1}(\=([^\&\n\r\t]*){1})?)/g;
        var paramMatch;
        while (paramMatch = paramsRE.exec(paramsString)) {
            paramsList.push({
                key: paramMatch[2],
                value: decodeURIComponent(paramMatch[4] || '')
            });
        }
        return paramsList;
    },

    getParametersString: function(url)
    {
        url = (url || URLUtil.getURL());
        var queryStringPosition = url.indexOf('?');
        var queryString = (queryStringPosition > -1 ? url.substr(queryStringPosition + 1) : '');
        return queryString;
    },

    getURL: function()
    {
        var url = '';
        try {
            url = window.location.href;
        } catch(e) {
        }
        return url;
    },

    hasParameter: function(url, name)
    {
        return (name in URLUtil.getParametersDict(url));
    },

    isFile: function(url)
    {
        return ((url || URLUtil.getURL()).indexOf('file://') === 0);
    },

    isHttp: function(url)
    {
        return ((url || URLUtil.getURL()).indexOf('http://') === 0);
    },

    isHttps: function(url)
    {
        return ((url || URLUtil.getURL()).indexOf('https://') === 0);
    },

    isLocalhost: function(url)
    {
        var re = /^(https?\:\/\/)(localhost|127\.0\.0\.1)(\:[\d]+)?(\/(.)*)?$/;
        return re.test((url || URLUtil.getURL()));
    }

};