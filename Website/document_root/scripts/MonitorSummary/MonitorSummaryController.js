function MonitorSummaryController (dataLoader, view) {

    /* Public Methods */
    function init() {
        dataLoader.getMonitorSummary(displayMonitorSummary,
            displayMonitorSummary,
            displayError);
    }

    /* Private Methods */
    function displayMonitorSummary(model) {
        if (model.UnidentifiedMonitor) {
            view.displayUnidentifiedMonitorWarning();
        }
        $.each(model.Monitors, function (index, monitor) {
            view.displayMonitor(monitor);
        });
    }

    function displayError (error) {
        view.displayError(error);
    }

    return {
        init: init
    };
};