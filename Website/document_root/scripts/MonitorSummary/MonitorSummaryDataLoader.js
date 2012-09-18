function MonitorSummaryDataLoader () {

    var servicePath = "/WebServices/MonitorWebService.php";

    function getMonitorSummary(successCallback, errorCallback) {

        var serviceMethod = "GetSummary";

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            {},
            successCallback,
            errorCallback
        );
    }

    function getMonitorHistory(monitorId, successCallback, errorCallback) {

        var serviceMethod = "GetHistory";

        if (monitorId != null) {
            serviceMethod += "?MonitorId=" + monitorId;
        }

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            {},
            successCallback,
            errorCallback
        );
    }

    function getMonitorDetails(monitorId, successCallback, errorCallback) {

        var serviceMethod = "GetSummary";

        if (monitorId != null) {
            serviceMethod += "?MonitorId=" + monitorId;
        }

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            {},
            successCallback,
            errorCallback
        );
    }

    function createApi() {
    return {
        getMonitorSummary: getMonitorSummary,
        getMonitorHistory: getMonitorHistory,
        getMonitorDetails: getMonitorDetails
    };
}

return createApi();
};