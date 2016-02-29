﻿/**
 * 性能优化版
 */
(function (global, undefined) {
    if (global.RongIMClient) {
        return;
    }
    /**
     * 生产枚举对象
     */
    var RongIMEnum = function (namesToValues) {
        var enumeration = function () {
            throw "can't Instantiate Enumerations";
        };
        enumeration.setValue = function (x) {
            var val = null;
            enumeration.foreach(function (i) {
                if (i.value == x || i.name == x) {
                    val = enumeration[i.name];
                }
            }, null);
            return val;
        };

        function inherit(superCtor) {
            var ctor = function () {
            };
            ctor.prototype = superCtor;
            return new ctor;
        };

        var proto = enumeration.prototype = {
            constructor: enumeration,
            toString: function () {
                return this.name;
            },
            valueOf: function () {
                return this.value;
            },
            toJSON: function () {
                return this.name;
            }
        };

        enumeration.values = [];

        for (var _name in namesToValues) {
            var e = inherit(proto);
            e.name = _name;
            e.value = namesToValues[_name];
            enumeration[_name] = e;
            enumeration.values.push(e);

        }

        enumeration.foreach = function (f, c) {
            for (var i = 0,len=this.values.length; i < len; i++) {
                f.call(c, this.values[i]);
            }
        };

        return enumeration;

    };
    /**
     * MD5帮助函数
     * */
    var MD5 = function (e) {
        function n(d) {
            for (var a = 0, b = ""; 3 >= a; a++)b += "0123456789abcdef".charAt(d >> 8 * a + 4 & 15) + "0123456789abcdef".charAt(d >> 8 * a & 15);
            return b
        }

        function m(a, b) {
            var d = (a & 65535) + (b & 65535);
            return(a >> 16) + (b >> 16) + (d >> 16) << 16 | d & 65535
        }

        function h(a, b, d, c, e, f) {
            a = m(m(b, a), m(c, f));
            return m(a << e | a >>> 32 - e, d)
        }

        function g(a, b, d, c, e, f, g) {
            return h(b & d | ~b & c, a, b, e, f, g)
        }

        function k(a, b, d, c, e, f, g) {
            return h(b & c | d & ~c, a, b, e, f, g)
        }

        function l(a, b, d, c, e, f, g) {
            return h(d ^ (b | ~c), a, b, e, f, g)
        }

        e = function (a) {
            for (var b =
                (a.length + 8 >> 6) + 1, d = Array(16 * b), c = 0; c < 16 * b; c++)d[c] = 0;
            for (c = 0; c < a.length; c++)d[c >> 2] |= a.charCodeAt(c) << c % 4 * 8;
            d[c >> 2] |= 128 << c % 4 * 8;
            d[16 * b - 2] = 8 * a.length;
            return d
        }(e);
        for (var d = 1732584193, a = -271733879, b = -1732584194, c = 271733878, f = 0; f < e.length; f += 16)var p = d, q = a, r = b, t = c, d = g(d, a, b, c, e[f + 0], 7, -680876936), c = g(c, d, a, b, e[f + 1], 12, -389564586), b = g(b, c, d, a, e[f + 2], 17, 606105819), a = g(a, b, c, d, e[f + 3], 22, -1044525330), d = g(d, a, b, c, e[f + 4], 7, -176418897), c = g(c, d, a, b, e[f + 5], 12, 1200080426), b = g(b, c, d, a, e[f + 6], 17, -1473231341),
            a = g(a, b, c, d, e[f + 7], 22, -45705983), d = g(d, a, b, c, e[f + 8], 7, 1770035416), c = g(c, d, a, b, e[f + 9], 12, -1958414417), b = g(b, c, d, a, e[f + 10], 17, -42063), a = g(a, b, c, d, e[f + 11], 22, -1990404162), d = g(d, a, b, c, e[f + 12], 7, 1804603682), c = g(c, d, a, b, e[f + 13], 12, -40341101), b = g(b, c, d, a, e[f + 14], 17, -1502002290), a = g(a, b, c, d, e[f + 15], 22, 1236535329), d = k(d, a, b, c, e[f + 1], 5, -165796510), c = k(c, d, a, b, e[f + 6], 9, -1069501632), b = k(b, c, d, a, e[f + 11], 14, 643717713), a = k(a, b, c, d, e[f + 0], 20, -373897302), d = k(d, a, b, c, e[f + 5], 5, -701558691), c = k(c, d, a, b, e[f + 10], 9, 38016083),
            b = k(b, c, d, a, e[f + 15], 14, -660478335), a = k(a, b, c, d, e[f + 4], 20, -405537848), d = k(d, a, b, c, e[f + 9], 5, 568446438), c = k(c, d, a, b, e[f + 14], 9, -1019803690), b = k(b, c, d, a, e[f + 3], 14, -187363961), a = k(a, b, c, d, e[f + 8], 20, 1163531501), d = k(d, a, b, c, e[f + 13], 5, -1444681467), c = k(c, d, a, b, e[f + 2], 9, -51403784), b = k(b, c, d, a, e[f + 7], 14, 1735328473), a = k(a, b, c, d, e[f + 12], 20, -1926607734), d = h(a ^ b ^ c, d, a, e[f + 5], 4, -378558), c = h(d ^ a ^ b, c, d, e[f + 8], 11, -2022574463), b = h(c ^ d ^ a, b, c, e[f + 11], 16, 1839030562), a = h(b ^ c ^ d, a, b, e[f + 14], 23, -35309556), d = h(a ^ b ^ c, d, a, e[f +
                1], 4, -1530992060), c = h(d ^ a ^ b, c, d, e[f + 4], 11, 1272893353), b = h(c ^ d ^ a, b, c, e[f + 7], 16, -155497632), a = h(b ^ c ^ d, a, b, e[f + 10], 23, -1094730640), d = h(a ^ b ^ c, d, a, e[f + 13], 4, 681279174), c = h(d ^ a ^ b, c, d, e[f + 0], 11, -358537222), b = h(c ^ d ^ a, b, c, e[f + 3], 16, -722521979), a = h(b ^ c ^ d, a, b, e[f + 6], 23, 76029189), d = h(a ^ b ^ c, d, a, e[f + 9], 4, -640364487), c = h(d ^ a ^ b, c, d, e[f + 12], 11, -421815835), b = h(c ^ d ^ a, b, c, e[f + 15], 16, 530742520), a = h(b ^ c ^ d, a, b, e[f + 2], 23, -995338651), d = l(d, a, b, c, e[f + 0], 6, -198630844), c = l(c, d, a, b, e[f + 7], 10, 1126891415), b = l(b, c, d, a, e[f + 14], 15,
                -1416354905), a = l(a, b, c, d, e[f + 5], 21, -57434055), d = l(d, a, b, c, e[f + 12], 6, 1700485571), c = l(c, d, a, b, e[f + 3], 10, -1894986606), b = l(b, c, d, a, e[f + 10], 15, -1051523), a = l(a, b, c, d, e[f + 1], 21, -2054922799), d = l(d, a, b, c, e[f + 8], 6, 1873313359), c = l(c, d, a, b, e[f + 15], 10, -30611744), b = l(b, c, d, a, e[f + 6], 15, -1560198380), a = l(a, b, c, d, e[f + 13], 21, 1309151649), d = l(d, a, b, c, e[f + 4], 6, -145523070), c = l(c, d, a, b, e[f + 11], 10, -1120210379), b = l(b, c, d, a, e[f + 2], 15, 718787259), a = l(a, b, c, d, e[f + 9], 21, -343485551), d = m(d, p), a = m(a, q), b = m(b, r), c = m(c, t);
        return n(d) +
            n(a) + n(b) + n(c)
    };
    /**
     * IO通道对象
     * */
    var io = {
            //io帮助对象
            util: {
                //注册页面加载事件
                load: function (fn) {
                    if (document.readyState == "complete" || io.util._pageLoaded) {
                        return fn()
                    }
                    if (global.attachEvent) {
                        global.attachEvent("onload", fn)
                    } else {
                        global.addEventListener("load", fn, false)
                    }
                },
                //继承
                inherit: function (ctor, superCtor) {
                    for (var i in superCtor.prototype) {
                        ctor.prototype[i] = superCtor.prototype[i]
                    }
                },
                //扩展
                _extends: function (one, two) {
                    one.prototype = new two;
                    one.prototype.constructor = one;
                },
                //查找数组中位于指定下标的元素
                indexOf: function (arr, item, from) {
                    for (var l = arr.length, i = (from < 0) ? Math.max(0, +from) : from || 0; i < l; i++) {
                        if (arr[i] == item) {
                            return i
                        }
                    }
                    return -1
                },
                //判断是否为数组
                isArray: function (obj) {
                    return Object.prototype.toString.call(obj) == "[object Array]";
                },
                //遍历，只能遍历数组
                forEach: (function () {
                    if ([].forEach) {
                        return function (arr, func) {
                            [].forEach.call(arr, func)
                        }
                    } else {
                        return function (arr, func) {
                            for (var i = 0,len= arr.length; i < len; i++) {
                                func.call(arr, arr[i], i, arr);
                            }
                        }
                    }
                })(),
                //遍历，可遍历对象也可遍历数组
                each: function (obj, callback) {
                    if (this.isArray(obj)) {
                        this.forEach(x, callback);
                    } else {
                        for (var _name in obj) {
                            if (obj.hasOwnProperty(_name)) {
                                callback.call(obj, _name, obj[_name]);
                            }
                        }
                    }
                },
                //合并
                merge: function (target, additional) {
                    for (var i in additional) {
                        if (additional.hasOwnProperty(i)) {
                            target[i] = additional[i]
                        }
                    }
                },
                //把类数组转换为数组
                arrayFrom: function (typedarray) {
                    if (Object.prototype.toString.call(typedarray) == "[object ArrayBuffer]") {
                        var arr = new Int8Array(typedarray);
                        return [].slice.call(arr)
                    }
                    return typedarray;
                },
                arrayFromInput: function(typedarray) {
                    if (Object.prototype.toString.call(typedarray) == "[object ArrayBuffer]") {
                        var arr = new Uint8Array(typedarray);
                        return arr;
                    }
                    return typedarray;
                },
                //删除数组指定项
                remove: function (array, func) {
                    for (var i = 0,len =array.length; i < len; i++) {
                        if (func(array[i])) {
                            return array.splice(i, 1)[0]
                        }
                    }
                    return null
                },
                //把int64的时间对象转为时间戳
                int64ToTimestamp: function (obj, isDate) {
                    if (obj.low === undefined) {
                        return obj;
                    }
                    var low = obj.low;
                    if (low < 0) {
                        low += 0xffffffff + 1;
                    }
                    low = low.toString(16);
                    var timestamp = parseInt(obj.high.toString(16) + "00000000".replace(new RegExp('0{' + low.length + '}$'), low), 16);
                    if (isDate) {
                        return new Date(timestamp)
                    }
                    return timestamp;
                },
                //是否为ios
                ios: /iphone|ipad/i.test(navigator.userAgent),
                //是否为安卓
                android: /android/i.test(navigator.userAgent)
            }
        }
    //feature detection 功能判断，DOM加载完成时执行此方法
        , func = function () {
            var script = document.createElement("script"), head = document.getElementsByTagName("head")[0];
            //此属性为通道标识。根据这个标识生产通道对象，默认为websocket
            io._TransportType = "websocket";
            //当前浏览器是否支持webSocket，并且window.WEB_SOCKET_FORCE_FLASH 和 !window.WEB_XHR_POLLING都是false
            if ("WebSocket" in global && "ArrayBuffer" in global && WebSocket.prototype.CLOSED === 3 && !global.WEB_SOCKET_FORCE_FLASH && !global.WEB_XHR_POLLING) {
                //加载protobuf
                script.src = "http://res.websdk.rongcloud.cn/protobuf-0.3.min.js";
                // script.src = "js/protobuf.js";
                //是否支持flash widget
            } else if (!/opera/i.test(navigator.userAgent) && !global.WEB_XHR_POLLING && (function () {
                if ('navigator' in global && 'plugins' in navigator && navigator.plugins['Shockwave Flash']) {
                    return !!navigator.plugins['Shockwave Flash'].description;
                }
                if ('ActiveXObject' in global) {
                    try {
                        return !!new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
                    } catch (e) {
                    }
                }
                return false;
            })()) {
                //加载flash widget帮助库
                script.src = "http://res.websdk.rongcloud.cn/swfobject-0.2.min.js";
            } else {
                //如果上述条件都不支持则执行comet逻辑
                io._TransportType = "xhr-polling";
                //加载comet帮助库
                // script.src = "js/xhrpolling.js";
                script.src="http://res.websdk.rongcloud.cn/xhrpolling-0.3.min.js";
            }
            head.appendChild(script);
            //此方法判断是否设置FORCE_LOCAL_STORAGE为true，如果是true则在localstorage中存储。否则在cookie中存储。
            io.util.cookieHelper = (function () {
                var obj, old;
                if (window.FORCE_LOCAL_STORAGE === true) {
                    old = localStorage.setItem;
                    localStorage.setItem = function (x, value) {
                        if (localStorage.length == 15) {
                            localStorage.removeItem(localStorage.key(0));
                        }
                        old.call(localStorage, x, value);
                    };
                    obj = localStorage;
                } else {
                    obj = {
                        getItem: function (x) {
                            x = x.replace(/\|/, '\\|');
                            var arr = document.cookie.match(new RegExp("(^| )" + x + "=([^;]*)(;|$)"));
                            if (arr != null) {
                                return (arr[2]);
                            }
                            return null;
                        },
                        setItem: function (x, value) {
                            var exp = new Date();
                            exp.setTime(exp.getTime() + 15 * 24 * 3600 * 1000);
                            document.cookie = x + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
                        },
                        removeItem: function (x) {
                            if (this.getItem(x)) {
                                document.cookie = x + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
                            }
                        },
                        clear: function () {
                            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                            if (keys) {
                                for (var i = keys.length; i--;)
                                    document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
                            }
                        }
                    }
                }
                return obj;
            })();
            //获取消息id标识符对象，如果是comet消息通道就将messageid放入本地存储(localstorage或cookie)中。其他消息通道则放入内存中。
            io.messageIdHandler = (function () {
                var messageId = 0,
                    isXHR = io._TransportType === "xhr-polling",
                    init = function () {
                        messageId = +(io.util.cookieHelper.getItem("msgId") || io.util.cookieHelper.setItem("msgId", 0) || 0);
                    };
                isXHR && init();
                return {
                    //messageid 加一并返回
                    messageIdPlus: function (method) {
                        isXHR && init();
                        if (messageId >= 65535) {
                            method();
                            return false;
                        }
                        messageId++;
                        isXHR && io.util.cookieHelper.setItem("msgId", messageId);
                        return messageId;
                    },
                    //清空messageid
                    clearMessageId: function () {
                        messageId = 0;
                        isXHR && io.util.cookieHelper.setItem("msgId", messageId);
                    },
                    //返回当前messageid
                    getMessageId: function () {
                        isXHR && init();
                        return messageId;
                    }
                }
            })();

        };
//register ready event 判断页面加载状态，执行func方法
    if (document.readyState == "interactive" || document.readyState == "complete") {
        func();
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            func();
        }, false)
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "interactive" || document.readyState === "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                func()
            }
        })
    }
//binary helper object 二进制帮助对象。RongBinaryHelper在flash widget的js中(swfobject-0.2.js)有用到。修改时请注意
    var binaryHelper = global.RongBinaryHelper = {
        //将传入的数组每一项转为数字类型。因为在ie中每一项是个字符串，所以需要执行此方法。
        init: function (array) {
            var len=array.length;
            for (var i = 0; i < len; i++) {
                array[i] *= 1;
                if (array[i] < 0) {
                    array[i] += 256
                }
            }
            return array
        },
        writeUTF: function (str, isGetBytes) {
            var back = [],
                byteSize = 0;
            for (var i = 0,len = str.length; i < len; i++) {
                var code = str.charCodeAt(i);
                if (code >= 0 && code <= 127) {
                    byteSize += 1;
                    back.push(code);
                } else if (code >= 128 && code <= 2047) {
                    byteSize += 2;
                    back.push((192 | (31 & (code >> 6))));
                    back.push((128 | (63 & code)))
                } else if (code >= 2048 && code <= 65535) {
                    byteSize += 3;
                    back.push((224 | (15 & (code >> 12))));
                    back.push((128 | (63 & (code >> 6))));
                    back.push((128 | (63 & code)))
                }
            }
            for (i = 0,len = back.length; i < len; i++) {
                if (back[i] > 255) {
                    back[i] &= 255
                }
            }
            if (isGetBytes) {
                return back
            }
            if (byteSize <= 255) {
                return [0, byteSize].concat(back);
            } else {
                return [byteSize >> 8, byteSize & 255].concat(back);
            }
        },
        readUTF: function (_arr) {
            if (Object.prototype.toString.call(_arr) == "[object String]") {
                return _arr;
            }
            var UTF = "";
            for (var i = 0,len = _arr.length; i < len; i++) {
                var temp = _arr[i];
                if(temp<0){
                    temp+=256;
                }
                var one = temp.toString(2), v = one.match(/^1+?(?=0)/);
                if (v && one.length == 8) {
                    var bytesLength = v[0].length,store = one.slice(7 - bytesLength);
                    for (var st = 1; st < bytesLength; st++) {
                        store += _arr[st + i].toString(2).slice(2);
                    }
                    UTF += String.fromCharCode(parseInt(store, 2));
                    i += bytesLength - 1;
                } else {
                    UTF += String.fromCharCode(temp);
                }
            }
            return UTF
        },
        //将参数转化为RongIMStream对象
        convertStream: function (x) {
            if (x instanceof RongIMStreamUtil) {
                return x
            } else {
                return new RongIMStreamUtil(x)
            }
        },
        toMQttString: function (str) {
            return this.writeUTF(str)
        }
    };
    //operation stream object 融云消息类stream对象。用于处理字节
    var RongIMStreamUtil = function (arr) {
        this.position = 0;
        this.writen = 0;
        var pool=arr,self = this,poolLen=pool.length;
        check = function () {
            return self.position >= poolLen
        };
        this.readInt = function () {
            if (check()) {
                return -1
            }
            var end = "";
            for (var i = 0; i < 4; i++) {
                end += pool[this.position++].toString(16);
            }
            return parseInt(end, 16);
        };
        this.readLong = function () {
            if (check()) {
                return -1
            }
            var end = "";
            for (var i = 0; i < 8; i++) {
                var t = pool[this.position++].toString(16);
                if (t.length == 1 && i > 1) {
                    t = "0" + t;
                }
                end += t;
            }
            return parseInt(end, 16);
        };
        this.readUTF = function () {
            if (check()) {
                return -1
            }
            var big = (this.readByte() << 8) | this.readByte();
            return binaryHelper.readUTF(pool.subarray(this.position, this.position += big));
        };

        this.readByte = function () {
            if (check()) {
                return -1;
            }
            var val = pool[this.position++];
            return val;
        };
        this.read = function (bytesArray) {
            if (bytesArray) {
                return pool.subarray(this.position,poolLen);
            } else {
                return this.readByte();
            }
        };
        this.write = function (_byte) {
            var b = _byte;
            if (Object.prototype.toString.call(b).toLowerCase() == "[object array]") {
                [].push.apply(pool, b)
            } else {
                if (+b == b) {
                    if (b > 255) {
                        b &= 255;
                    }
                    pool.push(b);
                    this.writen++
                }
            }
            return b;
        };
        this.writeUTF = function (str) {
            var val = binaryHelper.writeUTF(str);
            [].push.apply(pool, val);
            this.writen += val.length;
        };
        this.toComplements = function () {
            var _tPool = pool;
            for (var i = 0, poolLen = _tPool.length; i < poolLen; i++) {
                if (_tPool[i] > 128) {
                    _tPool[i] -= 256
                }
            }
            return _tPool
        };
        this.getBytesArray = function (isCom) {
            if (isCom) {
                return this.toComplements()
            }
            return pool
        };

    };


//construct transfer message object as below 内置枚举对象
    var Qos = RongIMEnum({AT_MOST_ONCE: 0, AT_LEAST_ONCE: 1, EXACTLY_ONCE: 2, DEFAULT: 3}),
        Type = RongIMEnum({CONNECT: 1, CONNACK: 2, PUBLISH: 3, PUBACK: 4, QUERY: 5, QUERYACK: 6, QUERYCON: 7, SUBSCRIBE: 8, SUBACK: 9, UNSUBSCRIBE: 10, UNSUBACK: 11, PINGREQ: 12, PINGRESP: 13, DISCONNECT: 14}),
        DisconnectionStatus = RongIMEnum({RECONNECT: 0, OTHER_DEVICE_LOGIN: 1, CLOSURE: 2, UNKNOWN_ERROR: 3, LOGOUT: 4, BLOCK: 5}),
        ConnectionState = RongIMEnum({ACCEPTED: 0, UNACCEPTABLE_PROTOCOL_VERSION: 1, IDENTIFIER_REJECTED: 2, SERVER_UNAVAILABLE: 3, TOKEN_INCORRECT: 4, NOT_AUTHORIZED: 5, REDIRECT: 6, PACKAGE_ERROR: 7, APP_BLOCK_OR_DELETE: 8, BLOCK: 9, TOKEN_EXPIRE: 10, DEVICE_ERROR: 11});

    /**
     * 消息类，对java逻辑的重新实现
     * */
    function Message(argu) {
        var _header, _headerCode, lengthSize = 0;
        if (argu instanceof Header) {
            _header = argu
        } else {
            _header = new Header(argu, false, Qos.AT_MOST_ONCE, false)
        }
        this.read = function (In, length) {
            this.readMessage(In, length)
        };
        this.write = function (Out) {
            var out = binaryHelper.convertStream(Out);
            _headerCode = this.getHeaderFlag();
            out.write(_headerCode);
            this.writeMessage(out);
            return out
        };
        this.getHeaderFlag = function () {
            return _header.encode();
        };
        this.getLengthSize = function () {
            return lengthSize
        };
        this.toBytes = function () {
            return this.write([]).getBytesArray()
        };
        this.setRetained = function (retain) {
            _header.retain = retain
        };
        this.isRetained = function () {
            return _header.retain
        };
        this.setQos = function (qos) {
            _header.qos = qos instanceof Qos ? qos : Qos.setValue(qos);
        };
        this.getQos = function () {
            return _header.qos
        };
        this.setDup = function (dup) {
            _header.dup = dup
        };
        this.isDup = function () {
            return _header.dup
        };
        this.getType = function () {
            return _header.type
        };
        this.messageLength = function () {
            return 0
        };
        this.writeMessage = function (out) {
        };
        this.readMessage = function (In) {
        };
        this.init = function (args) {
            var valName,nana;
            for (nana in args) {
                if (!args.hasOwnProperty(nana))
                    continue;
                valName=nana.replace(/^\w/,function(x){
                    var tt=x.charCodeAt(0);
                    return 'set'+(tt>=0x61?String.fromCharCode(tt & ~32):x)
                });
                if (valName in this) {
                    this[valName](args[nana])
                }
            }
        };
    }

    Message._name = "Message";

    function Header(_type, _retain, _qos, _dup) {
        this.type = null;
        this.retain = false;
        this.qos = Qos.AT_LEAST_ONCE;
        this.dup = false;
        if (_type && +_type == _type && arguments.length == 1) {
            this.retain = (_type & 1) > 0;
            this.qos = Qos.setValue((_type & 6) >> 1);
            this.dup = (_type & 8) > 0;
            this.type = Type.setValue((_type >> 4) & 15);
        } else {
            this.type = Type.setValue(_type);
            this.retain = _retain;
            this.qos = Qos.setValue(_qos);
            this.dup = _dup;
        }
        this.getType = function () {
            return this.type
        };
        this.encode = function () {
            var _byte = (this.type << 4);
            _byte |= this.retain ? 1 : 0;
            _byte |= this.qos << 1;
            _byte |= this.dup ? 8 : 0;
            return _byte
        };
        this.toString = function () {
            return "Header [type=" + this.type + ",retain=" + this.retain + ",qos=" + this.qos + ",dup=" + this.dup + "]"
        }
    }

    function ConnectMessage() {
        var CONNECT_HEADER_SIZE = 12,
            protocolId = "RCloud",
            protocolVersion = 3,
            clientId, keepAlive, appId, token, cleanSession, willTopic, will, willQos, retainWill, hasAppId, hasToken, hasWill;
        switch (arguments.length) {
            case 0:
                Message.call(this, Type.CONNECT);
                break;
            case 1:
                Message.call(this, arguments[0]);
                break;
            case 3:
                Message.call(this, Type.CONNECT);
                if (!arguments[0] || arguments[0].length > 64) {
                    throw new Error("ConnectMessage:Client Id cannot be null and must be at most 64 characters long: " + arguments[0])
                }
                clientId = arguments[0];
                cleanSession = arguments[1];
                keepAlive = arguments[2];
                break
        }
        this.messageLength = function () {
            var payloadSize = binaryHelper.toMQttString(clientId).length;
            payloadSize += binaryHelper.toMQttString(willTopic).length;
            payloadSize += binaryHelper.toMQttString(will).length;
            payloadSize += binaryHelper.toMQttString(appId).length;
            payloadSize += binaryHelper.toMQttString(token).length;
            return payloadSize + CONNECT_HEADER_SIZE
        };
        this.readMessage = function (In) {
            var stream = binaryHelper.convertStream(In);
            protocolId = stream.readUTF();
            protocolVersion = stream.readByte();
            var cFlags = stream.readByte();
            hasAppId = (cFlags & 128) > 0;
            hasToken = (cFlags & 64) > 0;
            retainWill = (cFlags & 32) > 0;
            willQos = cFlags >> 3 & 3;
            hasWill = (cFlags & 4) > 0;
            cleanSession = (cFlags & 32) > 0;
            keepAlive = stream.read() * 256 + stream.read();
            clientId = stream.readUTF();
            if (hasWill) {
                willTopic = stream.readUTF();
                will = stream.readUTF()
            }
            if (hasAppId) {
                try {
                    appId = stream.readUTF()
                } catch (ex) {
                }
            }
            if (hasToken) {
                try {
                    token = stream.readUTF()
                } catch (ex) {
                }
            }
            return stream
        };
        this.writeMessage = function (out) {
            var stream = binaryHelper.convertStream(out);
            stream.writeUTF(protocolId);
            stream.write(protocolVersion);
            var flags = cleanSession ? 2 : 0;
            flags |= hasWill ? 4 : 0;
            flags |= willQos ? willQos >> 3 : 0;
            flags |= retainWill ? 32 : 0;
            flags |= hasToken ? 64 : 0;
            flags |= hasAppId ? 128 : 0;
            stream.write(flags);
            stream.writeChar(keepAlive);
            stream.writeUTF(clientId);
            if (hasWill) {
                stream.writeUTF(willTopic);
                stream.writeUTF(will)
            }
            if (hasAppId) {
                stream.writeUTF(appId)
            }
            if (hasToken) {
                stream.writeUTF(token)
            }
            return stream
        };

    }

    ConnectMessage._name = "ConnectMessage";
    io.util._extends(ConnectMessage, Message);

    function ConnAckMessage() {
        var status, userId,timestamp = 0, MESSAGE_LENGTH = 2;
        switch (arguments.length) {
            case 0:
                Message.call(this, Type.CONNACK);
                break;
            case 1:
                if (arguments[0] instanceof Header) {
                    Message.call(this, arguments[0])
                } else {
                    if (arguments[0] instanceof ConnectionState) {
                        Message.call(this, Type.CONNACK);
                        if (arguments[0] == null) {
                            throw new Error("ConnAckMessage:The status of ConnAskMessage can't be null")
                        }
                        status = arguments[0]
                    }
                }
        }
        this.messageLength = function () {
            var length = MESSAGE_LENGTH;
            if (userId) {
                length += binaryHelper.toMQttString(userId).length
            }
            return length
        };
        this.readMessage = function (In, msglength) {
            var stream = binaryHelper.convertStream(In);
            stream.read();
            var result = +stream.read();
            if (result >= 0 && result <= 9) {
                this.setStatus(result);
            } else {
                throw new Error("Unsupported CONNACK code:" + result)
            }
            if (msglength > MESSAGE_LENGTH) {
                this.setUserId(stream.readUTF());
                var sessionId = stream.readUTF();
                var timestamp = stream.readLong();
                this.setTimestamp(timestamp);
            }
        };
        this.writeMessage = function (out) {
            var stream = binaryHelper.convertStream(out);
            stream.write(128);
            switch (+status) {
                case 0:
                case 1:
                case 2:
                case 5:
                case 6:
                    stream.write(+status);
                    break;
                case 3:
                case 4:
                    stream.write(3);
                    break;
                default:
                    throw new Error("Unsupported CONNACK code:" + status);
            }
            if (userId) {
                stream.writeUTF(userId)
            }
            return stream
        };
        this.getStatus = function () {
            return status
        };
        this.setStatus = function (x) {
            status = x instanceof ConnectionState ? x : ConnectionState.setValue(x);
        };
        this.setTimestamp = function(x){
            timestamp = x;
        }
        this.getTimestamp = function(){
            return timestamp;
        }
        this.setUserId = function (_userId) {
            userId = _userId
        };
        this.getUserId = function () {
            return userId
        };
    }

    ConnAckMessage._name = "ConnAckMessage";
    io.util._extends(ConnAckMessage, Message);

    function DisconnectMessage(one) {
        var status;
        this.MESSAGE_LENGTH = 2;
        if (one instanceof Header) {
            Message.call(this, one)
        } else {
            Message.call(this, Type.DISCONNECT);
            if (one instanceof DisconnectionStatus) {
                status = one
            }
        }
        this.messageLength = function () {
            return this.MESSAGE_LENGTH
        };
        this.readMessage = function (In) {
            var _in = binaryHelper.convertStream(In);
            _in.read();
            var result = +_in.read();
            if (result >= 0 && result <= 5) {
                this.setStatus(result);
            } else {
                throw new Error("Unsupported CONNACK code:" + result)
            }
        };
        this.writeMessage = function (Out) {
            var out = binaryHelper.convertStream(Out);
            out.write(0);
            if (+status >= 1 && +status <= 3) {
                out.write((+status) - 1);
            } else {
                throw new Error("Unsupported CONNACK code:" + status)
            }
        };
        this.setStatus = function (x) {
            status = x instanceof DisconnectionStatus ? x : DisconnectionStatus.setValue(x);
        };
        this.getStatus = function () {
            return status
        };
    }

    DisconnectMessage._name = "DisconnectMessage";
    io.util._extends(DisconnectMessage, Message);

    function PingReqMessage(header) {
        if (header && header instanceof Header) {
            Message.call(this, header)
        } else {
            Message.call(this, Type.PINGREQ)
        }
    }

    PingReqMessage._name = "PingReqMessage";
    io.util._extends(PingReqMessage, Message);

    function PingRespMessage(header) {
        if (header && header instanceof Header) {
            Message.call(this, header)
        } else {
            Message.call(this, Type.PINGRESP)
        }
    }

    PingRespMessage._name = "PingRespMessage";
    io.util._extends(PingRespMessage, Message);

    function RetryableMessage(argu) {
        var messageId;
        Message.call(this, argu);
        this.messageLength = function () {
            return 2
        };
        this.writeMessage = function (Out) {
            var out = binaryHelper.convertStream(Out),
                Id = this.getMessageId(),
                lsb = Id & 255,
                msb = (Id & 65280) >> 8;
            out.write(msb);
            out.write(lsb);
            return out
        };
        this.readMessage = function (In) {
            var _in = binaryHelper.convertStream(In),
                msgId = _in.read() * 256 + _in.read();
            this.setMessageId(parseInt(msgId, 10));
        };
        this.setMessageId = function (_messageId) {
            messageId = _messageId
        };
        this.getMessageId = function () {
            return messageId
        }
    }

    RetryableMessage._name = "RetryableMessage";
    io.util._extends(RetryableMessage, Message);

    function PubAckMessage(args) {
        var status, msgLen = 2,
            date = 0,messageUId,timestamp = 0,millisecond = 0;
        if (args instanceof Header) {
            RetryableMessage.call(this, args)
        } else {
            RetryableMessage.call(this, Type.PUBACK);
            this.setMessageId(args)
        }
        this.messageLength = function () {
            return msgLen
        };
        this.writeMessage = function (Out) {
            var out = binaryHelper.convertStream(Out);
            PubAckMessage.prototype.writeMessage.call(this, out)
        };
        this.readMessage = function (In) {
            var _in = binaryHelper.convertStream(In);
            PubAckMessage.prototype.readMessage.call(this, _in);
            date = _in.readInt();
            status = _in.read() * 256 + _in.read();
            millisecond =  _in.read() * 256 + _in.read();
            timestamp = date * 1000 + millisecond;
            messageUId = _in.readUTF();
        };
        this.setStatus = function (x) {
            status = x;
        };
        this.getStatus = function () {
            return status;
        };
        this.setTimestamp = function(x){
          timestamp = x;
        };
        this.setMessageUId = function(x){
          messageUId = x;
        };
        this.getMessageUId = function(){
          return messageUId;
        };
        this.getTimestamp = function(){
            return timestamp;
        };
        this.getDate = function () {
            return date
        };
    };

    PubAckMessage._name = "PubAckMessage";
    io.util._extends(PubAckMessage, RetryableMessage);

    function PublishMessage(one, two, three) {
        var topic, data, targetId, date;
        if (arguments.length == 1 && one instanceof Header) {
            RetryableMessage.call(this, one)
        } else {
            if (arguments.length == 3) {
                RetryableMessage.call(this, Type.PUBLISH);
                topic = one;
                targetId = three;
                data = typeof two == "string" ? binaryHelper.toMQttString(two) : two;
            }
        }
        this.messageLength = function () {
            var length = 10;
            length += binaryHelper.toMQttString(topic).length;
            length += binaryHelper.toMQttString(targetId).length;
            length += data.length;
            return length
        };
        this.writeMessage = function (Out) {
            var out = binaryHelper.convertStream(Out);
            out.writeUTF(topic);
            out.writeUTF(targetId);
            PublishMessage.prototype.writeMessage.apply(this, arguments);
            out.write(data)
        };
        this.readMessage = function (In, msgLength) {
            var pos = 6,
                _in = binaryHelper.convertStream(In);
            date = _in.readInt();
            topic = _in.readUTF();
            pos += binaryHelper.toMQttString(topic).length;
            targetId = _in.readUTF();
            pos += binaryHelper.toMQttString(targetId).length;
            PublishMessage.prototype.readMessage.apply(this, arguments);
            data = new Array(msgLength - pos);
            data = _in.read(data)
        };
        this.setTopic = function (x) {
            topic = x;
        };
        this.setData = function (x) {
            data = x;
        };
        this.setTargetId = function (x) {
            targetId = x;
        };
        this.setDate = function (x) {
            date = x;
        };
        this.setData = function (x) {
            data = x;
        };
        this.getTopic = function () {
            return topic
        };
        this.getData = function () {
            return data
        };
        this.getTargetId = function () {
            return targetId
        };
        this.getDate = function () {
            return date
        }
    }

    PublishMessage._name = "PublishMessage";
    io.util._extends(PublishMessage, RetryableMessage);

    function QueryMessage(one, two, three) {
        var topic, data, targetId;
        if (one instanceof Header) {
            RetryableMessage.call(this, one)
        } else {
            if (arguments.length == 3) {
                RetryableMessage.call(this, Type.QUERY);
                data = typeof two == "string" ? binaryHelper.toMQttString(two) : two;
                topic = one;
                targetId = three;
            }
        }
        this.messageLength = function () {
            var length = 0;
            length += binaryHelper.toMQttString(topic).length;
            length += binaryHelper.toMQttString(targetId).length;
            length += 2;
            length += data.length;
            return length
        };
        this.writeMessage = function (Out) {
            var out = binaryHelper.convertStream(Out);
            out.writeUTF(topic);
            out.writeUTF(targetId);
            this.constructor.prototype.writeMessage.call(this, out);
            out.write(data)
        };
        this.readMessage = function (In, msgLength) {
            var pos = 0,
                _in = binaryHelper.convertStream(In);
            topic = _in.readUTF();
            targetId = _in.readUTF();
            pos += binaryHelper.toMQttString(topic).length;
            pos += binaryHelper.toMQttString(targetId).length;
            this.constructor.prototype.readMessage.apply(this, arguments);
            pos += 2;
            data = new Array(msgLength - pos);
            _in.read(data)
        };
        this.setTopic = function (x) {
            topic = x;
        };
        this.setData = function (x) {
            data = x;
        };
        this.setTargetId = function (x) {
            targetId = x;
        };
        this.getTopic = function () {
            return topic
        };
        this.getData = function () {
            return data
        };
        this.getTargetId = function () {
            return targetId
        };
    }

    QueryMessage._name = "QueryMessage";
    io.util._extends(QueryMessage, RetryableMessage);

    function QueryConMessage(messageId) {
        if (messageId instanceof Header) {
            RetryableMessage.call(this, messageId)
        } else {
            RetryableMessage.call(this, Type.QUERYCON);
            this.setMessageId(messageId)
        }
    }

    QueryConMessage._name = "QueryConMessage";
    io.util._extends(QueryConMessage, RetryableMessage);

    function QueryAckMessage(header) {
        var data, status, date;
        RetryableMessage.call(this, header);
        this.readMessage = function (In, msgLength) {
            var _in = binaryHelper.convertStream(In);
            QueryAckMessage.prototype.readMessage.call(this, _in);
            date = _in.readInt();
            status = _in.read() * 256 + _in.read();
            if (msgLength > 0) {
                data = new Array(msgLength - 8);
                data = _in.read(data)
            }
        };
        this.getStatus = function () {
            return status
        };
        this.getDate = function () {
            return date
        };
        this.setDate = function (x) {
            date = x;
        };
        this.setStatus = function (x) {
            status = x;
        };
        this.setData = function (x) {
            data = x;
        };
        this.getData = function () {
            return data
        };
    }

    QueryAckMessage._name = "QueryAckMessage";
    io.util._extends(QueryAckMessage, RetryableMessage);

//create message output stream for send to server  把消息对象写入到一个流中
    function MessageOutputStream(_out) {
        var out = binaryHelper.convertStream(_out);
        this.writeMessage = function (msg) {
            if (msg instanceof Message) {
                msg.write(out)
            }
        }
    }

//converted input stream to message object ,that was server send to client，把服务器返回的二进制流生成具体的消息对象
    function MessageInputStream(In, isPolling) {
        var flags, header, msg = null;
        if (!isPolling) {
            var _in = binaryHelper.convertStream(In);
            flags = _in.readByte();
        } else {
            flags = In["headerCode"];
        }
        header = new Header(flags);
        this.readMessage = function () {
            switch (+header.getType()) {
                case 2:
                    msg = new ConnAckMessage(header);
                    break;
                case 3:
                    msg = new PublishMessage(header);
                    break;
                case 4:
                    msg = new PubAckMessage(header);
                    break;
                case 5:
                    msg = new QueryMessage(header);
                    break;
                case 6:
                    msg = new QueryAckMessage(header);
                    break;
                case 7:
                    msg = new QueryConMessage(header);
                    break;
                case 9:
                case 11:
                case 13:
                    msg = new PingRespMessage(header);
                    break;
                case 1:
                    msg = new ConnectMessage(header);
                    break;
                case 8:
                case 10:
                case 12:
                    msg = new PingReqMessage(header);
                    break;
                case 14:
                    msg = new DisconnectMessage(header);
                    break;
                default:
                    throw new Error("No support for deserializing " + header.getType() + " messages")
            }
            if (isPolling) {
                msg.init(In);
            } else {
                msg.read(_in, In.length - 1);
            }
            return msg
        }
    }

//io is an object for I/O
//io.connect is an Singleton pattern  这是一个单例模式。用于连接服务器
    io.connect = function (token, args) {
        var instance = new this.createServer();
        this.getInstance = function () {
            return instance
        };
        instance.connect(token, args);
        return instance;
    };
//create utils for io  判断当前浏览器是否支持json操作对象，不支持的话就自己生成一个json操作对象
    (function () {
        io.util.load(function () {
            io.util._pageLoaded = true;
            if (!global.JSON) {
                global.JSON = {
                    parse: function (sJSON) {
                        return eval('(' + sJSON + ')');
                    },
                    stringify: (function () {
                        var toString = Object.prototype.toString;
                        var isArray = Array.isArray || function (a) {
                            return toString.call(a) === '[object Array]';
                        };
                        var escMap = {
                            '"': '\\"',
                            '\\': '\\\\',
                            '\b': '\\b',
                            '\f': '\\f',
                            '\n': '\\n',
                            '\r': '\\r',
                            '\t': '\\t'
                        };
                        var escFunc = function (m) {
                            return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
                        };
                        var escRE = new RegExp('[\\"' + unescape("%00-%1F%u2028%u2029") + ']', 'g');
                        return function stringify(value) {
                            if (value == null) {
                                return 'null';
                            } else if (typeof value === 'number') {
                                return isFinite(value) ? value.toString() : 'null';
                            } else if (typeof value === 'boolean') {
                                return value.toString();
                            } else if (typeof value === 'object') {
                                if (typeof value.toJSON === 'function') {
                                    return stringify(value.toJSON());
                                } else if (isArray(value)) {
                                    var res = '[';
                                    for (var i = 0,len = value.length; i < len; i++)
                                        res += (i ? ', ' : '') + stringify(value[i]);
                                    return res + ']';
                                } else if (toString.call(value) === '[object Object]') {
                                    var tmp = [];
                                    for (var k in value) {
                                        if (value.hasOwnProperty(k))
                                            tmp.push(stringify(k) + ': ' + stringify(value[k]));
                                    }
                                    return '{' + tmp.join(', ') + '}';
                                }
                            }
                            return '"' + value.toString().replace(escRE, escFunc) + '"';
                        };
                    })()
                };
            }

        });
    })();
//the base class of io 通道对象的基类，利用抽象工厂的设计模式生产出具体的通道对象
    (function () {
        var Transport = io.Transport = function (base, options) {
            this.base = base;
            this.options = {
                timeout: 30000
            };
            io.util.merge(this.options, options)
        };
        Transport.prototype.send = function () {
            throw new Error("No rewrite send() method")
        };
        Transport.prototype.connect = function () {
            throw new Error("No rewrite connect() method")
        };
        Transport.prototype.disconnect = function () {
            throw new Error("No rewrite disconnect() method")
        };
        //此方法只有comet用到
        Transport.prototype._encode = function (x) {
            var str = "?messageid=" + x.getMessageId() + "&header=" + x.getHeaderFlag() + "&sessionid=" + io.util.cookieHelper.getItem(Client.Endpoint.userId + "sId");
            if (!/(PubAckMessage|QueryConMessage)/.test(x.constructor._name)) {
                str += "&topic=" + x.getTopic() + "&targetid=" + (x.getTargetId() || "");
            }
            return {
                url: str,
                data: "getData" in x ? x.getData() : ""
            };
        };
        //转化服务器返回的二进制数组为一个具体的消息对象
        Transport.prototype._decode = function (data) {
            if (!data) {
                return;
            }
            if (io.util.isArray(data)) {
                this._onMessage(new MessageInputStream(data).readMessage());
            } else if (Object.prototype.toString.call(data) == "[object ArrayBuffer]") {
                this._onMessage(new MessageInputStream(io.util.arrayFromInput(data)).readMessage());
            }
        };
        //此方法只有comet用到。接收服务器返回的json对象
        Transport.prototype._onData = function (data, header) {
            if (!data || data == "lost params") {
                return;
            }
            if (header) {
                io.util.cookieHelper.getItem(Client.Endpoint.userId + "sId") || io.util.cookieHelper.setItem(Client.Endpoint.userId + "sId", header);
            }
            var self = this, val = JSON.parse(data);
            if (!io.util.isArray(val)) {
                val = [val];
            }
            io.util.forEach(val, function (x) {
                self._onMessage(new MessageInputStream(x, true).readMessage());
            });
        };
        Transport.prototype._onMessage = function (message) {
            this.base._onMessage(message)
        };
        Transport.prototype._onConnect = function () {
            this.connected = true;
            this.connecting = false;
            this.base._onConnect()
        };
        Transport.prototype._onDisconnect = function () {
            this.connecting = false;
            this.connected = false;
            this.base._onDisconnect()
        };
    })();
//build websocket class 创建websocket通道对象
    (function () {
        var WS = io.Transport.websocket = function () {
            io.Transport.apply(this, arguments)
        };
        io.util.inherit(WS, io.Transport);
        WS.prototype.type = "websocket";
        WS.prototype.connect = function (url) {
            var self = this;
            //操作html5 websocket API
            this.socket = new WebSocket("ws://" + url);
            this.socket.binaryType = "arraybuffer";
            this.socket.onopen = function () {
                self._onConnect();
            };
            this.socket.onmessage = function (ev) {
                //判断数据是不是字符串，如果是字符串那么就是flash传过来的。
                if (typeof ev.data == "string") {
                    self._decode(ev.data.split(","))
                } else {
                    self._decode(ev.data)
                }
            };
            this.socket.onclose = function () {
                self._onClose()
            };
            this.socket.onerror = function (evt) {
                //当websocket执行出错的时候，判断是否已经注册了重连对象。有的话就执行重连对象的onError，没有的话主动抛出一个错误
                if (!evt.data) {
                    return;
                }
                console.log(evt.data);
                if (bridge._client && bridge._client.reconnectObj.onError) {
                    bridge._client.reconnectObj.onError(RongIMClient.ConnectErrorStatus.setValue(2));
                    delete bridge._client.reconnectObj.onError;
                } else {
                    throw new Error("network is unavailable or unknown error");
                }
            };
            return this;
        };
        //发送数据到服务器
        WS.prototype.send = function (data) {
            var stream = new RongIMStreamUtil([]),
                msg = new MessageOutputStream(stream);
            msg.writeMessage(data);
            var val = stream.getBytesArray(true);
            if (this.socket.readyState == 1) {
                if (global.Int8Array && !global.WEB_SOCKET_FORCE_FLASH) {
                    //Int8Array为html5 API
                    var binary = new Int8Array(val);
                    this.socket.send(binary.buffer)
                } else {
                    this.socket.send(val + "")
                }
            }
            return this
        };
        WS.prototype.disconnect = function () {
            if (this.socket) {
                this.socket.close();
            }
            return this;
        };
        WS.prototype._onClose = function () {
            this._onDisconnect();
            return this
        };
        WS.check = function () {
            return "WebSocket" in global && WebSocket.prototype && WebSocket.prototype.send && typeof WebSocket !== "undefined"
        };
        WS.XDomainCheck = function () {
            return true;
        }
    })();
//the base class of XHR_POLLING  comet通道对象的基类
    (function () {
        var empty = new Function,
        //利用withCredentials判断是否支持跨域操作
            XMLHttpRequestCORS = (function () {
                if (!('XMLHttpRequest' in global))
                    return false;
                var a = new XMLHttpRequest();
                return a.withCredentials !== undefined;
            })(),
        //生成跨域传输对象
            request = function () {
                if ('XDomainRequest' in global)
                    return new window["XDomainRequest"]();
                if ('XMLHttpRequest' in global && XMLHttpRequestCORS)
                    return new XMLHttpRequest();
                return false;
            },
            XHR = io.Transport.XHR = function () {
                io.Transport.apply(this, arguments);
            };
        io.util.inherit(XHR, io.Transport);
        //comet链接服务器，先从本地存储对象里是否存有当前登陆人员的sessionid，如果有的话就不再从服务器申请sessionid，直接用本地存储的sessionid链接服务器。
        XHR.prototype.connect = function (url) {
            var sid = io.util.cookieHelper.getItem(Client.Endpoint.userId + "sId"),
                _that = this;
            if (sid) {
                io.getInstance().currentURL = url;
                setTimeout(function () {
                    _that.onopen("{\"status\":0,\"userId\":\"" + Client.Endpoint.userId + "\",\"headerCode\":32,\"messageId\":0,\"sessionid\":\"" + sid + "\"}");
                    _that._onConnect();
                }, 500);
                return this;
            }
            this._get(url);

            return this;
        };
        XHR.prototype._checkSend = function (data) {
            //格式化数据为comet指定的数据格式，然后发送
            var encoded = this._encode(data);
            this._send(encoded);
        };
        XHR.prototype.send = function (data) {
            this._checkSend(data);
            return this;
        };
        //利用post方法发送数据，有数据返回就执行_onData(responseText)方法
        XHR.prototype._send = function (data) {
            var self = this;
            this._sendXhr = this._request(Client.Endpoint.host + "/websocket" + data.url, 'POST');
            if ("onload" in this._sendXhr) {
                this._sendXhr.onload = function () {
                    this.onload = empty;
                    self._onData(this.responseText);
                };
                this._sendXhr.onerror = function () {
                    this.onerror = empty;
                };
            } else {
                this._sendXhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        this.onreadystatechange = empty;
                        if (/^(202|200)$/.test(this.status)) {
                            self._onData(this.responseText);
                        }
                    }
                };
            }

            this._sendXhr.send(JSON.stringify(data.data));
        };
        XHR.prototype.disconnect = function () {
            this._onDisconnect();
            return this;
        };
        //断开连接，强制中止所有正在连接的http请求
        XHR.prototype._onDisconnect = function (isrecon) {
            if (this._xhr) {
                this._xhr.onreadystatechange = this._xhr.onload = empty;
                this._xhr.abort();
                this._xhr = null;
            }
            if (this._sendXhr) {
                this._sendXhr.onreadystatechange = this._sendXhr.onload = empty;
                this._sendXhr.abort();
                this._sendXhr = null;
            }
            if (isrecon === undefined) {
                io.Transport.prototype._onDisconnect.call(this);
            }
        };
        //打开跨域请求对象
        XHR.prototype._request = function (url, method, multipart) {
            var req = request();
            if (multipart)
                req.multipart = true;
            req.open(method || 'GET', "http://" + url);
            if (method == 'POST' && 'setRequestHeader' in req) {
                req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            return req;
        };
        XHR.check = function () {
            try {
                if (request())
                    return true;
            } catch (e) {
            }
            return false;
        };
        XHR.XDomainCheck = function () {
            return XHR.check();
        };
        XHR.request = request;
    })();
//build XHR_POLLING class 构建comet通道对象
    (function () {
        var empty = new Function(),
            XHRPolling = io.Transport['xhr-polling'] = function () {
                io.Transport.XHR.apply(this, arguments);
            };
        io.util.inherit(XHRPolling, io.Transport.XHR);
        XHRPolling.prototype.type = 'xhr-polling';
        //链接服务器，如果是ios和安卓就等10毫秒执行。
        XHRPolling.prototype.connect = function (x) {
            if (io.util.ios || io.util.android) {
                var self = this;
                io.util.load(function () {
                    setTimeout(function () {
                        io.Transport.XHR.prototype.connect.call(self, x);
                    }, 10);
                });
            } else {
                io.Transport.XHR.prototype.connect.call(this, x);
            }
        };
        //发送pullmsg.js请求，这里是一个死循环调用。用于保持pullmsg.js请求
        XHRPolling.prototype.onopen = function (a, b) {
            this._onData(a, b);
            if (/"headerCode":-32,/.test(a)) {
                return;
            }
            this._get(Client.Endpoint.host + "/pullmsg.js?sessionid=" + io.util.cookieHelper.getItem(Client.Endpoint.userId + "sId"), true);
        };
        //http状态码对应执行对象
        var status = {
            //arg参数有值说明是链接服务器请求，直接_onConnect方法
            200: function (self, text, arg) {
                var txt = text.match(/"sessionid":"\S+?(?=")/);
                self.onopen(text, txt ? txt[0].slice(13) : void 0);
                arg || self._onConnect();
            },
            //http状态码为400，断开连接
            400: function (self) {
                io.util.cookieHelper.removeItem(Client.Endpoint.userId + "sId");
                self._onDisconnect(true);
                io.getInstance().connecting = false;
                io.getInstance().connected = false;
                io.getInstance().connect(null, null);
            }
        };
        //用于接收pullmsg.js请求中服务器返回的消息数据
        XHRPolling.prototype._get = function (symbol, arg) {
            var self = this;
            this._xhr = this._request(symbol, 'GET');
            if ("onload" in this._xhr) {
                this._xhr.onload = function () {
                    this.onload = empty;
                    if (this.responseText == 'lost params') {
                        status['400'](self);
                    } else {
                        status['200'](self, this.responseText, arg);
                    }
                };
                this._xhr.onerror = function () {
                    self._onDisconnect();
                }
            } else {
                this._xhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        this.onreadystatechange = empty;
                        if (/^(200|202)$/.test(this.status)) {
                            status['200'](self, this.responseText, arg);
                        } else if (/^(400|403)$/.test(this.status)) {
                            status['400'](self);
                        } else {
                            self._onDisconnect();
                        }

                    }
                };
            }
            this._xhr.send();
        };
        XHRPolling.check = function () {
            return io.Transport.XHR.check();
        };
        XHRPolling.XDomainCheck = function () {
            return io.Transport.XHR.XDomainCheck();
        };
    })();
//use abstract factory pattern build a I/O object for transport，工厂方法，生产具体消息对象
    (function () {
        var Socket = io.createServer = function () {
            this.options = {
                token: "",
                transports: ["websocket", "xhr-polling"]//主要有两种(websocket，flashsocket)、comet
            };
            this.connected = false;
            this.connecting = false;
            this._events = {};
            this.currentURL = "";
            this.transport = this.getTransport(io._TransportType);
            if (this.transport === null) {
                throw new Error("the channel was not supported")
            }
        };
        //此方法用于生产通道对象
        Socket.prototype.getTransport = function (override) {
            var i = 0,
                transport = override || this.options.transports[i];
            if (io.Transport[transport] && io.Transport[transport].check() && io.Transport[transport].XDomainCheck()) {
                return new io.Transport[transport](this, {})
            }
            return null;
        };
        //连接服务器
        Socket.prototype.connect = function (url, cb) {
            if (this.transport && arguments.length == 2) {
                if (url) {
                    this.on("connect", cb || function () {
                    })
                }
                if (this.connecting || this.connected) {
                    this.disconnect()
                }
                this.connecting = true;
                if (url) {
                    this.currentURL = url
                }
                this.transport.connect(this.currentURL); //是否重连
            }
            return this
        };
        Socket.prototype.send = function (data) {
            if (!this.transport || !this.connected) {
                //如果通道不可用，把消息压入队列中，等到通道可用时处理
                return this._queue(data)
            }
            this.transport.send(data)
        };
        Socket.prototype.disconnect = function (callback) {
            if (callback) {
                //出发状态改变观察者
                this.fire("StatusChanged", callback)
            }
            this.transport.disconnect();
            return this;
        };
        Socket.prototype.reconnect = function () {
            if (this.currentURL) {
                return this.connect(null, null);
            } else {
                throw new Error("reconnect:no have URL");
            }
        };
        Socket.prototype.fire = function (x, args) {
            if (x in this._events) {
                for (var i = 0, ii = this._events[x].length; i < ii; i++) {
                    this._events[x][i](args);
                }
            }
            return this
        };
        Socket.prototype.removeEvent = function (x, fn) {
            if (x in this._events) {
                for (var a = 0, l = this._events[x].length; a < l; a++) {
                    if (this._events[x][a] == fn) {
                        this._events[x].splice(a, 1)
                    }
                }
            }
            return this
        };
        Socket.prototype._queue = function (message) {
            if (!("_queueStack" in this)) {
                this._queueStack = []
            }
            this._queueStack.push(message);
            return this
        };
        Socket.prototype._doQueue = function () {
            if (!("_queueStack" in this) || !this._queueStack.length) {
                return this
            }
            for (var i = 0,len =this._queueStack.length ; i < len; i++) {
                this.transport.send(this._queueStack[i])
            }
            this._queueStack = [];
            return this
        };
        Socket.prototype._onConnect = function () {
            this.connected = true;
            this.connecting = false;
            io.util.cookieHelper.setItem("rongSDK", io._TransportType);
            this.fire("connect");
        };
        Socket.prototype._onMessage = function (data) {
            this.fire("message", data)
        };
        Socket.prototype._onDisconnect = function () {
            var wasConnected = this.connected;
            this.connected = false;
            this.connecting = false;
            this._queueStack = [];
            if (wasConnected) {
                this.fire("disconnect")
            }
        };
        //注册观察者
        Socket.prototype.on = function (x, func) {
            if (!(typeof func == "function" && x)) {
                return this
            }
            if (x in this._events) {
                io.util.indexOf(this._events, func) == -1 && this._events[x].push(func)
            } else {
                this._events[x] = [func];
            }
            return this
        };
    })();

//a callback function manager constructor，回调函数执行超时管理的基类
    function MessageCallback(error) {
        var timeoutMillis, me = this;
        this.timeout = null;
        this.onError = null;
        if (error && typeof error == "number") {
            timeoutMillis = error
        } else {
            timeoutMillis = 6000;
            this.onError = error;
        }
        this.resumeTimer = function () {
            if (timeoutMillis > 0 && !this.timeout) {
                this.timeout = setTimeout(function () {
                    me.readTimeOut(true);
                }, timeoutMillis)
            }
        };
        this.pauseTimer = function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null
            }
        };
        this.readTimeOut = function (isTimeout) {
            if (isTimeout && this.onError) {
                this.onError(RongIMClient.callback.ErrorCode.TIMEOUT)
            } else {
                this.pauseTimer()
            }
        };
    }

//消息回调映射，处理消息
    function MessageHandler(client) {
        if (!_ReceiveMessageListener) {
            throw new Error("please set onReceiveMessageListener");
        }
        var Map = {}, onReceived = _ReceiveMessageListener.onReceived, connectCallback = null;

        //把对象推入回调对象队列中，并启动定时器
        this.putCallback = function (callbackObj, _publishMessageId, _msg) {
            var item = {
                Callback: callbackObj,
                Message: _msg
            };
            item.Callback.resumeTimer();
            Map[_publishMessageId] = item;
        };
        //设置连接回调对象，启动定时器
        this.setConnectCallback = function (_connectCallback) {
            if (_connectCallback) {
                connectCallback = new ConnectAck(_connectCallback.onSuccess, _connectCallback.onError, client);
                connectCallback.resumeTimer();
            }
        };
        //处理具体的消息对象
        this.onReceived = function (msg) {
            //实体对象
            var entity,
            //解析完成的消息对象
                message,
            //会话对象
                con;
            if (msg.constructor._name != "PublishMessage") {
                //如果msg不是一个内置消息对象，直接赋值给实体，进行下一步处理
                entity = msg;
                io.util.cookieHelper.setItem(client.userId, io.util.int64ToTimestamp(entity.dataTime));
            } else {
                if (msg.getTopic() == "s_ntf") {
                    entity = Modules.NotifyMsg.decode(msg.getData());
                    client.syncTime(entity.type, io.util.int64ToTimestamp(entity.time));
                    return;
                } else if (msg.getTopic() == "s_msg") {
                    entity = Modules.DownStreamMessage.decode(msg.getData());
                    io.util.cookieHelper.setItem(client.userId, io.util.int64ToTimestamp(entity.dataTime));
                } else {
                    if (bridge._client.sdkVer && bridge._client.sdkVer == '1.0.0') {
                        return;
                    }
                    entity = Modules.UpStreamMessage.decode(msg.getData());
                    var tmpTopic = msg.getTopic();
                    var tmpType = tmpTopic.substr(0,2);
                    //复用字段，targetId 以此为准
                    entity.groupId = msg.getTargetId();
                    if (tmpType == "pp") {
                        entity.type = 1;
                    } else if(tmpType == "pd") {
                        entity.type = 2;
                    } else if(tmpType == "pg") {
                        entity.type = 3;
                    } else if(tmpType == "chat") {
                        entity.type = 4;
                    }
                    entity.fromUserId = client.userId;
                    entity.dataTime = Date.parse(new Date());
                }
                if (!entity) {
                    return;
                };
            }
            //解析实体对象为消息对象。
            message = messageParser(entity, onReceived);
            if (message === null) {
                return;
            }
            //创建会话对象
            con = RongIMClient.getInstance().getConversationList().get(message.getConversationType(), message.getTargetId());
            if (!con) {
                con = RongIMClient.getInstance().createConversation(message.getConversationType(), message.getTargetId(), "");
            }
            //根据messageTag判断是否进行消息数累加
            /*if (/ISCOUNTED/.test(message.getMessageTag())) {
                con.getConversationType() != 0 && con.setUnreadMessageCount(con.getUnreadMessageCount() + 1);
            }*/
            if (message.getCount()) {
                con.getConversationType() != 0 && con.setUnreadMessageCount(con.getUnreadMessageCount() + 1);
            }
            con.setReceivedTime((new Date).getTime());
            con.setReceivedStatus(new RongIMClient.ReceivedStatus());
            con.setSenderUserId(message.getSenderUserId());
            con.setObjectName(message.getObjectName());
            con.setNotificationStatus(RongIMClient.ConversationNotificationStatus.DO_NOT_DISTURB);
            con.setLatestMessageId(message.getMessageId());
            con.setLatestMessage(message);
            con.setTop();
            //把消息传递给消息监听器
            onReceived(message);
        };
        //处理通道对象传送过来的内置消息对象
        this.handleMessage = function (msg) {
            if (!msg) {
                return
            }
            switch (msg.constructor._name) {
                case "ConnAckMessage":
                    connectCallback.process(msg.getStatus(), msg.getUserId(),msg.getTimestamp());
                    break;
                case "PublishMessage":
                    if (msg.getQos() != 0) {
                        client.channel.writeAndFlush(new PubAckMessage(msg.getMessageId()));
                    }
                    //如果是PublishMessage就把该对象给onReceived方法执行处理
                    client.handler.onReceived(msg);
                    break;
                case "QueryAckMessage":
                    if (msg.getQos() != 0) {
                        client.channel.writeAndFlush(new QueryConMessage(msg.getMessageId()))
                    }
                    var temp = Map[msg.getMessageId()];
                    if (temp) {
                        //执行回调操作
                        temp.Callback.process(msg.getStatus(), msg.getData(), msg.getDate(), temp.Message);
                        delete Map[msg.getMessageId()];
                    }
                    break;
                case "PubAckMessage":
                    var item = Map[msg.getMessageId()];
                    if (item) {
                        //执行回调操作
                        item.Callback.process(msg.getStatus() || 0, msg.getMessageUId(), msg.getTimestamp(), item.Message);
                        delete Map[msg.getMessageId()];
                    }
                    break;
                case "PingRespMessage":
                    client.pauseTimer();
                    break;
                case "DisconnectMessage":
                    client.channel.disconnect(msg.getStatus());
                    break;
                default:
            }
        }
    }

    //会话类型映射，key为服务器中会话类型，value为web SDK 会话类型
    var mapping = {
            "1": 4,
            "2": 2,
            "3": 3,
            "4": 0,
            "5": 1,
            "6": 5,
            "7": 7
        },
    //objectname映射
        typeMapping = {
            "RC:TxtMsg": "TextMessage",
            "RC:ImgMsg": "ImageMessage",
            "RC:VcMsg": "VoiceMessage",
            "RC:ImgTextMsg": "RichContentMessage",
            "RC:LBSMsg": "LocationMessage",
            "RC:CmdMsg": "CommandMessage"
        },
    //通知类型映射
        sysNtf = {
            "RC:InfoNtf": "InformationNotificationMessage",
            "RC:ContactNtf": "ContactNotificationMessage",
            "RC:ProfileNtf": "ProfileNotificationMessage",
            "RC:CmdNtf": "CommandNotificationMessage",
            "RC:DizNtf": "DiscussionNotificationMessage"
        },
    //消息监听器
        _ReceiveMessageListener,
    //连接状态监听器
        _ConnectionStatusListener;

    //消息转换方法
    function messageParser(entity, onReceived) {
        var message, content;

        content = entity.content;
        var de , objectName = entity.classname;
        try {
            if(global["WEB_XHR_POLLING"]){
                de = JSON.parse(binaryHelper.readUTF(content.offset ? io.util.arrayFrom(content.buffer).slice(content.offset, content.limit) : content));
            }else{
                de = JSON.parse(binaryHelper.readUTF(content.offset ? io.util.arrayFromInput(content.buffer).subarray(content.offset, content.limit) : content))
            }
        }catch (ex){
            return null;
        }
        //处理表情
        if ("Expression" in RongIMClient && "RC:TxtMsg" == objectName && de.content) {
            de.content = de.content.replace(/[\uf000-\uf700]/g, function (x) {
                return RongIMClient.Expression.calcUTF(x) || x;
            })
        }
        //映射为具体消息对象
        if (objectName in typeMapping) {
            message = new RongIMClient[typeMapping[objectName]](de);
        } else if (objectName in sysNtf) {
            message = new RongIMClient[sysNtf[objectName]](de);
            //直接 return 无法获取发送时间、用户 id 等下面的内容
            /*if (onReceived) {
                onReceived(message);
                return null;
            }*/
        } else if (objectName in registerMessageTypeMapping) {
            //自定义消息
            message = new RongIMClient[registerMessageTypeMapping[objectName]](de);
        } else {
            //未知消息
            message = new RongIMClient.UnknownMessage(de, objectName);
        }
        //根据实体对象设置message对象
        message.setSentTime(io.util.int64ToTimestamp(entity.dataTime));
        message.setSenderUserId(entity.fromUserId);
        message.setConversationType(RongIMClient.ConversationType.setValue(mapping[entity.type]));
        if (entity.fromUserId == bridge._client.userId) {
            //复用字段
            message.setTargetId(entity.groupId);
        } else {
            message.setTargetId(/^[234]$/.test(entity.type || entity.getType()) ? entity.groupId : message.getSenderUserId());
        }
        if (entity.fromUserId == bridge._client.userId) {
            message.setMessageDirection(RongIMClient.MessageDirection.SEND);
        } else {
            message.setMessageDirection(RongIMClient.MessageDirection.RECEIVE);
        }
        if ((entity.status & 2 )== 2) {
            message.setHasReceivedByOtherClient(true);
        }
        message.setMessageUId(entity.msgId);
        message.setReceivedTime((new Date).getTime());
        message.setMessageId(message.getConversationType() + "_" + ~~(Math.random() * 0xffffff));
        message.setReceivedStatus(new RongIMClient.ReceivedStatus());
        return message;
    }

//channel object constructor 最顶层的通道对象，内部封装了io对象
    function Channel(address, cb, self) {
        //连接服务器
        var url = address.host + "/websocket?appId=" + self.appId + "&token=" + encodeURIComponent(self.token) + "&sdkVer=" + self.sdkVer + "&apiVer=" + self.apiVer;
        if(RongIMClient.PCClient){
            url += "&platform=PCClient";
        }
        this.socket = io.connect(url, cb);

        //注册状态改变观察者
        if (typeof _ConnectionStatusListener == "object" && "onChanged" in _ConnectionStatusListener) {
            this.socket.on("StatusChanged", function (code) {
                //如果参数为DisconnectionStatus，就停止心跳，其他的不停止心跳。每3min连接一次服务器
                if (code instanceof DisconnectionStatus) {
                    _ConnectionStatusListener.onChanged(RongIMClient.ConnectionStatus.setValue(code + 2));
                    self.clearHeartbeat();
                    return;
                }
                _ConnectionStatusListener.onChanged(RongIMClient.ConnectionStatus.setValue(code))
            })
        } else {
            throw new Error("setConnectStatusListener:Parameter format is incorrect")
        }
        //发送，如果通道可写就发送，不可写就重连服务器
        this.writeAndFlush = function (val) {
            if (this.isWritable()) {
                this.socket.send(val);
            } else {
                this.reconnect({
                    onSuccess: function () {
                        io.getInstance().send(val);
                    },
                    onError: function () {
                        throw new Error("reconnect fail")
                    }
                })
            }
        };
        //重连并清空messageid
        this.reconnect = function (callback) {
            io.messageIdHandler.clearMessageId();

            this.socket = this.socket.reconnect();
            if (callback) {
                self.reconnectObj = callback;
            }
        };
        this.disconnect = function (x) {
            this.socket.disconnect(x);
        };
        //通道是否可写
        this.isWritable = function () {
            return io.getInstance().connected || io.getInstance().connecting
        };
        //注册message观察者
        this.socket.on("message", self.handler.handleMessage);
        //注册断开连接观察者
        this.socket.on("disconnect", function () {
            self.channel.socket.fire("StatusChanged", 4);
        })
    }

    //protobuf映射
    function callbackMapping(entity, tag) {
        switch (tag) {
            case "GetUserInfoOutput":
                var userInfo = new RongIMClient.UserInfo();
                userInfo.setUserId(entity.userId);
                userInfo.setUserName(entity.userName);
                userInfo.setPortraitUri(entity.userPortrait);
                return userInfo;
            case "GetQNupTokenOutput":
                return {
                    deadline: io.util.int64ToTimestamp(entity.deadline),
                    token: entity.token
                };
            case "GetQNdownloadUrlOutput":
                return {
                    downloadUrl: entity.downloadUrl
                };
            case "CreateDiscussionOutput":
                return entity.id;
            case "ChannelInfoOutput":
                var disInfo = new RongIMClient.Discussion();
                disInfo.setCreatorId(entity.adminUserId);
                disInfo.setId(entity.channelId);
                disInfo.setMemberIdList(entity.firstTenUserIds);
                disInfo.setName(entity.channelName);
                disInfo.setOpen(RongIMClient.DiscussionInviteStatus.setValue(entity.openStatus));
                return disInfo;
            case "GroupHashOutput":
                return entity.result;
            case "QueryBlackListOutput":
                return entity.userIds;
            default:
                return entity;
        }
    }

    //发送PublishMessage消息回调类
    function PublishCallback(cb, _timeout) {
        MessageCallback.call(this, _timeout);
        //回调执行此方法
        this.process = function (_staus, messageUId, timestamp, _msg) {
            this.readTimeOut();
            if (_staus == 0) {
                if (_msg) {
                    //把发送的消息发送状态改为已接收
                    _msg.setSentStatus(RongIMClient.SentStatus.RECEIVED)
                }
                cb({messageUId:messageUId,timestamp:timestamp});
            } else {
                _timeout(RongIMClient.SendErrorStatus.setValue(_staus));
            }
        };
        this.readTimeOut = function (x) {
            PublishCallback.prototype.readTimeOut.call(this, x)
        }
    }

    io.util._extends(PublishCallback, MessageCallback);
    //发送QueryMessage消息回调类
    function QueryCallback(cb, _timeout) {
        MessageCallback.call(this, _timeout);
        //回调执行此方法
        this.process = function (status, data, serverTime, pbtype) {
            this.readTimeOut();
            if (pbtype && data && status == 0) {
                try {
                    data = callbackMapping(Modules[pbtype].decode(data), pbtype);
                } catch (e) {
                    _timeout(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                    return;
                }
                if ("GetUserInfoOutput" == pbtype) {
                    //pb类型为GetUserInfoOutput的话就把data放入userinfo缓存队列
                    userInfoMapping[data.getUserId()] = data;
                }
                cb(data);
            } else {
                status > 0 ? _timeout(status) : cb(status)
            }
        };
        this.readTimeOut = function (x) {
            QueryCallback.prototype.readTimeOut.call(this, x)
        }
    }

    io.util._extends(QueryCallback, MessageCallback);

    //连接回调类
    function ConnectAck(cb, _timeout, self) {
        MessageCallback.call(this, _timeout);
        this.process = function (status, userId,timestamp) {
            this.readTimeOut();
            if (status == 0) {
                var naviStr = io.util.cookieHelper.getItem("navi\\w+?");
                var arrNavi = document.cookie.match(new RegExp("(^| )(navi\\w+?)=.*"));
                var naviKey = "";
                if (arrNavi && arrNavi[2]) {
                    naviKey = arrNavi[2];
                }

                var arr = unescape(naviStr).split(",");
                if (!arr[1]) {
                    naviStr = unescape(naviStr) + userId;
                    io.util.cookieHelper.setItem(naviKey, naviStr);
                }

                self.userId = userId;
                if (!RongIMClient.isNotPullMsg) {
                    self.syncTime();
                }
                if (self.reconnectObj.onSuccess) {
                    self.reconnectObj.onSuccess(userId);
                    delete self.reconnectObj.onSuccess;
                } else {
                    if (timestamp > 0) {
                      RongIMClient.getInstance().deltaTime = new Date().getTime() - timestamp;
                    }else{
                      RongIMClient.getInstance().deltaTime = 0;
                    }
                    cb(userId);
                }
                io.getInstance().fire("StatusChanged", 0);
                io.getInstance()._doQueue()
            } else if (status == 6) {
                //重定向
                Client.getServerEndpoint(self.token, self.appId, function () {
                    self.clearHeartbeat();
                    __init.call(e, function () {
                        io._TransportType == "websocket" && self.keepLive()
                    });
                    self.channel.socket.fire("StatusChanged", 2);
                }, _timeout, false)
            } else {
                if (self.reconnectObj.onError) {
                    self.reconnectObj.onError(RongIMClient.ConnectErrorStatus.setValue(status));
                    delete self.reconnectObj.onError;
                } else {
                    _timeout(RongIMClient.ConnectErrorStatus.setValue(status));
                }
            }
        };
        this.readTimeOut = function (x) {
            ConnectAck.prototype.readTimeOut.call(this, x);
        }
    }

    io.util._extends(ConnectAck, MessageCallback);
    //用于缓存userinfo,防止重复去服务器拉取
    var userInfoMapping = {};

    //初始化通道对象
    function __init(f) {
        this.channel = new Channel(Client.Endpoint, f, this);
    }

    //连接端类，逻辑处理全在此类中
    function Client(_to, _ap) {
        var timeoutMillis = 100000, self = this;
        this.timeout_ = 0;
        this.appId = _ap;
        this.token = _to;
        this.sdkVer = "1.1.2";
        this.apiVer = Math.floor(Math.random() * 1e6);
        this.channel = null;
        this.handler = null;
        this.userId = "";
        this.reconnectObj = {};
        this.heartbeat = 0;
        this.chatroomId = '';
        //用于心跳启动定时器
        this.resumeTimer = function () {
            if (!this.timeout_) {
                this.timeout_ = setTimeout(function () {
                    if (!self.timeout_) {
                        return;
                    }
                    try {
                        self.channel.disconnect()
                    } catch (e) {
                    }
                    clearTimeout(self.timeout_);
                    self.timeout_ = 0;
                    self.channel.reconnect();
                    self.channel.socket.fire("StatusChanged", 5);
                }, timeoutMillis)
            }
        };
        //销毁心跳定时器
        this.pauseTimer = function () {
            if (this.timeout_) {
                clearTimeout(this.timeout_);
                this.timeout_ = 0;
            }
        };

        //连接服务器
        this.connect = function (_callback) {
            //判断navi是否已经返回地址
            if (Client.Endpoint.host) {
                if (io._TransportType == "websocket") {
                    if (!global.WebSocket) {
                        _callback.onError(RongIMClient.ConnectErrorStatus.setValue(1));
                        return;
                    }
                    //判断是否是flashsocket  是的话就加载代理文件
                    'loadFlashPolicyFile' in WebSocket && WebSocket.loadFlashPolicyFile();
                }
                //实例消息处理类
                this.handler = new MessageHandler(this);
                //设置连接回调
                this.handler.setConnectCallback(_callback);
                //实例通道类型
                this.channel = new Channel(Client.Endpoint, function () {
                    io._TransportType == "websocket" && self.keepLive();
                }, this);
                //触发状态改变观察者
                this.channel.socket.fire("StatusChanged", 1);
            } else {
                //没有返回地址就手动抛出错误
                _callback.onError(RongIMClient.ConnectErrorStatus.setValue(5));
            }
        };
        //心跳启动方法
        this.keepLive = function () {
            if (this.heartbeat > 0) {
                clearInterval(this.heartbeat);
            }
            this.heartbeat = setInterval(function () {
                self.resumeTimer();
                self.channel.writeAndFlush(new PingReqMessage());
                console.log("keep live pingReqMessage sending appId " + self.appId);
            }, 180000);
        };
        //心跳停止方法
        this.clearHeartbeat = function () {
            clearInterval(this.heartbeat);
            this.heartbeat = 0;
            this.pauseTimer();
        };
        //发送publishMessage消息
        this.publishMessage = function (_topic, _data, _targetId, _callback, _msg) {
            var msgId = io.messageIdHandler.messageIdPlus(this.channel.reconnect);
            if (!msgId) {
                return;
            }
            var msg = new PublishMessage(_topic, _data, _targetId);
            msg.setMessageId(msgId);
            if (_callback) {
                msg.setQos(Qos.AT_LEAST_ONCE);
                this.handler.putCallback(new PublishCallback(_callback.onSuccess, _callback.onError), msg.getMessageId(), _msg)
            } else {
                msg.setQos(Qos.AT_MOST_ONCE);
            }
            this.channel.writeAndFlush(msg);
        };
        //发送queryMessage消息
        this.queryMessage = function (_topic, _data, _targetId, _qos, _callback, pbtype) {
            //如果topic是userinfo，就去userinfo缓存对象里拿，没有的话再去请求服务器拉取userinfo
            if (_topic == "userInf") {
                if (userInfoMapping[_targetId]) {
                    _callback.onSuccess(userInfoMapping[_targetId]);
                    return;
                }
            }
            var msgId = io.messageIdHandler.messageIdPlus(this.channel.reconnect);
            if (!msgId) {
                return;
            }
            var msg = new QueryMessage(_topic, _data, _targetId);
            msg.setMessageId(msgId);
            msg.setQos(_qos);
            this.handler.putCallback(new QueryCallback(_callback.onSuccess, _callback.onError), msg.getMessageId(), pbtype);
            this.channel.writeAndFlush(msg)
        };
        //同步消息队列
        var SyncTimeQueue = [];
        //队列的执行状态
        SyncTimeQueue.state = "complete";
        function invoke(isPullSend) {
            var bol = false;
            if(arguments.length == 1){
                bol = true;
            }
            var time, modules, str, target,
            //从队列开头取出一个赋值给temp变量
                temp = SyncTimeQueue.shift();
            if (temp == undefined) {
                return;
            }
            //改变状态为pending
            SyncTimeQueue.state = "pending";
            if (temp.type != 2) {
                //普通消息
                time = io.util.cookieHelper.getItem(self.userId) || 0;
                modules = new Modules.SyncRequestMsg();
                modules.setIspolling(false);
                // modules.setIsweb(bol);

                str = 'pullMsg';
                target = self.userId;
            } else {
                //聊天室消息
                time = io.util.cookieHelper.getItem(self.userId + "CST") || 0;
                modules = new Modules.ChrmPullMsg();
                modules.setCount(0);
                str = 'chrmPull';
                if (self.chatroomId === '') {
                    //受到聊天室消息，但是本地没有加入聊天室就手动抛出一个错误
                    throw new Error("syncTime:Received messages of chatroom but was not init");
                }
                target = self.chatroomId;
            }
            if (isPullSend) {
              modules.setIsPullSend(true);

            }
            //判断服务器给的时间是否消息本地存储的时间，小于的话不执行拉取操作，进行一下步队列操作
            if (temp.pulltime <= time) {
                SyncTimeQueue.state = "complete";
                invoke();
                return;
            }
            modules.setSyncTime(time);
            //发送queryMessage请求
            self.queryMessage(str, io.util.arrayFrom(modules.toArrayBuffer()), target, Qos.AT_LEAST_ONCE, {
                onSuccess: function (collection) {
                    SyncTimeQueue.state = "complete";
                    invoke();
                    var sync = io.util.int64ToTimestamp(collection.syncTime),
                        symbol = self.userId;
                    if (str == "chrmPull") {
                        symbol += 'CST';
                    }
                    //把返回时间戳存入本地，普通消息key为userid，聊天室消息key为userid＋'CST'；value都为服务器返回的时间戳
                    io.util.cookieHelper.setItem(symbol, sync);
                    //把拉取到的消息逐条传给消息监听器
                    var list = collection.list;
                    for (var i = 0,len = list.length; i < len; i++) {
                        bridge._client.handler.onReceived(list[i]);
                    }
                },
                onError: function () {
                    SyncTimeQueue.state = "complete";
                    invoke();
                }
            }, "DownStreamMessages");
        };

        //同步消息
        this.syncTime = function (_type, pullTime) {
            SyncTimeQueue.push({ type: _type, pulltime: pullTime});
            //如果队列中只有一个成员并且状态已经完成就执行invoke方法
            if (SyncTimeQueue.length == 1 && SyncTimeQueue.state == "complete") {
                if(arguments.length == 0 && !RongIMClient.isSyncOfflineMsg){
                    invoke(true);
                } else {
                    invoke();
                }
            }
        }
    }

    //声明Client.connect静态方法，返回Client实例
    Client.connect = function (appId, token, callback) {
        //如果appid和本地存储的不一样，清空所有本地存储数据
        var oldAppId = io.util.cookieHelper.getItem("appId");
        if (oldAppId && oldAppId != appId) {
            io.util.cookieHelper.clear();
            io.util.cookieHelper.setItem("appId", appId);
        }
        var client = new Client(token, appId);
        //请求navi导航
        Client.getServerEndpoint(token, appId, function () {
            client.connect(callback);
        }, callback.onError, true);
        return client;
    };
    //jsonp操作，请求navi导航
    /***
     * @param {string} _token token
     * @param {string} _appId appid
     * @param {function} _onsuccess 成功回调函数
     * @param {function} _onerror 失败回调函数
     * @param {boolean} unignore 进行jsonp请求前是否做信息比对
     */
    Client.getServerEndpoint = function (_token, _appId, _onsuccess, _onerror, unignore) {
        if (unignore) {
            //根据token生成MD5截取8-16下标的数据与本地存储的导航信息进行比对
            //如果信息和上次的通道类型都一样，不执行navi请求，用本地存储的导航信息连接服务器
            var naviStr = MD5(_token).slice(8, 16),
                _old = io.util.cookieHelper.getItem("navi\\w+?"),
                _new = io.util.cookieHelper.getItem("navi" + naviStr);
            if (_old == _new && _new !== null && io.util.cookieHelper.getItem("rongSDK") == io._TransportType) {
                var obj = unescape(_old).split(",");
                setTimeout(function () {
                    RongBinaryHelper.__host = Client.Endpoint.host = obj[0];
                    Client.Endpoint.userId = obj[1];
                    _onsuccess();
                }, 500);
                return;
            }
        }
        //导航信息，切换Url对象的key进行线上线下测试操作
        var Url = {
                //测试环境
                "navUrl-Debug": "http://119.254.111.49:9100/",
                //线上环境
                "navUrl-Release": "http://nav.cn.ronghub.com/"
            },
            xss = document.createElement("script");
        //进行jsonp请求
        xss.src = Url["navUrl-Release"] + (io._TransportType == "xhr-polling" ? "cometnavi.js" : "navi.js") + "?appId=" + _appId + "&token=" + encodeURIComponent(_token) + "&" + "callBack=getServerEndpoint&t=" + (new Date).getTime();
        document.body.appendChild(xss);
        xss.onerror = function () {
            _onerror(RongIMClient.ConnectErrorStatus.setValue(4));
        };
        if ("onload" in xss) {
            xss.onload = _onsuccess;
        } else {
            xss.onreadystatechange = function () {
                xss.readyState == "loaded" && _onsuccess();
            }
        }
    };
    //端点对象，存储链接地址和端口、登陆人员id
    Client.Endpoint = {};
    //jsonp回调函数
    global.getServerEndpoint = function (x) {
        //把导航返回的server字段赋值给RongBinaryHelper.__host，因为flash widget需要使用
        RongBinaryHelper.__host = Client.Endpoint.host = x["server"];
        Client.Endpoint.userId = x.userId;
        //替换本地存储的导航信息
        var temp = document.cookie.match(new RegExp("(^| )navi\\w+?=([^;]*)(;|$)"));
        temp !== null && io.util.cookieHelper.removeItem(temp[0].split("=")[0].replace(/^\s/, ""));
        io.util.cookieHelper.setItem("navi" + MD5(bridge._client.token).slice(8, 16), x["server"] + "," + (x.userId || ""));
    };
    //topic白名单
    var _topic = ["invtDiz", "crDiz", "qnUrl", "userInf", "dizInf", "userInf", "joinGrp", "quitDiz", "exitGrp", "evctDiz",["chatMsg", "pcMsgP", "pdMsgP", "pgMsgP", "ppMsgP", "","","pmcMsgN", "pmpMsgN"],"pdOpen", "rename", "uGcmpr", "qnTkn", "destroyChrm", "createChrm", "exitChrm", "queryChrm", "joinChrm", "pGrps", "addBlack", "rmBlack", "getBlack", "blackStat", "addRelation", "qryRelation", "delRelation"];
    //桥连类，用于连接外部操作和内部操作
    var bridge = function (_appkey, _token, _callback) {
        //bridge._client为Client实例
        bridge._client = Client.connect(_appkey, _token, _callback);
        //设置监听器
        this.setListener = function (_changer) {
            if (typeof _changer == "object") {
                if (typeof _changer.onChanged == 'function') {
                    _ConnectionStatusListener = _changer;
                } else if (typeof _changer.onReceived == 'function') {
                    _ReceiveMessageListener = _changer;
                }
            }
        };
        //重连
        this.reConnect = function (callback) {
            bridge._client.channel.reconnect(callback)
        };
        //断连
        this.disConnect = function () {
            bridge._client.clearHeartbeat();
            bridge._client.channel.disconnect()
        };
        //执行queryMessage请求
        this.queryMsg = function (topic, content, targetId, callback, pbname) {
            if (typeof topic != "string") {
                topic = _topic[topic]
            }
            bridge._client.queryMessage(topic, content, targetId, Qos.AT_MOST_ONCE, callback, pbname)
        };
        //执行publishMessage请求
        this.pubMsg = function (topic, content, targetId, callback, msg) {
            bridge._client.publishMessage(_topic[10][topic], content, targetId, callback, msg)
        };
    };
    //存储会话列表的类
    var _func = function () {
        //添加会话，当前列表没有该会话则将该会话加到队列最后，有的话将该会话放到队列最开始
        this.add = function (x) {
            for (var i = 0,len = this.length; i < len; i++) {
                if (this[i].getTargetId() === x.getTargetId() && i != 0 && this[i].getConversationType() == x.getConversationType()) {
                    this.unshift(this.splice(i, 1)[0]);
                    return;
                }
            }
            this.unshift(x);
        };
        //根据会话类型和tagetid从列表中得到会话
        this.get = function (conver, tarid) {
            for (var i = 0,len =  this.length; i <len; i++) {
                if (this[i].getTargetId() == tarid && this[i].getConversationType() == conver) {
                    return this[i]
                }
            }
            return null;
        }
    };
    _func.prototype = [];
    //本地会话类型和服务器端会话类型映射关系
    var C2S = {
        "4": 1,
        "2": 2,
        "3": 3,
        "1": 5};

    //得到具体类型
    function getType(str) {
        var temp = Object.prototype.toString.call(str).toLowerCase();
        return temp.slice(8, temp.length - 1);
    }

    //检查参数是否合法
    function check(f, d) {
        var c = arguments.callee.caller;
        if ('_client' in bridge || d) {
            for (var g = 0, e = c.arguments.length; g < e; g++) {
                if (!new RegExp(getType(c.arguments[g])).test(f[g])) {
                    throw new Error("The index of " + g + " parameter was wrong type " + getType(c.arguments[g]) + " [" + f[g] + "]")
                }
            }
        } else {
            throw new Error("The parameter is incorrect or was not yet instantiated RongIMClient")
        }
    }

    //sdk外部逻辑核心类
    function RongIMClient(_appkey) {
        var appkey = _appkey,
            self = this,
        //a为桥连类实例
            a ,
        //监听器队列
            listenerList = [],
        //会话列表
            _ConversationList = new _func(),

        //本地临时会话存储，用于存储草稿
            sessionStore = global.sessionStorage || new function () {
                var c = {};
                this.length = 0;
                this.clear = function () {
                    c = {};
                    this.length = 0
                };
                this.setItem = function (e, f) {
                    !c[e] && this.length++;
                    c[e] = f;
                    return e in c
                };
                this.getItem = function (e) {
                    return c[e]
                };
                this.removeItem = function (f) {
                    if (f in c) {
                        delete c[f];
                        this.length--;
                        return true;
                    }
                    return false;
                }
            };
        this.bolHistoryMessages = true;
        this.deltaTime = 0;
        //清空草稿
        this.clearTextMessageDraft = function (c, e) {
            check(["object", "string"]);
            return sessionStore.removeItem(c + "_" + e)
        };
        //得到草稿
        this.getTextMessageDraft = function (c, d) {
            check(["object", "string"]);
            return sessionStore.getItem(c + "_" + d)
        };
        //保存草稿
        this.saveTextMessageDraft = function (d, e, c) {
            check(["object", "string", "string"]);
            return sessionStore.setItem(d + "_" + e, c)
        };
        //得到io通道对象
        this.getIO = function () {
            return io
        };
        //连接服务器
        this.connect = function (c, e) {
            check(["string", "object"], true);
            a = new bridge(appkey, c, e);
            for (var d = 0,len = listenerList.length; d < len; d++) {
                a['setListener'](listenerList[d])
            }
            listenerList = [];
        };
        //断开连接
        this.disconnect = function () {
            if (a) {
                _ConversationList = new _func();
                a.disConnect()
            }
        };
        //重连操作
        this.reconnect = function (callback) {
            check(["object"]);
            if (a) {
                a.reConnect(callback);
            }
        };

        //同步会话列表
        this.syncConversationList = function (callback) {
            check(["object"]);
            var modules = new Modules.RelationsInput();
            modules.setType(1);
            a.queryMsg(26, io.util.arrayFrom(modules.toArrayBuffer()), bridge._client.userId, {
                onSuccess: function (list) {
                    io.util.forEach(list.info, function (x) {
                        if (x.type > 6) {
                            return;
                        };
                        var val = self.createConversation(RongIMClient.ConversationType.setValue(mapping[x.type]), x.userId, '', true);

                        //获取最后一条消息
                        if (x.msg && x.msg.content) {
                            var msg = messageParser(x.msg);
                            if (msg){
                                if (!val.getLatestMessage() || (val.getLatestMessage().getSentTime() < msg.getSentTime())){
                                    val.setLatestMessage(msg);
                                }
                            }
                        }
                        /*if (self.bolHistoryMessages
                                && RongIMClient.ConversationType.setValue(mapping[x.type]) != RongIMClient.ConversationType.CHATROOM) {
                            self.getHistoryMessages(RongIMClient.ConversationType.setValue(mapping[x.type]), x.userId, 1, {
                                onSuccess: function(symbol, HistoryMessages) {
                                    var msg = HistoryMessages[0];
                                    val.setLatestMessage(msg);
                                    lastReadTime.remove(RongIMClient.ConversationType.setValue(mapping[x.type]) + x.userId);
                                }, onError: function(err) {
                                    self.bolHistoryMessages = false;
                                    console.log(err);
                                }
                            });
                        };*/

                        if (x.type == 1) {
                            self.getUserInfo(x.userId, {
                                onSuccess: function (info) {
                                    if (info.getUserName) {
                                        val.setConversationTitle(info.getUserName());
                                        val.setConversationPortrait(info.getPortraitUri());
                                    }
                                },
                                onError: function (x) {
                                    console.log(x);
                                }
                            })
                        } else if(x.type == 2) {
                            self.getDiscussion(x.userId, {
                                onSuccess: function (info) {
                                    if (info.getName) {
                                        val.setConversationTitle(info.getName());
                                    }
                                },
                                onError: function (x) {
                                    console.log(x);
                                }
                            })
                        }
                    });
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                }
            }, "RelationsOutput");
        };

        //会话列表排序
        this.sortConversationList = function (List) {
            function clone(obj) {
                var o, obj;
                if (obj.constructor == Object){
                    o = new obj.constructor();
                }else{
                    o = new obj.constructor(obj.valueOf());
                }
                for(var key in obj){
                    if ( o[key] != obj[key] ){
                        if ( typeof(obj[key]) == 'object' ){
                            o[key] = clone(obj[key]);
                        }else{
                            o[key] = obj[key];
                        }
                    }
                }
                o.toString = obj.toString;
                o.valueOf = obj.valueOf;
                return o;
            };
            if (List.length <= 1 || !this.bolHistoryMessages) {
                return List;
            }
            ConversationList = clone(List);
            var pivotIndex = Math.floor(ConversationList.length / 2);
            var pivot = ConversationList.splice(pivotIndex, 1)[0];
            var msg = pivot.getLatestMessage();
            var pivotTime = null;
            if (msg) {
                try {
                    pivotTime = msg.getSentTime();
                } catch(e) {
                    pivotTime = (new Date).getTime();
                }
            } else {
                pivotTime = (new Date).getTime();
            }
            var left = [];
            var right = [];
            for (var i = 0,len = ConversationList.length; i < len; i++){
                var tmpConversation = ConversationList[i];
                var tmpMsg = tmpConversation.getLatestMessage();
                var tmpSentTime = null;
                if (tmpMsg) {
                    try {
                        tmpSentTime = tmpMsg.getSentTime();
                    } catch(e) {
                        tmpSentTime = (new Date).getTime();
                    }
                };
                if (tmpSentTime > pivotTime) {
                    right.push(tmpConversation);
                } else {
                    left.push(tmpConversation);
                }
            }
            return this.sortConversationList(right).concat([pivot], this.sortConversationList(left));
        };
        this.getDelaTime = function(){
            return this.deltaTime;
        };
        //得到具体会话
        this.getConversation = function (c, e) {
            check(["object", "string"]);
            return this.getConversationList().get(c, e);
        };
        //得到会话列表
        this.getConversationList = function () {
            return _ConversationList;
        };
        //得到会话通知状态
        this.getConversationNotificationStatus = function (f, d, e) {
            check(["object", "string", "object"]);
            var c = this.getConversation(f, d);
            if (c) {
                e.onSuccess(c.getNotificationStatus())
            } else {
                e.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR)
            }
        };
        //清空指定会话类型的会话
        this.clearConversations = function (list) {
            check(["array"]);
            var arr = [];
            for (var i = 0,len = list.length; i < len; i++) {
                for (var j = 0,jLen=_ConversationList.length; j < jLen; j++) {
                    _ConversationList[j].getConversationType() == list[i] && arr.push(j);
                }
            }
            for (i = 0,len = arr.length; i < len; i++) {
                var val = _ConversationList[arr[i] - i];
                this.removeConversation(val.getConversationType(), val.getTargetId());
            }
        };
        //得到会话类型为group的会话
        this.getGroupConversationList = function () {
            var arr = [];
            for (var i = 0, item; item = this.getConversationList()[i++];) {
                if (item.getConversationType() == 3) {
                    arr.push(item);
                }
            }
            return arr;
        };
        //移除指定会话
        this.removeConversation = function (c, e) {
            check(["object", "string"]);
            var d = io.util.remove(this.getConversationList(), function (f) {
                return f.getTargetId() == e && f.getConversationType() == c
            });
            if (!d)
                return;
            //删除服务器上存储的会话
            var mod = new Modules.RelationsInput();
            mod.setType(C2S[c.valueOf()]);
            //mod.setUserId(e);
            a.queryMsg(27, io.util.arrayFrom(mod.toArrayBuffer()), e, {
                onSuccess: function () {
                }, onError: function () {
                }
            });
        };
        //设置指定会话通知状态
        this.setConversationNotificationStatus = function (f, d, g, e) {
            check(["object", "string", "object", "object"]);
            var c = this.getConversation(f, d);
            if (c) {
                c.setNotificationStatus(g);
                e.onSuccess(g)
            } else {
                e.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR)
            }
        };
        //将指定会话设置为列表第一个
        this.setConversationToTop = function (c, e) {
            check(["object", "string"]);
            this.getConversation(c, e).setTop()
        };
        //设置会话名称
        this.setConversationName = function (f, e, d) {
            check(["object", "string", "string"]);
            this.getConversation(f, e).setConversationTitle(d)
        };
        //创建一个会话
        this.createConversation = function (f, d, e, islocal) {
            if (d=="cstest") {
                return;
            }
            check(["object", "string", "string", "boolean|undefined"]);
            var g = this.getConversationList().get(f, d);
            if (g) {
                return g
            }
            var c = new RongIMClient.Conversation();
            c.setTargetId(d);
            c.setConversationType(f);
            c.setConversationTitle(e);
            c.setTop();
            if (/^[1234]$/.test(f.valueOf()) && !islocal) {
                //如果会话类型为1、2、3、4并且不仅是操作本地的会话列表，就把该会话同步到服务器
                var mod = new Modules.RelationsInput();
                mod.setType(C2S[f.valueOf()]);
                a.queryMsg(25, io.util.arrayFrom(mod.toArrayBuffer()), d, {
                    onSuccess: function () {
                    }, onError: function () {
                    }
                });
            }
            return c
        };
        //得到当前登陆人员信息
        this.getCurrentUserInfo = function (callback) {
            check(["object"]);
            this.getUserInfo(bridge._client.userId, callback);
        };
        //得到执行人员信息
        this.getUserInfo = function (c, e) {
            check(["string", "object"]);
            var d = new Modules.GetUserInfoInput();
            d.setNothing(1);
            a.queryMsg(5, io.util.arrayFrom(d.toArrayBuffer()), c, e, "GetUserInfoOutput")
        };
        //发送消息
        this.sendMessage = function (h, v, e, c, u) {
            check(["object", "string", "object", "object|null|global", "object"]);
            if (!io.getInstance().connected || h == 5) {
                //如果连接不可用，或者会话类型为5(system)主动抛出错误
                u.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                return;
            }
            //进行RongIMClient.MessageContent操作
            if (!(e instanceof RongIMClient.MessageContent)) {
                e = new RongIMClient.MessageContent(e);
            }
            if (c) {
                c.process(e.getMessage())
            }
            //pb处理后的消息对象
            var g = e.encode(),
            //发送的消息对象
                i = e.getMessage(),
                j;
            i.setConversationType(h);
            i.setMessageDirection(RongIMClient.MessageDirection.SEND);
            if (!i.getMessageId())
                i.setMessageId(h + "_" + ~~(Math.random() * 0xffffff));
            i.setSentStatus(RongIMClient.SentStatus.SENDING);
            i.setSenderUserId(bridge._client.userId);
            i.setSentTime((new Date).getTime());
            i.setTargetId(v);
            // if (/ISCOUNTED/.test(i.getMessageTag())) {
            if (i.getCount) {
                j = this.getConversationList().get(h, v);
                if (!j) {
                    j = this.createConversation(h, v, "");
                }
                j.setSentTime((new Date).getTime());
                j.setSentStatus(RongIMClient.SentStatus.SENDING);
                j.setSenderUserName("");
                j.setSenderUserId(bridge._client.userId);
                j.setObjectName(i.getObjectName());
                j.setNotificationStatus(RongIMClient.ConversationNotificationStatus.DO_NOT_DISTURB);
                j.setLatestMessageId(i.getMessageId());
                j.setLatestMessage(e.getMessage());
                j.setUnreadMessageCount(0);
                j.setTop();
            }
            a.pubMsg(h.valueOf(), g, v, u, i)
        };
        //上传文件
        this.uploadMedia = function (f, c, d, e) {
            check(["object", "string", "string", "object"])
        };
        //得到七牛token
        this.getUploadToken = function (c) {
            check(["object"]);
            var d = new Modules.GetQNupTokenInput();
            d.setType(1);
            a.queryMsg(14, io.util.arrayFrom(d.toArrayBuffer()), bridge._client.userId, c, "GetQNupTokenOutput")
        };
        //得到下载地址
        this.getDownloadUrl = function (d, c) {
            check(["string", "object"]);
            var e = new Modules.GetQNdownloadUrlInput();
            e.setType(1);
            e.setKey(d);
            a.queryMsg(14, io.util.arrayFrom(e.toArrayBuffer()), bridge._client.userId, c, "GetQNdownloadUrlOutput")
        };
        //设置连接状态监听器
        this.setConnectionStatusListener = function (c) {
            if (a) {
                a.setListener(c);
            } else {
                listenerList.push(c)
            }
        };
        //设置消息监听器
        this.setOnReceiveMessageListener = function (c) {
            if (a) {
                a.setListener(c)
            } else {
                listenerList.push(c)
            }
        };
        //得到所有未读消息数
        this.getTotalUnreadCount = function () {
            var count = 0;
            io.util.forEach(this.getConversationList(), function (x) {
                count += x.getUnreadMessageCount();
            });
            return count;
        };
        //得到指定会话未读消息数
        this.getUnreadCount = function (_conversationTypes, targetId) {
            check(["array|object", "string|undefined"]);
            var count = 0;
            if (getType(_conversationTypes) == "array") {
                var l = this.getConversationList();
                for (var i = 0,len = _conversationTypes.length; i < len; i++) {
                    io.util.forEach(l, function (x) {
                        x.getConversationType() == _conversationTypes[i] && (count += x.getUnreadMessageCount());
                    })
                }
            } else {
                if (_conversationTypes == 0) {
                    return count;
                }
                var end = this.getConversationList().get(_conversationTypes, targetId);
                end && (count = end.getUnreadMessageCount());
            }
            return count;
        };
        //清空指定会话未读消息数
        this.clearMessagesUnreadStatus = function (conversationType, targetId) {
            check(["object", "string"]);
            if (conversationType == 0) {
                return false;
            }
            var end = this.getConversationList().get(conversationType, targetId);
            return !!(end ? end.setUnreadMessageCount(0) || 1 : 0);
        };
        //初始化聊天室
        this.initChatRoom = function (Id) {
            check(["string"]);
            bridge._client.chatroomId = Id;
        };
        //加入聊天室
        this.joinChatRoom = function (Id, defMessageCount, callback) {
            check(["string", "number", "object"]);
            var e = new Modules.ChrmInput();
            e.setNothing(1);
            a.queryMsg(19, io.util.arrayFrom(e.toArrayBuffer()), Id, {
                onSuccess: function () {
                    callback.onSuccess();
                    bridge._client.chatroomId = Id;
                    var modules = new Modules.ChrmPullMsg();
                    defMessageCount == 0 && (defMessageCount = -1);
                    modules.setCount(defMessageCount);
                    modules.setSyncTime(0);
                    //加入成功进行拉取聊天室消息操作
                    bridge._client.queryMessage('chrmPull', io.util.arrayFrom(modules.toArrayBuffer()), Id, 1, {
                        onSuccess: function (collection) {
                            var sync = io.util.int64ToTimestamp(collection.syncTime);
                            io.util.cookieHelper.setItem(bridge._client.userId + 'CST', sync);
                            var list = collection.list;
                            //把拉取到的消息逐条传给消息监听器
                            for (var i = 0,len = list.length; i <len; i++) {
                                bridge._client.handler.onReceived(list[i])
                            }
                        },
                        onError: function (x) {
                            callback.onError(x);
                        }
                    }, 'DownStreamMessages')
                },
                onError: function () {
                    callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                }
            }, "ChrmOutput");
        };
        //退出聊天室
        this.quitChatRoom = function (Id, callback) {
            check(["string", "object"]);
            var e = new Modules.ChrmInput();
            e.setNothing(1);
            a.queryMsg(17, io.util.arrayFrom(e.toArrayBuffer()), Id, callback, "ChrmOutput")
        };
        //发送通知消息的类型
        this.sendNotification = function (_conversationType, _targetId, _content, _callback) {
            check(["object", "string", "object", "object"]);
            if (_content instanceof RongIMClient.NotificationMessage)
                this.sendMessage(_conversationType, _targetId, new RongIMClient.MessageContent(_content), null, _callback);
            else
                throw new Error("Wrong Parameters");
        };
        //发送状态类型的消息
        this.sendStatus = function (_conversationType, _targetId, _content, _callback) {
            check(["object", "string", "object", "object"]);
            if (_content instanceof RongIMClient.StatusMessage)
                this.sendMessage(_conversationType, _targetId, new RongIMClient.MessageContent(_content), null, _callback);
            else
                throw new Error("Wrong Parameters");
        };
        //设置讨论组邀请状态
        this.setDiscussionInviteStatus = function (_targetId, _status, _callback) {
            check(["string", "object", "object"]);
            var modules = new Modules.ModifyPermissionInput();
            modules.setOpenStatus(_status.valueOf());
            a.queryMsg(11, io.util.arrayFrom(modules.toArrayBuffer()), _targetId, {
                onSuccess: function (x) {
                    _callback.onSuccess(RongIMClient.DiscussionInviteStatus.setValue(x));
                }, onError: _callback.onError
            })
        };
        //设置讨论组名称
        this.setDiscussionName = function (_discussionId, _name, _callback) {
            check(["string", "string", "object"]);
            var modules = new Modules.RenameChannelInput();
            modules.setName(_name);
            a.queryMsg(12, io.util.arrayFrom(modules.toArrayBuffer()), _discussionId, _callback)
        };
        //将指定成员移除讨论组
        this.removeMemberFromDiscussion = function (_disussionId, _userId, _callback) {
            check(["string", "string", "object"]);
            var modules = new Modules.ChannelEvictionInput();
            modules.setUser(_userId);
            a.queryMsg(9, io.util.arrayFrom(modules.toArrayBuffer()), _disussionId, _callback);
        };
        //创建讨论组
        this.createDiscussion = function (_name, _userIdList, _callback) {
            check(["string", "array", "object"]);
            var modules = new Modules.CreateDiscussionInput();
            modules.setName(_name);
            a.queryMsg(1, io.util.arrayFrom(modules.toArrayBuffer()), bridge._client.userId, {
                onSuccess: function (data) {
                    var modules = new Modules.ChannelInvitationInput();
                    modules.setUsers(_userIdList);
                    a.queryMsg(0, io.util.arrayFrom(modules.toArrayBuffer()), data, {
                        onSuccess: function () {
                        },
                        onError: function () {
                            _callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                        }
                    });
                    _callback.onSuccess(data);
                },
                onError: function () {
                    _callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                }
            }, "CreateDiscussionOutput");
        };
        //添加指定成员到讨论组
        this.addMemberToDiscussion = function (_discussionId, _userIdList, _callback) {
            check(["string", "array", "object"]);
            var modules = new Modules.ChannelInvitationInput();
            modules.setUsers(_userIdList);
            a.queryMsg(0, io.util.arrayFrom(modules.toArrayBuffer()), _discussionId, _callback);
        };
        //得到讨论组信息
        this.getDiscussion = function (_discussionId, _callback) {
            check(["string", "object"]);
            var modules = new Modules.ChannelInfoInput();
            modules.setNothing(1);
            a.queryMsg(4, io.util.arrayFrom(modules.toArrayBuffer()), _discussionId, _callback, "ChannelInfoOutput");
        };
        //退出讨论组
        this.quitDiscussion = function (_discussionId, _callback) {
            check(["string", "object"]);
            var modules = new Modules.LeaveChannelInput();
            modules.setNothing(1);
            a.queryMsg(7, io.util.arrayFrom(modules.toArrayBuffer()), _discussionId, _callback);
        };
        //退出群
        this.quitGroup = function (_groupId, _callback) {
            check(["string", "object"]);
            var modules = new Modules.LeaveChannelInput();
            modules.setNothing(1);
            a.queryMsg(8, io.util.arrayFrom(modules.toArrayBuffer()), _groupId, _callback);
        };
        //加入群
        this.joinGroup = function (_groupId, _groupName, _callback) {
            check(["string", "string", "object"]);
            var modules = new Modules.GroupInfo();
            modules.setId(_groupId);
            modules.setName(_groupName);
            var _mod = new Modules.GroupInput();
            _mod.setGroupInfo([modules]);
            a.queryMsg(6, io.util.arrayFrom(_mod.toArrayBuffer()), _groupId, _callback, "GroupOutput");
        };
        //同步群
        this.syncGroup = function (_groups, _callback) {
            check(["array", "object"]);
            //去重操作
            for (var i = 0, part = [], info = [],len = _groups.length; i < len; i++) {
                if (part.length === 0 || !new RegExp(_groups[i].getId()).test(part)) {
                    part.push(_groups[i].getId());
                    var groupinfo = new Modules.GroupInfo();
                    groupinfo.setId(_groups[i].getId());
                    groupinfo.setName(_groups[i].getName());
                    info.push(groupinfo);
                }
            }
            var modules = new Modules.GroupHashInput();
            modules.setUserId(bridge._client.userId);
            modules.setGroupHashCode(MD5(part.sort().join("")));
            //发给服务器进行md5比对
            a.queryMsg(13, io.util.arrayFrom(modules.toArrayBuffer()), bridge._client.userId, {
                onSuccess: function (result) {
                    //1为群信息不匹配需要发送给服务器进行同步，0不需要同步
                    if (result === 1) {
                        var val = new Modules.GroupInput();
                        val.setGroupInfo(info);
                        //比对成功，把群信息发送给服务器
                        a.queryMsg(20, io.util.arrayFrom(val.toArrayBuffer()), bridge._client.userId, {
                            onSuccess: function () {
                                _callback.onSuccess();
                            },
                            onError: function () {
                                _callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                            }
                        }, "GroupOutput");
                    } else {
                        _callback.onSuccess();
                    }
                },
                onError: function () {
                    _callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                }
            }, "GroupHashOutput");
        };
        //添加黑名单
        this.addToBlacklist = function (userId, callback) {
            check(["string", "object"]);
            var modules = new Modules.Add2BlackListInput();
            this.getCurrentUserInfo({
                onSuccess:function(info){
                    var uId = info.getUserId();
                    modules.setUserId(userId);
                    a.queryMsg(21, io.util.arrayFrom(modules.toArrayBuffer()), uId, callback);
                 //成功 info instanceOf RongIMClient.UserInfo
                },onError:function(){
                 //失败
                    console.log("添加黑名单失败：addToBlacklist");
                }
            });
        };
        //得到黑名单
        this.getBlacklist = function (callback) {
            check(["object"]);
            var modules = new Modules.QueryBlackListInput();
            modules.setNothing(1);
            a.queryMsg(23, io.util.arrayFrom(modules.toArrayBuffer()), bridge._client.userId, callback, "QueryBlackListOutput");
        };
        //得到指定人员再黑名单中的状态
        this.getBlacklistStatus = function (userId, callback) {
            check(["string", "object"]);
            var modules = new Modules.BlackListStatusInput();
            this.getCurrentUserInfo({
                onSuccess:function(info) {
                    var uId = info.getUserId();
                    modules.setUserId(userId);
                    a.queryMsg(24, io.util.arrayFrom(modules.toArrayBuffer()), uId, {
                        onSuccess: function (x) {
                            callback.onSuccess(RongIMClient.BlacklistStatus.setValue(x));
                        }, onError: function () {
                            callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                        }
                    });
                },
                onError: function() {
                    console.log("获取黑名单状态出错：getBlacklistStatus.");
                }
            });
        };
        //移除黑名单
        this.removeFromBlacklist = function (userId, callback) {
            check(["string", "object"]);
            var modules = new Modules.RemoveFromBlackListInput();
            this.getCurrentUserInfo({
                onSuccess:function(info) {
                    var uId = info.getUserId();
                    modules.setUserId(userId);
                    a.queryMsg(22, io.util.arrayFrom(modules.toArrayBuffer()), uId, callback);
                },
                onError: function() {
                    console.log("获取用户信息失败：removeFromBlacklist");
                }
            });
        };
        //历史消息映射，key为会话类型，value为服务器的topic
        var HistoryMsgType = {
                "4": "qryPMsg",
                "1": "qryCMsg",
                "3": "qryGMsg",
                "2": "qryDMsg",
                "5": "qrySMsg",
                "7": "qryPMsg",
                "8": "qryPMsg"
            }, //缓存拉取历史消息的时间戳，
            LimitableMap = function (limit) {
                this.limit = limit || 10;
                this.map = {};
                this.keys = [];
            }, lastReadTime = new LimitableMap();
        LimitableMap.prototype.set = function (key, value) {
            var map = this.map;
            var keys = this.keys;
            if (!map.hasOwnProperty(key)) {
                if (keys.length === this.limit) {
                    var firstKey = keys.shift();
                    delete map[firstKey];
                }
                keys.push(key)
            }
            map[key] = value;
        };
        LimitableMap.prototype.get = function (key) {
            return this.map[key] || 0;
        };
        LimitableMap.prototype.remove = function (key) {
            delete this.map[key];
        };
        /**
         * converastionType: 消息类型
         * userId: 对话 targetId
         */
        this.resetGetHistoryMessages = function(conversationType, userId) {
            if (typeof userId != 'string') {
                userId = userId.toString();
            };
            lastReadTime.remove(conversationType + userId);
        };
        //拉取历史消息，单次最多20条
        this.getHistoryMessages = function (_conversationtype, targetid, size, callback) {
            check(["object", "string", "number", "object"]);
            if (_conversationtype.valueOf() == 0) {
                callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                return;
            }
            var modules = new Modules.HistoryMessageInput();
            modules.setTargetId(targetid);
            modules.setDataTime(lastReadTime.get(_conversationtype + targetid));
            modules.setSize(size);
            a.queryMsg(HistoryMsgType[_conversationtype.valueOf()], io.util.arrayFrom(modules.toArrayBuffer()), targetid, {
                onSuccess: function (data) {
                    var list = data.list.reverse();
                    lastReadTime.set(_conversationtype + targetid, io.util.int64ToTimestamp(data.syncTime));
                    for (var i = 0,len = list.length; i < len; i++) {
                        list[i] = messageParser(list[i]);
                    }
                    //hasMsg表示是否还有未拉取到的消息，list为拉取到的消息队列
                    callback.onSuccess(!!data.hasMsg, list);
                }, onError: function () {
                    callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
                }
            }, "HistoryMessagesOuput");
        };
    }

    //版本号
    RongIMClient.version = "0.9.15";
    RongIMClient.isSyncOfflineMsg = true;
    RongIMClient.PCClient = false;
    // RongIMClient.connect静态方法，执行连接操作
    RongIMClient.connect = function (d, a) {
        if (!RongIMClient.getInstance) {
            throw new Error("please init")
        }
        //判断protobuf文件加载是否完成
        if (global.Modules) {
            //完成执行connect方法
            RongIMClient.getInstance().connect(d, a);
        } else {
            //把token、回调函数赋值给RongIMClient.connect，让protobuf文件自己来触发连接操作
            RongIMClient.connect.token = d;
            RongIMClient.connect.callback = a;
        }
    };
    //是否有未接收的消息，jsonp方法
    RongIMClient.hasUnreadMessages = function (appkey, token, callback) {
        var xss = document.createElement("script");
        xss.src = "http://api.cn.ronghub.com/message/exist.js?appKey=" + encodeURIComponent(appkey) + "&token=" + encodeURIComponent(token) + "&callBack=RongIMClient.hasUnreadMessages.RCcallback&_=" + Date.now();
        document.body.appendChild(xss);
        xss.onerror = function () {
            callback.onError(RongIMClient.callback.ErrorCode.UNKNOWN_ERROR);
            xss.parentNode.removeChild(xss);
        };
        RongIMClient.hasUnreadMessages.RCcallback = function (x) {
            callback.onSuccess(!!+x.status);
            xss.parentNode.removeChild(xss);
        };
    };
    //初始化。生成一个RongIMClient单例
    RongIMClient.init = function (d) {
        var instance = null;
        RongIMClient.getInstance === undefined && (RongIMClient.getInstance = function () {
            if (instance == null) {
                instance = new RongIMClient(d);
            }
            return instance;
        });
    };
    //自定义消息类型映射对象
    var registerMessageTypeMapping = {};
    //注册自定义消息
    RongIMClient.registerMessageType = function (regMsg) {
        if (!RongIMClient.getInstance) {
            throw new Error("unInitException")
        }
        if ("messageType" in regMsg && "objectName" in regMsg && "fieldName" in regMsg) {
            registerMessageTypeMapping[regMsg.objectName] = regMsg.messageType;
            var temp = RongIMClient[regMsg.messageType] = function (c) {
                RongIMClient.RongIMMessage.call(this, c);
                RongIMClient.MessageType[regMsg.messageType] = regMsg.messageType;
                this.setMessageType(regMsg.messageType);
                this.setObjectName(regMsg.objectName);
                for (var i = 0,len = regMsg.fieldName.length; i < len; i++) {
                    var item = regMsg.fieldName[i];
                    this["set" + item] = (function (na) {
                        return function (a) {
                            this.setContent(a, na);
                        }
                    })(item);
                    this["get" + item] = (function (na) {
                        return function () {
                            return this.getDetail()[na];
                        }
                    })(item);
                }
            };
            io.util._extends(temp, RongIMClient.RongIMMessage)
        } else
            throw new Error("registerMessageType:arguments type is error");
    };
    //设置连接状态监听器
    RongIMClient.setConnectionStatusListener = function (a) {
        if (!RongIMClient.getInstance) {
            throw new Error("unInitException")
        }
        RongIMClient.getInstance().setConnectionStatusListener(a)
    };
    //消息基类，此类是对安卓消息基类的重新实现
    RongIMClient.RongIMMessage = function (content) {
      var x = "unknown",
          ISPERSISTED = 1,
          ISCOUNTED = 2,
          u, z = content || {},
          o, q, t, y, a, p, s, v, r,h,mu, c = '';
      this.getPushContent = function() {
          return c;//pushContent
      };
      this.getDetail = function () {
          return z;
      };
      //老版本问题，没有具体实现
      this.getMessageTag = function () {
          return [RongIMClient.MessageTag.ISPERSISTED, RongIMClient.MessageTag.ISCOUNTED, RongIMClient.MessageTag.ISDISPLAYED];
      };
      this.getContent = function () {
          return z.content
      };
      this.getConversationType = function () {
          return o
      };
      //是否持久化
      this.getPersist = function() {
          return ISPERSISTED;
      };
      //是否计数
      this.getCount = function() {
          return ISCOUNTED;
      };

      this.getHasReceivedByOtherClient = function() {
          return h;
      };

      this.setHasReceivedByOtherClient = function(x) {
          h = x;
      };

      this.getMessageUId = function() {
          return mu;
      };

      this.setMessageUId = function(x) {
          mu = x;
      };

      this.setPersist = function(x) {
          var arr = [0, 1];
          if (x in arr) {
              ISPERSISTED = x;
          };
      };
      this.setCount = function(x) {
          var arr = [0, 2];
          if (x in arr) {
              ISCOUNTED = x;
          };
      };
      this.getExtra = function () {
          return z.extra;
      };
      this.getMessageDirection = function () {
          return q
      };
      this.getMessageId = function () {
          return t
      };
      this.getObjectName = function () {
          return y
      };
      this.getReceivedStatus = function () {
          return a
      };
      this.getReceivedTime = function () {
          return u
      };
      this.getSenderUserId = function () {
          return p
      };
      this.getSentStatus = function () {
          return s
      };
      this.getTargetId = function () {
          return r
      };
      this.setPushContent = function(v) {
          c = v;
      };
      this.setContent = function (c, d) {
          z[d || "content"] = c
      };
      this.setConversationType = function (c) {
          o = c
      };
      this.setExtra = function (c) {
          z.extra = c;
      };
      this.setMessageDirection = function (c) {
          q = c
      };
      this.setMessageId = function (c) {
          t = c
      };
      this.setObjectName = function (c) {
          y = c
      };
      this.setReceivedStatus = function (c) {
          a = c
      };
      this.setSenderUserId = function (c) {
          p = c
      };
      this.setSentStatus = function (c) {
          return !!(s = c)
      };
      this.setSentTime = function (c) {
          v = io.util.int64ToTimestamp(c);
      };
      this.getSentTime = function () {
          return v;
      };
      this.setTargetId = function (c) {
          r = c
      };
      this.setReceivedTime = function (c) {
          u = c
      };
      this.toJSONString = function () {
          var c = {
              "receivedTime": u,
              "messageType": x,
              "details": z,
              "conversationType": o,
              "direction": q,
              "messageId": t,
              "objectName": y,
              "senderUserId": p,
              "sendTime": v,
              "targetId": r,
              "hasReceivedByOtherClient":h
          };
          return JSON.stringify(c)
      };
      this.getMessageType = function () {
          return x
      };
      this.setMessageType = function (c) {
          x = c
      };
    };
    //通知类型消息基类，继承自RongIMMessage
    RongIMClient.NotificationMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        //老版本问题
        this.getMessageTag = function () {
            return [RongIMClient.MessageTag.ISPERSISTED, RongIMClient.MessageTag.ISDISPLAYED];
        };
        this.setCount(0);
    };
    io.util._extends(RongIMClient.NotificationMessage, RongIMClient.RongIMMessage);
    //状态类型消息基类，继承自RongIMMessage
    RongIMClient.StatusMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.getMessageTag = function () {
            return ['NONE'];
        };
        this.setCount(0);
        this.setPersist(0);
    };
    io.util._extends(RongIMClient.StatusMessage, RongIMClient.RongIMMessage);
    //文本消息
    //IS_SAVE =1,IS_COUNT=2
    RongIMClient.TextMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.TextMessage);
        this.setObjectName("RC:TxtMsg");
    };
    RongIMClient.TextMessage.obtain = function (text) {
        return new RongIMClient.TextMessage({
            content: text,
            extra: ""
        })
    };
    io.util._extends(RongIMClient.TextMessage, RongIMClient.RongIMMessage);
    //图片消息
    RongIMClient.ImageMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.ImageMessage);
        this.setObjectName("RC:ImgMsg");
        this.setImageUri = function (a) {
            this.setContent(a, "imageUri")
        };
        this.getImageUri = function () {
            return this.getDetail().imageUri
        };
    };
    RongIMClient.ImageMessage.obtain = function (content, imageUri) {
        return new RongIMClient.ImageMessage({
            content: content,
            imageUri: imageUri,
            extra: ""
        });
    };
    io.util._extends(RongIMClient.ImageMessage, RongIMClient.RongIMMessage);
    //图文消息
    RongIMClient.RichContentMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.RichContentMessage);
        this.setObjectName("RC:ImgTextMsg");
        this.setTitle = function (a) {
            this.setContent(a, "title")
        };
        this.getTitle = function () {
            return this.getDetail().title;
        };
        this.setImageUri = function (a) {
            this.setContent(a, "imageUri")
        };
        this.getImageUri = function () {
            return this.getDetail().imageUri;
        };
    };
    RongIMClient.RichContentMessage.obtain = function (title, content, imageUri) {
        return new RongIMClient.RichContentMessage({
            title: title,
            content: content,
            imageUri: imageUri,
            extra: ""
        })
    };
    io.util._extends(RongIMClient.RichContentMessage, RongIMClient.RongIMMessage);
    //音频消息
    RongIMClient.VoiceMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setObjectName("RC:VcMsg");
        this.setMessageType(RongIMClient.MessageType.VoiceMessage);
        this.setDuration = function (a) {
            this.setContent(a, "duration")
        };
        this.getDuration = function () {
            return this.getDetail().duration;
        };
    };
    RongIMClient.VoiceMessage.obtain = function (content, duration) {
        return new RongIMClient.VoiceMessage({
            content: content,
            duration: duration,
            extra: ""
        })
    };
    io.util._extends(RongIMClient.VoiceMessage, RongIMClient.RongIMMessage);
    //客服握手消息
    RongIMClient.HandshakeMessage = function () {
        RongIMClient.RongIMMessage.call(this);
        this.setMessageType(RongIMClient.MessageType.HandshakeMessage);
        this.setObjectName("RC:HsMsg");
    };
    io.util._extends(RongIMClient.HandshakeMessage, RongIMClient.RongIMMessage);
    //中断客服消息
    RongIMClient.SuspendMessage = function () {
        RongIMClient.RongIMMessage.call(this);
        this.setMessageType(RongIMClient.MessageType.SuspendMessage);
        this.setObjectName("RC:SpMsg");
    };
    io.util._extends(RongIMClient.SuspendMessage, RongIMClient.RongIMMessage);
    //未知消息
    RongIMClient.UnknownMessage = function (c, o) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.UnknownMessage);
        this.setObjectName(o);
    };
    io.util._extends(RongIMClient.UnknownMessage, RongIMClient.RongIMMessage);
    //地理位置消息
    RongIMClient.LocationMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.LocationMessage);
        this.setObjectName("RC:LBSMsg");
        this.setLatitude = function (a) {
            this.setContent(a, "latitude")
        };
        this.getLatitude = function () {
            return this.getDetail().latitude;
        };
        this.setLongitude = function (a) {
            this.setContent(a, "longitude")
        };
        this.getLongitude = function () {
            return this.getDetail().longitude;
        };
        this.setPoi = function (a) {
            this.setContent(a, "poi")
        };
        this.getPoi = function () {
            return this.getDetail().poi;
        };
    };
    RongIMClient.LocationMessage.obtain = function (content, latitude, longitude, poi) {
        return new RongIMClient.LocationMessage({
            content: content,
            latitude: latitude,
            longitude: longitude,
            poi: poi,
            extra: ""
        })
    };
    io.util._extends(RongIMClient.LocationMessage, RongIMClient.RongIMMessage);
    //讨论组通知消息
    RongIMClient.DiscussionNotificationMessage = function (c) {
        RongIMClient.NotificationMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.DiscussionNotificationMessage);
        this.setObjectName("RC:DizNtf");
        var isReceived = false;
        this.getExtension = function () {
            return this.getDetail().extension;
        };
        this.getOperator = function () {
            return this.getDetail().operator;
        };
        this.getType = function () {
            return this.getDetail().type;
        };
        this.isHasReceived = function () {
            return isReceived;
        };
        this.setExtension = function (a) {
            this.setContent(a, "extension")
        };
        this.setHasReceived = function (x) {
            isReceived = !!x;
        };
        this.setOperator = function (a) {
            this.setContent(a, "operator")
        };
        this.setType = function (a) {
            this.setContent(a, "type");
            //1:加入讨论组 2：退出讨论组 3:讨论组改名 4：讨论组群主T人
        };
    };
    io.util._extends(RongIMClient.DiscussionNotificationMessage, RongIMClient.NotificationMessage);
    //信息通知消息，继承自NotificationMessage
    RongIMClient.InformationNotificationMessage = function (c) {
        RongIMClient.NotificationMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.InformationNotificationMessage);
        this.setObjectName("RC:InfoNtf");
    };
    RongIMClient.InformationNotificationMessage.obtain = function (content) {
        return new RongIMClient.InformationNotificationMessage({
            content: content,
            extra: ""
        })
    };
    io.util._extends(RongIMClient.InformationNotificationMessage, RongIMClient.NotificationMessage);
    // 命令消息
    RongIMClient.CommandMessage = function (c) {
        RongIMClient.RongIMMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.CommandMessage);
        this.setObjectName("RC:CmdMsg");
        this.setCount(0);
        this.setPersist(0);
        this.getMessageTag = function () {
            return ['NONE'];
        };
        this.getData = function () {
            return this.getDetail().data;
        };
        this.setData = function (o) {
            this.setContent(o, "data");
        };
        this.getName = function () {
            return this.getDetail().name;
        };
        this.setName = function (o) {
            this.setContent(o, 'name');
        };
    };
    RongIMClient.CommandMessage.obtain = function (x, data) {
        return new RongIMClient.CommandMessage({
            name: x,
            data: data,
            extra: ""
        });
    };
    io.util._extends(RongIMClient.CommandMessage, RongIMClient.RongIMMessage);
    //加删好友消息
    RongIMClient.ContactNotificationMessage = function (c) {
        RongIMClient.NotificationMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.ContactNotificationMessage);
        this.setObjectName("RC:ContactNtf");
        this.getOperation = function () {
            return this.getDetail().operation;
        };
        this.setOperation = function (o) {
            this.setContent(o, 'operation');
        };
        this.setMessage = function (m) {
            this.setContent(m, 'message');
        };
        this.getMessage = function () {
            return this.getDetail().message;
        };
        this.getSourceUserId = function () {
            return this.getDetail().sourceUserId;
        };
        this.setSourceUserId = function (m) {
            this.setContent(m, 'sourceUserId');
        };
        this.getTargetUserId = function () {
            return this.getDetail().targetUserId;
        };
        this.setTargetUserId = function (m) {
            this.setContent(m, 'targetUserId');
        };
    };
    RongIMClient.ContactNotificationMessage.obtain = function (operation, sourceUserId, targetUserId, message) {
        return new RongIMClient.ContactNotificationMessage({
            operation: operation,
            sourceUserId: sourceUserId,
            targetUserId: targetUserId,
            message: message,
            extra: ""
        });
    };
    //允许加好友
    RongIMClient.ContactNotificationMessage.CONTACT_OPERATION_ACCEPT_RESPONSE = 'ContactOperationAcceptResponse';
    //拒绝加好友
    RongIMClient.ContactNotificationMessage.CONTACT_OPERATION_REJECT_RESPONSE = 'ContactOperationRejectResponse';
    //发起加好友请求
    RongIMClient.ContactNotificationMessage.CONTACT_OPERATION_REQUEST = 'ContactOperationRequest';
    io.util._extends(RongIMClient.ContactNotificationMessage, RongIMClient.NotificationMessage);
    //个人信息通知消息
    RongIMClient.ProfileNotificationMessage = function (c) {
        RongIMClient.NotificationMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.ProfileNotificationMessage);
        this.setObjectName("RC:ProfileNtf");
        this.getOperation = function () {
            return this.getDetail().operation;
        };
        this.setOperation = function (o) {
            this.setContent(o, 'operation');
        };
        this.getData = function () {
            return this.getDetail().data;
        };
        this.setData = function (o) {
            this.setContent(o, 'data');
        };
    };
    RongIMClient.ProfileNotificationMessage.obtain = function (operation, data) {
        return new RongIMClient.ProfileNotificationMessage({
            operation: operation,
            data: data,
            extra: ""
        });
    };
    io.util._extends(RongIMClient.ProfileNotificationMessage, RongIMClient.NotificationMessage);
    //命令通知消息
    RongIMClient.CommandNotificationMessage = function (c) {
        RongIMClient.NotificationMessage.call(this, c);
        this.setMessageType(RongIMClient.MessageType.CommandNotificationMessage);
        this.setObjectName("RC:CmdNtf");
        this.getData = function () {
            return this.getDetail().data;
        };
        this.setData = function (o) {
            this.setContent(o, "data");
        };
        this.getName = function () {
            return this.getDetail().name;
        };
        this.setName = function (o) {
            this.setContent(o, 'name');
        };
    };
    RongIMClient.CommandNotificationMessage.obtain = function (x, data) {
        return new RongIMClient.CommandNotificationMessage({
            name: x,
            data: data,
            extra: ""
        });
    };
    io.util._extends(RongIMClient.CommandNotificationMessage, RongIMClient.NotificationMessage);
    //把具体的消息类型转化为protobuf格式的类
    RongIMClient.MessageContent = function (f) {
        if (!(f instanceof RongIMClient.RongIMMessage)) {
            throw new Error("wrong parameter")
        }
        this.getMessage = function () {
            return f
        };
        this.encode = function () {
            var c = new Modules.UpStreamMessage();
            c.setSessionId(f.getPersist() | f.getCount());
            c.setClassname(f.getObjectName());
            c.setContent(JSON.stringify(f.getDetail()));
            c.setPushText(f.getPushContent());
            var val = c.toArrayBuffer();
            if (Object.prototype.toString.call(val) == "[object ArrayBuffer]") {
                return [].slice.call(new Int8Array(val))
            }
            return val
        }
    };
    //发送中处理消息的类，sendMessage方法的第三个参数就是这个对象
    RongIMClient.MessageHandler = function (a) {
        if (typeof a == "function") {
            this.process = a;
        } else {
            throw new Error("MessageHandler:arguments type is error")
        }
    };
    //接收状态
    RongIMClient.ReceivedStatus = function (d) {
        var a = d || 1;
        this.getFlag = function () {
            return a
        };
        this.isDownload = function () {
            return a == 1
        };
        this.isListened = function () {
            return a == 2
        };
        this.isRead = function () {
            return a == 3
        };
        this.setDownload = function () {
            a = 1
        };
        this.setListened = function () {
            a = 2
        };
        this.setRead = function () {
            a = 3
        };
    };
    //用户信息
    RongIMClient.UserInfo = function (h, l, a) {
        var k = h,
            j = l,
            i = a;
        this.getUserName = function () {
            return j
        };
        this.getPortraitUri = function () {
            return i
        };
        this.getUserId = function () {
            return k
        };
        this.setUserName = function (c) {
            j = c
        };
        this.setPortraitUri = function (c) {
            i = c
        };
        this.setUserId = function (c) {
            k = c
        }
    };
    //会话信息
    RongIMClient.Conversation = function () {
        var s = this,
            a = (new Date).getTime(),
            D, v, B, w, E, G, t, F, y, C, A, H, x, u = 0, por,
            z = RongIMClient.ConversationNotificationStatus.NOTIFY;
        this.getConversationTitle = function () {
            return G
        };
        this.toJSONString = function () {
            var c = {
                "senderUserName": E,
                lastTime: a,
                "objectName": D,
                "senderUserId": v,
                "receivedTime": B,
                "conversationTitle": G,
                "conversationType": t,
                "latestMessageId": C,
                "sentTime": H,
                "targetId": x,
                "notificationStatus": z
            };
            return JSON.stringify(c)
        };
        this.setReceivedStatus = function (c) {
            w = c
        };
        this.getReceivedStatus = function () {
            return w
        };
        this.getConversationType = function () {
            return t
        };
        this.getDraft = function () {
            return F
        };
        this.getLatestMessage = function () {
            return y
        };
        this.getLatestMessageId = function () {
            return C
        };
        this.getNotificationStatus = function () {
            return z
        };
        this.getObjectName = function () {
            return D
        };
        this.getReceivedTime = function () {
            return B
        };
        this.getSenderUserId = function () {
            return v
        };
        this.getSentStatus = function () {
            return A
        };
        this.getSentTime = function () {
            return H
        };
        this.getTargetId = function () {
            return x
        };
        this.getUnreadMessageCount = function () {
            return u
        };
        this.isTop = function () {
            var e = RongIMClient.getInstance().getConversationList();
            return e[0] != undefined && e[0].getTargetId() == this.getTargetId() && e[0].getConversationType() == this.getConversationType();
        };
        this.setConversationTitle = function (c) {
            G = c
        };
        this.getConversationPortrait = function () {
            return por;
        };
        this.setConversationPortrait = function (p) {
            por = p;
        };
        this.setConversationType = function (c) {
            t = c
        };
        this.setDraft = function (c) {
            F = c
        };
        this.setSenderUserName = function (c) {
            E = c
        };
        this.setLatestMessage = function (c) {
            y = c
        };
        this.setLatestMessageId = function (c) {
            C = c
        };
        this.setNotificationStatus = function (c) {
            z = c instanceof RongIMClient.ConversationNotificationStatus ? c : RongIMClient.ConversationNotificationStatus.setValue(c);
        };
        this.setObjectName = function (c) {
            D = c
        };
        this.setReceivedTime = function (c) {
            a = B = c
        };
        this.setSenderUserId = function (c) {
            v = c
        };
        this.getLatestTime = function () {
            return a
        };
        this.setSentStatus = function (c) {
            return !!(A = c)
        };
        this.setSentTime = function (c) {
            a = H = c
        };
        this.setTargetId = function (c) {
            x = c
        };
        this.setTop = function () {
            if (s.getTargetId() == undefined || this.isTop()) {
                return
            }
            RongIMClient.getInstance().getConversationList().add(this);
        };
        this.setUnreadMessageCount = function (c) {
            u = c
        }
    };
    //讨论组信息
    RongIMClient.Discussion = function (m, l, a, q, p) {
        var s = m,
            t = l,
            r = a,
            o = q,
            n = p;
        this.getCreatorId = function () {
            return r
        };
        this.getId = function () {
            return s
        };
        this.getMemberIdList = function () {
            return n
        };
        this.getName = function () {
            return t
        };
        this.isOpen = function () {
            return o
        };
        this.setCreatorId = function (c) {
            r = c
        };
        this.setId = function (c) {
            s = c
        };
        this.setMemberIdList = function (c) {
            n = c
        };
        this.setName = function (c) {
            t = c
        };
        this.setOpen = function (c) {
            o = !!c
        }
    };
    //群信息
    RongIMClient.Group = function (j, l, a) {
        var h = j,
            k = l,
            i = a;
        this.getId = function () {
            return h
        };
        this.getName = function () {
            return k
        };
        this.getPortraitUri = function () {
            return i
        };
        this.setId = function (c) {
            h = c
        };
        this.setName = function (c) {
            k = c
        };
        this.setPortraitUri = function (c) {
            i = c
        }
    };
//create enum object 枚举对象，详情可参考API文档
    var _enum = {
        'MessageTag': {
            'ISPERSISTED': 'ISPERSISTED',
            'ISCOUNTED': 'ISCOUNTED',
            'NONE': 'NONE',
            'ISDISPLAYED': "ISDISPLAYED"
        },
        'ConversationNotificationStatus': ['DO_NOT_DISTURB', 'NOTIFY'],
        'ConversationType': ['CHATROOM', 'CUSTOMER_SERVICE', 'DISCUSSION', 'GROUP', 'PRIVATE', 'SYSTEM', '', 'APP_PUBLIC_SERVICE'],
        'SentStatus': ['DESTROYED', 'FAILED', 'READ', 'RECEIVED', 'SENDING', 'SENT'],
        'DiscussionInviteStatus': ['CLOSED', 'OPENED'],
        'MediaType': ['AUDIO', 'FILE', 'IMAGE', 'VIDEO'],
        'MessageDirection': ['RECEIVE', 'SEND'],
        'MessageType': ['DiscussionNotificationMessage', 'TextMessage', 'ImageMessage', 'VoiceMessage', 'RichContentMessage', 'HandshakeMessage', 'UnknownMessage', 'SuspendMessage', 'LocationMessage', 'InformationNotificationMessage', 'ContactNotificationMessage', 'ProfileNotificationMessage', 'CommandNotificationMessage', 'CommandMessage'],
        'SendErrorStatus': {
            'REJECTED_BY_BLACKLIST': 405,
            'NOT_IN_DISCUSSION': 21406,
            'NOT_IN_GROUP': 22406,
            'NOT_IN_CHATROOM': 23406
        },
        'BlacklistStatus': ['EXIT_BLACK_LIST', 'NOT_EXIT_BLACK_LIST'],
        'ConnectionStatus': ['CONNECTED', 'CONNECTING', 'RECONNECT', 'OTHER_DEVICE_LOGIN', 'CLOSURE', 'UNKNOWN_ERROR', 'LOGOUT', 'BLOCK']
    };
    //生产枚举对象
    io.util.each(_enum, function (_name, option) {
        var val = {};
        if (io.util.isArray(option)) {
            io.util.forEach(option, function (x, i) {
                val[x] = i;
            })
        } else {
            val = option;
        }
        RongIMClient[_name] = RongIMEnum(val);
    });
    RongIMClient.ConnectErrorStatus = ConnectionState;
    //回调基类
    RongIMClient.callback = function (d, a) {
        this.onError = a;
        this.onSuccess = d
    };
    //回调错误枚举值
    RongIMClient.callback.ErrorCode = RongIMEnum({
        TIMEOUT: -1,
        UNKNOWN_ERROR: -2
    });
    //兼容AMD CMD
    if ("function" === typeof require && "object" === typeof module && module && module.id && "object" === typeof exports && exports) {
        module.exports = RongIMClient
    } else if ("function" === typeof define && define.amd) {
        define('RongIMClient', [], function () {
            return RongIMClient;
        });
        define(function () {
            return RongIMClient;
        });
    } else {
        global.RongIMClient = RongIMClient;
    }
})
(window);
