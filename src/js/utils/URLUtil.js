var URLUtil = {

    getParameterByName: function(name, url)
    {
        var param = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)');
        var results = regex.exec((url || URLUtil.getURL()));
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2]);
    },

    getParameters: function(url)
    {
        // TODO
        return {};
    },

    getURL: function()
    {
        return window.location.href;
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