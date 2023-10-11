var utils = require('../dist/utils.js');
var test = utils.test;
var xml = utils.xml;

describe('xml', function () {
    describe('removeNamespaces', function () {
        it('test simple', function () {
            var s = '';
            s +=
                '<root xmlns:h="http://www.w3.org/TR/html4/" xmlns:f="https://www.w3schools.com/furniture">';
            s += '<h:table>';
            s += '<h:tr>';
            s += '<h:td>Apples</h:td>';
            s += '<h:td>Bananas</h:td>';
            s += '</h:tr>';
            s += '</h:table>';
            s += '<f:table>';
            s += '<f:name>African Coffee Table</f:name>';
            s += '<f:width>80</f:width>';
            s += '<f:length>120</f:length>';
            s += '</f:table>';
            s += '</root>';

            var r = '';
            r +=
                '<root h="http://www.w3.org/TR/html4/" f="https://www.w3schools.com/furniture">';
            r += '<table>';
            r += '<tr>';
            r += '<td>Apples</td>';
            r += '<td>Bananas</td>';
            r += '</tr>';
            r += '</table>';
            r += '<table>';
            r += '<name>African Coffee Table</name>';
            r += '<width>80</width>';
            r += '<length>120</length>';
            r += '</table>';
            r += '</root>';

            test.assertEqual(xml.removeNamespaces(s), r);
        });
    });
});
