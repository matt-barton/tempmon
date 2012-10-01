function IdentifyMonitorsDataLoader() {

    var servicePath = "/WebServices/MonitorWebService.php";

    function getUnidentifiedMonitors(successCallback, errorCallback) {

        var serviceMethod = "GetUnidentifiedMonitors";

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            {},
            successCallback,
            errorCallback
        );
    }

    function identifyMonitor(monitorId, location, successCallback, errorCallback)
    {
        var serviceMethod = "IdentifyMonitor";

        var parameters = {
            MonitorId: monitorId,
            Location: location
        };

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            parameters,
            successCallback,
            errorCallback
        );
    }

    function updateMonitorWithUnidentifiedData(existingMonitorId, unidentifiedMonitorId,
        successCallback, errorCallback)
    {
        var serviceMethod = "UpdateMonitorWithUnidentifiedData";

        var parameters = {
            ExistingMonitorId: existingMonitorId,
            UnidentifiedMonitorId: unidentifiedMonitorId
        };

        jsonDataLoader.post(
            servicePath + "/" + serviceMethod,
            serviceMethod,
            parameters,
            successCallback,
            errorCallback
        );
    }

    return {
        getUnidentifiedMonitors: getUnidentifiedMonitors,
        identifyMonitor: identifyMonitor,
        updateMonitorWithUnidentifiedData: updateMonitorWithUnidentifiedData
    };
}