function MonitorSummaryView (context) {

    function init() {

    }

    function displayError(error) {
        alert(error);
    }

    function displayMonitor(monitor) {
        // get html template
        // display in monitor placeholder
    }

    function displayUnidentifiedMonitorWarning() {
        // get html template
        // display
    }

    return {
        init: init,    
        displayUnidentifiedMonitorWarning: displayUnidentifiedMonitorWarning,
        displayMonitor: displayMonitor,
        displayError: displayError
    };
};