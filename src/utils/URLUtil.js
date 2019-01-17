var URLUtil = {

    getParameterByName: function(url, name, defaultValue)
    {
        var paramsDict = URLUtil.getParameters(url);
        return ((name in paramsDict) ? paramsDict[name] : defaultValue);
    },

    getParameters: function(url)
    {
        var paramsURL = (url || URLUtil.getURL());
        var paramsMarkIndex = paramsURL.indexOf('?');
        var paramsQueryString = (paramsMarkIndex > -1 ? paramsURL.substr(paramsMarkIndex + 1) : '');
        var paramsRE = /(([\w]+){1}\=([^\&\n\r\t]*){1})/g;
        var paramsList = (paramsQueryString.match(paramsRE) || []);
        var paramsDict = {};
        var paramKV;
        for (var i = 0, j = paramsList.length; i < j; i++) {
            paramKV = paramsList[i].split(/\=(.+)/);
            paramsDict[paramKV[0]] = decodeURIComponent(paramKV[1]);
        }
        return paramsDict;
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