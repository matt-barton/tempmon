function IdentifyMonitorsController(dataLoader, view, displayController, toolbarView) {

    /* Public Methods */
    function init() {
        view.init();
        view.setCreateNewMonitorCallback(onCreateNewMonitor);
        view.setUpdateExistingMonitorCallback(onUpdateExistingMonitor);
        view.block();
        dataLoader.getUnidentifiedMonitors(
            displayUnidentifiedMonitors,
            displayError);
    }

    /* Private Methods */
    function displayUnidentifiedMonitors(model) {
        view.displayUnidentifiedMonitors(model);
        toolbarView.setToolbarActions({
            refresh: refresh,
            back: view.redirectToSummary
        });
    }

    function refresh() {
        view.block();
        view.clear();
        dataLoader.getUnidentifiedMonitors(
            view.displayUnidentifiedMonitors,
            displayError);
    }

    function onCreateNewMonitor(monitorId, location) {
        view.block();
        dataLoader.identifyMonitor(
            monitorId,
            location,
            refresh,
            displayError);
    }

    function onUpdateExistingMonitor(unidentifiedMonitor, existingMonitor) {
        view.block();
        dataLoader.updateMonitorWithUnidentifiedData(
            existingMonitor,
            unidentifiedMonitor,
            refresh,
            displayError);
    }

    function displayError(error) {
        // TODO: handle errors elegantly
        alert(error);
    }

    return {
        init: init
    };
}