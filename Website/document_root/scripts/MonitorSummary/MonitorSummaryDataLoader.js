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

    function getMonitorHistory(monitorId, range, successCallback, errorCallback) {

        var serviceMethod = "GetHistory";

        var parameters = {
            MonitorId: monitorId,
            Range: range
        };

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            parameters,
            successCallback,
            errorCallback
        );
    }

    function getMonitorDetails(monitorId, successCallback, errorCallback) {

        var serviceMethod = "GetMonitorDetails";

        var parameters = {
            MonitorId: monitorId
        };

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            parameters,
            successCallback,
            errorCallback
        );
    }

    function renameMonitor(monitorId, name, successCallback, errorCallback) {
        var serviceMethod = "RenameMonitor";

        var parameters = {
            MonitorId: monitorId,
            Name: name
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
            getMonitorSummary: getMonitorSummary,
            getMonitorHistory: getMonitorHistory,
            getMonitorDetails: getMonitorDetails,
            renameMonitor: renameMonitor
        };
    }

    return createApi();
};