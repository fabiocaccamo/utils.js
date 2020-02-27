## Members

<dl>
<dt><a href="#utils">utils</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#array">array</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#base64">base64</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#color">color</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#date">date</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#ease">ease</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#func">func</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#geom">geom</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#hex">hex</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#json">json</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#math">math</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#number">number</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#object">object</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#random">random</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#string">string</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#test">test</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#trigo">trigo</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#type">type</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#xml">xml</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#url">url</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
<dt><a href="#utf8">utf8</a> : <code><a href="#object">object</a></code></dt>
<dd></dd>
</dl>

<a name="utils"></a>

## utils : <code>Object</code>
**Kind**: global variable  
<a name="array"></a>

## array : [<code>object</code>](#object)
**Kind**: global namespace  

* [array](#array) : [<code>object</code>](#object)
    * [.clean(list, [hard])](#array.clean) ⇒ <code>Array</code>
    * [.clone(list)](#array.clone) ⇒ <code>Array</code>
    * [.equals(listA, listB)](#array.equals) ⇒ <code>Boolean</code>
    * [.flatten(list)](#array.flatten) ⇒ <code>Array</code>
    * [.index(list, keys, [flat])](#array.index) ⇒ <code>Object</code>
    * [.paginate(list, itemsPerPage)](#array.paginate) ⇒ <code>Array</code>

<a name="array.clean"></a>

### array.clean(list, [hard]) ⇒ <code>Array</code>
Clean a list by removing values evaluated as 'none'.

**Kind**: static method of [<code>array</code>](#array)  
**Returns**: <code>Array</code> - - A new cleaned list.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| list | <code>Array</code> |  | The list to clean. |
| [hard] | <code>Boolean</code> | <code>false</code> | If true, also objects, arrays and strings evaluated as 'empty' will be removed. |

<a name="array.clone"></a>

### array.clone(list) ⇒ <code>Array</code>
Creates a new list with same properties than original (deep clone).

**Kind**: static method of [<code>array</code>](#array)  
**Returns**: <code>Array</code> - - A new cloned list.  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | The list |

<a name="array.equals"></a>

### array.equals(listA, listB) ⇒ <code>Boolean</code>
Compares two lists and check if they are (deeply) equal.

**Kind**: static method of [<code>array</code>](#array)  
**Returns**: <code>Boolean</code> - - true if the two lists are equal, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| listA | <code>Array</code> | The list a |
| listB | <code>Array</code> | The list b |

<a name="array.flatten"></a>

### array.flatten(list) ⇒ <code>Array</code>
Flat a N-d list to be a 1-d list.

**Kind**: static method of [<code>array</code>](#array)  
**Returns**: <code>Array</code> - - A new flatten list.  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | The list |

<a name="array.index"></a>

### array.index(list, keys, [flat]) ⇒ <code>Object</code>
Creates a dictionary by indexing list value for the given keys.
List values must be key-value objects.
If flat is true, each dictionary key will be associated with one object and not a list of objects.

**Kind**: static method of [<code>array</code>](#array)  
**Returns**: <code>Object</code> - - An indexed dictionary.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| list | <code>Array.&lt;Object&gt;</code> |  | The list |
| keys | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | A key or an array of keys |
| [flat] | <code>Boolean</code> | <code>false</code> | If true, each dictionary key will be associated with one object and not a list of objects. |

<a name="array.paginate"></a>

### array.paginate(list, itemsPerPage) ⇒ <code>Array</code>
Creates a 2d list grouping list items every n-items.

**Kind**: static method of [<code>array</code>](#array)  
**Returns**: <code>Array</code> - - A 2d list  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | The list |
| itemsPerPage | <code>Number</code> | The items per page |

<a name="base64"></a>

## base64 : [<code>object</code>](#object)
**Kind**: global namespace  

* [base64](#base64) : [<code>object</code>](#object)
    * [.decode(str)](#base64.decode) ⇒ <code>String</code>
    * [.encode(str)](#base64.encode) ⇒ <code>String</code>

<a name="base64.decode"></a>

### base64.decode(str) ⇒ <code>String</code>
Decode a string encoded in base64.

**Kind**: static method of [<code>base64</code>](#base64)  
**Returns**: <code>String</code> - - The string obtained from base64 decoding.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | Any string previously encoded in base64. |

<a name="base64.encode"></a>

### base64.encode(str) ⇒ <code>String</code>
Encode a string in base64.

**Kind**: static method of [<code>base64</code>](#base64)  
**Returns**: <code>String</code> - - The string obtained from base64 encoding.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | Any string. |

<a name="color"></a>

## color : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="date"></a>

## date : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="ease"></a>

## ease : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="func"></a>

## func : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="geom"></a>

## geom : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="hex"></a>

## hex : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="json"></a>

## json : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="math"></a>

## math : [<code>object</code>](#object)
**Kind**: global namespace  

* [math](#math) : [<code>object</code>](#object)
    * [.interpolation](#math.interpolation)
        * [~bilinear(a, b, c, d, u, v)](#math.interpolation..bilinear) ⇒ <code>Number</code>

<a name="math.interpolation"></a>

### math.interpolation
Interpolation utility object

**Kind**: static property of [<code>math</code>](#math)  
<a name="math.interpolation..bilinear"></a>

#### interpolation~bilinear(a, b, c, d, u, v) ⇒ <code>Number</code>
Calculate bilinear interpolation for the given values.

**Kind**: inner method of [<code>interpolation</code>](#math.interpolation)  
**Returns**: <code>Number</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Number</code> | xxx |
| b | <code>Number</code> | xxx |
| c | <code>Number</code> | xxx |
| d | <code>Number</code> | xxx |
| u | <code>Number</code> | xxx |
| v | <code>Number</code> | xxx |

<a name="number"></a>

## number : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="object"></a>

## object : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="object.clone"></a>

### object.clone(obj) ⇒ <code>Object</code>
Creates a new instance of the object with same properties than original (deep clone).

**Kind**: static method of [<code>object</code>](#object)  
**Returns**: <code>Object</code> - - Copy of this object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object |

<a name="random"></a>

## random : [<code>object</code>](#object)
**Kind**: global namespace  

* [random](#random) : [<code>object</code>](#object)
    * [.argument()](#random.argument) ⇒ <code>\*</code>
    * [.bit([chance])](#random.bit) ⇒ <code>Number</code>
    * [.boolean([chance])](#random.boolean) ⇒ <code>Boolean</code>
    * [.color()](#random.color) ⇒ <code>Number</code>
    * [.element(array)](#random.element) ⇒ <code>\*</code>
    * [.float(min, max)](#random.float) ⇒ <code>Number</code>
    * [.index(array)](#random.index) ⇒ <code>Number</code>
    * [.integer(min, max)](#random.integer) ⇒ <code>Number</code>
    * [.sign([chance])](#random.sign) ⇒ <code>Number</code>
    * [.string(length, charset)](#random.string) ⇒ <code>String</code>

<a name="random.argument"></a>

### random.argument() ⇒ <code>\*</code>
Return a random argument

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>\*</code> - - Random argument  
<a name="random.bit"></a>

### random.bit([chance]) ⇒ <code>Number</code>
Return a random bit (0 or 1)

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Number</code> - - The chance to generate a 1, 1.0 means 100%, 0.0 means 0%.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [chance] | <code>Number</code> | <code>0.5</code> | The chance |

<a name="random.boolean"></a>

### random.boolean([chance]) ⇒ <code>Boolean</code>
Return a random boolean (true or false)

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Boolean</code> - - The chance to generate a true value, 1.0 means 100%, 0.0 means 0%.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [chance] | <code>Number</code> | <code>0.5</code> | The chance |

<a name="random.color"></a>

### random.color() ⇒ <code>Number</code>
Return a random color (uint)

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Number</code> - - Random color  
<a name="random.element"></a>

### random.element(array) ⇒ <code>\*</code>
Return a random element from the given array

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>\*</code> - - Random array element  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array |

<a name="random.float"></a>

### random.float(min, max) ⇒ <code>Number</code>
Return a random float where n >= min && n <= max

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Number</code> - - Random float  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | The minimum |
| max | <code>Number</code> | The maximum |

<a name="random.index"></a>

### random.index(array) ⇒ <code>Number</code>
Return a random valid index for the given array

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Number</code> - - Random array index  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array |

<a name="random.integer"></a>

### random.integer(min, max) ⇒ <code>Number</code>
Return a random integer where n >= min && n <= max

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Number</code> - - Random integer  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | The minimum |
| max | <code>Number</code> | The maximum |

<a name="random.sign"></a>

### random.sign([chance]) ⇒ <code>Number</code>
Return a random sign (1 or -1), useful to randomize positive/negative multiplications.

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>Number</code> - - Random sign (1 or -1)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [chance] | <code>Number</code> | <code>0.5</code> | The chance to generate a positive sign, 1.0 means 100%, 0.0 means 0%. |

<a name="random.string"></a>

### random.string(length, charset) ⇒ <code>String</code>
Return a random string of the desired length with the possibility to use a restricted charset.

**Kind**: static method of [<code>random</code>](#random)  
**Returns**: <code>String</code> - - Random string  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>Number</code> | The length of the returned string |
| charset | <code>String</code> | The charset used to generate the random string, optional. |

<a name="string"></a>

## string : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="test"></a>

## test : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="trigo"></a>

## trigo : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="type"></a>

## type : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="xml"></a>

## xml : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="url"></a>

## url : [<code>object</code>](#object)
**Kind**: global namespace  
<a name="utf8"></a>

## utf8 : [<code>object</code>](#object)
**Kind**: global namespace  
