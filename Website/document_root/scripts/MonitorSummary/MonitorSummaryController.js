function MonitorSummaryController (dataLoader, view, displayController, toolbarView) {

    /* Public Methods */
    function init() {
        view.blockPage();
        view.init();
        view.compileTemplates();
        view.setMonitorHistoryCallback(onMonitorHistory);
        view.setMonitorDetailsCallback(onMonitorDetails);
        view.setRenameMonitorCallback(onRenameMonitor);
        view.setIdentifyMonitorCallback(onIdentifyMonitor);
        dataLoader.getMonitorSummary(displayMonitorSummary,
            displayMonitorSummary,
            displayError);
    }

    /* Private Methods */
    function onMonitorHistory(monitorId) {
        alert('History ' + monitorId);
    }

    function onMonitorDetails(monitorId) {
        alert('Details ' + monitorId);

    }

    function onRenameMonitor(monitorId) {
        alert('Rename ' + monitorId);
    }

    function onIdentifyMonitor(monitorId) {
        view.redirectToMonitorIdentification();
    }

    function refresh() {
        view.blockPage();
        view.clear();
        dataLoader.getMonitorSummary(displayMonitorSummary,
            displayMonitorSummary,
            displayError);
    }

    function displayMonitorSummary(model) {
        if (model.UnidentifiedMonitor) {
            view.displayUnidentifiedMonitorWarning();
        }
        $.each(model.Monitors, function (index, monitor) {
            setDisplayProperties(monitor);
            view.displayMonitor(monitor);
        });
        toolbarView.setToolbarActions({
            refresh: refresh
        });
        view.unblockPage();
    }

    function setDisplayProperties(monitor) {
        monitor.Unidentified = false;
        if (monitor.Location == null || monitor.Location.length == 0) {
            monitor.Location = '???';
            monitor.Unidentified = true;
        }

        if (monitor.Measurements.length == 1) {
            setDisplayPropertiesFromMeasurement(monitor, monitor.Measurements[0]);
        }
        else {
            // TODO: determine most recent measurement
            alert('TODO: determine most recent measurement');
        }
    }

    function setDisplayPropertiesFromMeasurement(monitor, measurement) {
        // TODO: allow user to choose between Celsius and Farenheit
        if (true) {
            monitor.Temperature = measurement.Celsius;
            monitor.Scale = 'C';
            monitor.Style = displayController
                .getTemperatureColour(measurement.Celsius, 'C');
        }
        else {
            monitor.Temperature = measurement.Farenheit;
            monitor.Scale = 'F';
            monitor.Style = displayController
                .getTemperatureColour(measurement.Farenheit, 'F');
        }
    }

    function displayError (error) {
        view.displayError(error);
    }

    return {
        init: init
    };
};