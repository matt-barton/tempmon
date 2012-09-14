/*
* Namespace for HTTP interaction with the browser
*/
browser = {};

browser.HTTP = {
    post: function (dataType, data, contentType, url, successCallback, errorCallBack) {
        return jQuery.ajax({
            type: "POST",
            dataType: dataType,
            data: data,
            contentType: contentType,
            url: url,
            success: successCallback,
            error: errorCallBack
        });
    },
    navigateTo: function (address, parameters) {
        if (parameters) {
            var isFirst = true;
            jQuery.each(parameters, function (key, value) {
                if (isFirst) {
                    address += "?" + key + "=" + jQuery.URLEncode(value);
                    isFirst = false;
                }
                else {
                    address += "&" + key + "=" + jQuery.URLEncode(value);
                }
            });
        }
        window.location = address;
    },
    abort: function (request) {
        request.abort();
    }
};