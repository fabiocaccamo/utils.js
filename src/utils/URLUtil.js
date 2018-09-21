var URLUtil = {

    getParameterByName: function(url, name, defaultValue)
    {
        var paramsDict = URLUtil.getParameters(url);
        return ((name in paramsDict) ? paramsDict[name] : defaultValue);
    },

    getParameters: function(url)
    {
        var paramsRE = /(([\w]+){1}\=([^\&\n\r\t]*){1})/g;
        var paramsList = (url.match(paramsRE) || []);
        var paramsDict = {};
        var paramKV;
        for (var i = 0, j = paramsList.length; i < j; i++) {
            paramKV = paramsList[i].split('=');
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
        // http://localhost
        // http://localhost/
        // http://localhost:8000
        // http://localhost:8000/
        // http://127.0.0.1
        // http://127.0.0.1/
        // http://127.0.0.1:8000
        // http://127.0.0.1:8000/
        // https://localhost
        // https://localhost/
        // https://localhost:8000
        // https://localhost:8000/
        // https://127.0.0.1
        // https://127.0.0.1/
        // https://127.0.0.1:8000
        // https://127.0.0.1:8000/
        // http://localhost
        // http://localhost/
        // http://localhost:8000
        // http://localhost:8000/
        // http://localhost:8000/
        // http://127.0.0.1
        // http://127.0.0.1/
        // http://127.0.0.1:8000
        // http://127.0.0.1:8000/
        // https://localhost
        // https://localhost/
        // https://localhost:8000
        // https://localhost:8000/
        // https://localhosts
        // https://localhosts/
        // https://localhosts:8000
        // https://localhosts:8000/
        // https://localhosts:8000/index.html
        // https://localhost/
        // https://localhost:8000
        // https://localhost:8000/
        // https://localhost:8000/index.html
        // https://127.0.0.1
        // https://127.0.0.1/
        // https://127.0.0.1:8000
        // https://127.0.0.1:8000/index.html

        var re = /^(https?\:\/\/)(localhost|127\.0\.0\.1)(\:[\d]+)?(\/(.)*)?$/;
        return re.test((url || URLUtil.getURL()));
    }

};