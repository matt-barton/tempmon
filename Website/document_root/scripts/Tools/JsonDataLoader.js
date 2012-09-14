
jsonDataLoader = {
    /*
    * post the specified data  
    * N.B. Parameters is a an object containing the data required to be sent.
    * e.g. var parameters = {
    *   MyArgument1Name = "anArgument",
    *   MyArgument2Name = myObject
    * }
    */
    post: function (url, method, parameters, successCallback, errorCallback) {
        var jsonData = JSON2.stringify(parameters);

        return baseDataLoader.post("json", jsonData, "text/plain; charset=utf-8", url,
      function (response) {
          successCallback(response);
      },
      function (response) {
          var jsonFault = JSON2.parse(response.responseText);
          if (jsonFault.FaultType !== undefined) {
              if (jsonFault.FaultType === "SessionExpiredFault") {
                  browser.HTTP.navigateTo("Security/SessionExpired");
              }
              else {
                  errorCallback(jsonFault);
              }
          }
          else {
              //not a jsonFault DataContract returned
              errorCallback(response.responseText);
          }
      }
    );
    },
    abort: function (request) {
        baseDataLoader.abort(request);
    }
}

baseDataLoader = {
    post: function (dataType, data, contentType, url, successCallback, errorCallBack) {
        return browser.HTTP.post(
      dataType, data, contentType, url, successCallback, errorCallBack
    );
    },
    abort: function (request) {
        browser.HTTP.abort(request);
    }
}