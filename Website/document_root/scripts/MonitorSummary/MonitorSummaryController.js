function MonitorSummaryController (dataLoader, view, displayController, toolbarView) {

    /* Public Methods */
    function init() {
        view.blockPage();
        view.init();
        view.setMonitorHistoryCallback(onMonitorHistory);
        view.setMonitorDetailsCallback(onMonitorDetails);
        view.setRenameMonitorCallback(onRenameMonitor);
        toolbarView.setToolbarActions({
            refresh: refresh
        });
        dataLoader.getMonitorSummary(displayMonitorSummary,
            displayMonitorSummary,
            displayError);
    }

    /* Private Methods */
    function onMonitorHistory(monitorId) {
        alert('History ' + monitorId);
    }

    function onMonitorDetails(monitorId) {
        // TODO: have the view block just one monitor, not the whole page
        //view.blockMonitor(monitorId);
        view.blockPage();
        dataLoader.getMonitorDetails(monitorId, displayMonitorDetails, displayError);
    }

    function onRenameMonitor(monitorId, name) {
        view.blockPage();
        dataLoader.renameMonitor(monitorId, name, refresh, displayError);
    }

    function displayMonitorDetails(model) {
        view.displayMonitorDetails(model);
        view.unblockPage();
    }

    function refresh() {
        view.blockPage();
        view.clear(function() {
            dataLoader.getMonitorSummary(displayMonitorSummary,
                displayMonitorSummary,
                displayError);
        });
    }

    function displayMonitorSummary(model) {
        if (model.UnidentifiedMonitor) {
            view.displayUnidentifiedMonitorWarning();
        }
        $.each(model.Monitors, function (index, monitor) {
            setDisplayProperties(monitor);
            view.displayMonitor(monitor);
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