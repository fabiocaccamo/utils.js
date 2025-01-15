/** global: XMLUtil */

XMLUtil = {
    // decode: function(str) {
    //     // https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
    //     var doc = null;
    //         try {
    //             if (window.DOMParser) {
    //             parser = new DOMParser();
    //             doc = parser.parseFromString(str, 'text/xml');
    //         } else {
    //             // Internet Explorer
    //             doc = new ActiveXObject('Microsoft.XMLDOM');
    //             doc.async = false;
    //             doc.loadXML(str);
    //         }
    //     } catch(e) {
    //     }
    //     return doc;
    // },

    // encode: function(doc) {
    //     var ser = new XMLSerializer();
    //     var str = ser.serializeToString(doc);
    //     return str;
    // },

    removeNamespaces(str) {
        return str.replace(/(\<(.|\n)+?\>)/g, (tag) => {
            return tag.replace(/(\s|\<\/?){1}([\w]+\:){1}/g, '$1');
        });
    },
};
