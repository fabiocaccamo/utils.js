var XMLUtil = {

    removeNamespaces: function(str)
    {
        return str.replace(/(\<(.|\n)+?\>)/g, function(tag) {
            return tag.replace(/(\s|\<\/?){1}([\w]+\:){1}/g, '$1');
        });
    }
};