function MonitorSummaryDataLoader () {

    var servicePath = "/WebServices/MonitorWebService.php";

    function getMonitorSummary(successCallback, errorCallback) {

        var serviceMethod = "GetSummary";

        var parameters = {
        };

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            parameters,
            successCallback,
            errorCallback
        );
    }

function createApi() {
    return {
        getMonitorSummary: getMonitorSummary
    };
}

return createApi();
};