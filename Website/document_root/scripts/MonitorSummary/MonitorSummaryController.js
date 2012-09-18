function MonitorSummaryController (dataLoader, view, displayController) {

    /* Public Methods */
    function init() {
        view.blockPage();
        view.init();
        view.compileTemplates();
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
            setDisplayProperties(monitor);
            view.displayMonitor(monitor);
        });
        view.unblockPage();
    }

    function setDisplayProperties(monitor) {
        if (monitor.Location.length == 0) {
            monitor.Location = '???';
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