// function decode(str) {
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
// };

// function encode(doc) {
//     var ser = new XMLSerializer();
//     var str = ser.serializeToString(doc);
//     return str;
// };

function removeNamespaces(str) {
    return str.replace(/<[^>]*?>/g, (tag) => {
        return tag.replace(/(\s|<\/?)[a-zA-Z0-9]+\:/g, '$1');
    });
}

export default { removeNamespaces };
