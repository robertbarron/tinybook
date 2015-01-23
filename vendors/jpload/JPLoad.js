JPLoad = {
    _doRequest : function (url, callback) {
        var _this = this,
            xhr;

        if (typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        } else {
            var versions = [
                "MSXML2.XmlHttp.5.0", 
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0", 
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];
 
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){
                    console.log('Error when trying to initiate an Ajax Call');
                }
             }
        }
         
        xhr.onreadystatechange = safeRead;
         
        function safeRead () {
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }           
        }
        xhr.open('GET', url, true);
        xhr.send('');
    },

    getView : function (templateURL, callback) {
        this._doRequest(templateURL, function (response) {
            if (response)
                callback(response);
        });
    },

    _escapeRegExp: function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },

    _injectData : function (templateData, find, replace) {
        return templateData.replace(new RegExp(this._escapeRegExp(find), 'g'), replace);
    },

    parseElement : function (pObject, htmlData, callback) {
        var _this = this,
            elementsInData = Object.keys(pObject).length,
            counted = 0;
        
        var _waitForIt = function () {
                for (var key in pObject) {
                    htmlData = _this._injectData(htmlData, '{{' + key + '}}', pObject[key]);
                    counted++;
                }
                if (counted >= elementsInData) {
                    callback(htmlData);
                } else {
                    setTimeout(function () {
                        _waitForIt();
                    },20);
                }
            };
        _waitForIt();
    },

    $_parseObject : function (pObject, htmlData, $object, appendFlag, callback) {
        var _this = this,
            elementsInData = Object.keys(pObject).length,
            counted = 0;
        
        var _waitForIt = function () {
                for (var key in pObject) {
                    htmlData = _this._injectData(htmlData, '{{' + key + '}}', pObject[key]);
                    counted++;
                }
                if (counted >= elementsInData) {
                    if (appendFlag) {
                        $object.append(htmlData);
                        callback(true);
                    } else {
                        $object.html(htmlData);
                        callback(true);
                    }
                } else {
                    setTimeout(function () {
                        _waitForIt();
                    },20);
                }
            };
        _waitForIt();
    },

    _parseObject : function (pObject, htmlData, elementID, appendFlag, callback) {
        var _this = this,
            elementsInData = Object.keys(pObject).length,
            counted = 0;

        var _waitForIt = function () {
            for (var key in pObject) {
                htmlData = _this._injectData(htmlData, '{{' + key + '}}', pObject[key]);
                counted++;
            }
            if (counted >= elementsInData) {
                if (appendFlag) {
                    var divHelper = document.createElement('div');
                    divHelper.innerHTML = htmlData;
                    
                    document.getElementById(elementID).appendChild(divHelper.firstChild);
                    callback(true);
                } else {
                    document.getElementById(elementID).innerHTML = htmlData;
                    callback(true);
                }
            } else {
                setTimeout(function () {
                    _waitForIt();
                },20);
            }
        };
        _waitForIt();
    },

    $loadView : function(htmlData, $object, oData, callback) {
        if (oData !== undefined) {
            this.$_parseObject(oData, htmlData, $object, false, function (response) {
                if (response) {
                    if (callback)
                        callback(true);
                }
            });
        } else {
            $object.html(htmlData);
            if (callback)
                callback(true);
        }
    },

    loadView : function (htmlData, elementID, oData, callback) {
        if (oData !== undefined) {
            this._parseObject(oData, htmlData, elementID, false, function (response) {
                if (response) {
                    if (callback)
                        callback(true);
                }
            });
        } else {
            document.getElementById(elementID).innerHTML = htmlData;
            if (callback)
                callback(true);
        }
    },

    $appendView : function (htmlData, $object, oData, callback) {
        if (oData !== undefined) {
            this.$_parseObject(oData, htmlData, $object, true, function (response) {
                if (response) {
                    if (callback)
                        callback(true);
                }
            });
        } else {
            $object.html(htmlData);
            if (callback)
                callback(true);
        }
    },

    appendView : function (htmlData, elementID, oData, callback) {
        if (oData !== undefined) {
            this._parseObject(oData, htmlData, elementID, true, function (response) {
                if (response) {
                    if (callback)
                        callback(true);
                }
            });
        } else {
            var divHelper = document.createElement('div');

            divHelper.innerHTML = htmlData;
            document.getElementById(elementID).appendChild(divHelper.firstChild);
            if (callback)
                callback(true);
        }
    },
};