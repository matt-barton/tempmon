function IdentifyMonitorsView(context) {

    var unidentifiedMonitorsArea = $('#unidentifiedMonitorsArea', context);
    var createNewMonitorCallback;
    var updateExistingMonitorCallback;

    /* Public Methods */
    function init() {
        compileTemplates();
    }

    function clear() {
        unidentifiedMonitorsArea.hide('blind', {}, 'fast', function () {
            unidentifiedMonitorsArea
                .empty()
                .show();
        });
    }

    function block() {
        context.block();
    }

    function unblock() {
        context.unblock();
    }

    function redirectToSummary() {
        window.location.href = 'index.php';
    }

    function displayUnidentifiedMonitors(model) {
        if (model.UnidentifiedMonitors.length < 1) {
            $.tmpl('noUnidentifiedMonitorsTemplate', {})
                .hide()
                .appendTo(unidentifiedMonitorsArea)
                .show('quick')
                .find($('div').click(redirectToSummary));
        }
        else {
            $.each(model.UnidentifiedMonitors, function (idx, monitor) {
                var id = monitor.MonitorId;
                var data = {
                    Id: id,
                    Count: idx + 1,
                    Style: idx % 2 == 1 ? 'odd' : 'even',
                    FirstActivity: $.format.date(monitor.FirstActivity.Time, 'dd MMM yyyy, HH:mm:ss'),
                    LastActivity: $.format.date(monitor.LastActivity.Time, 'dd MMM yyyy, HH:mm:ss')
                }
                $.tmpl('unidentifiedMonitorTemplate', data)
                    .hide()
                    .appendTo(unidentifiedMonitorsArea)
                    .find('#newMonitorButton_' + id)
                        .button()
                        .click(function () {
                            showNewMonitorArea(monitor.MonitorId);
                        })
                        .end()
                    .find('#existingMonitorButton_' + id)
                        .button()
                        .click(function () {
                            showExistingMonitorArea(monitor.MonitorId, model.IdentifiedMonitors);
                        })
                        .end()
                    .find('#submitButton_' + id)
                        .button()
                        .end()
                    .find('#cancelButton_' + id)
                        .button()
                        .click(function () {
                            hideSubmitArea(monitor.MonitorId);
                        })
                        .end()
                    .show('quick');
            });
        }
        unblock();
    }

    function setCreateNewMonitorCallback(callback) {
        createNewMonitorCallback = callback;
    }
    
    function setUpdateExistingMonitorCallback(callback) {
        updateExistingMonitorCallback = callback;
    }

    /* Private Methods */
    function showNewMonitorArea(monitorId) {
        $('#buttonArea_' + monitorId, context).hide('fast');
        $('#newMonitorArea_' + monitorId, context).show('fast');
        $('#submitArea_' + monitorId, context).show('fast');
        $('#submitButton_' + monitorId)
            .off('click')
            .click(function () {
            createNewMonitorCallback(
                monitorId,
                $('#newMonitorLocation_' + monitorId, context).val());
        });
    }

    function showExistingMonitorArea(monitorId, existingMonitors) {
        var select = $('#existingMonitorSelect_' + monitorId, context);
        select.empty()
        $.each(existingMonitors, function (idx, monitor) {
            var value = monitor.Location;
            select.append(
                $('<option>', { value: monitor.MonitorId })
                    .text(value));
        });

        $('#buttonArea_' + monitorId, context).hide('fast');
        $('#existingMonitorArea_' + monitorId, context).show('fast');
        $('#submitArea_' + monitorId, context).show('fast');
        $('#submitButton_' + monitorId)
            .off('click')
            .click(function () {
            updateExistingMonitorCallback(
                monitorId, 
                $('#existingMonitorSelect_' + monitorId).val());
        });
    }

    function hideSubmitArea(monitorId) {
        $('#buttonArea_' + monitorId).show('fast');
        $('#newMonitorArea_' + monitorId).hide('fast');
        $('#existingMonitorArea_' + monitorId).hide('fast');
        $('#submitArea_' + monitorId).hide('fast');
    }

    function compileTemplates() {
        $.template('unidentifiedMonitorTemplate', $('#unidentifiedMonitorTemplate', context));
        $.template('noUnidentifiedMonitorsTemplate', $('#noUnidentifiedMonitorsTemplate', context));
    }

    return {
        init: init,
        clear: clear,
        block: block,
        unblock: unblock,
        redirectToSummary: redirectToSummary,
        displayUnidentifiedMonitors: displayUnidentifiedMonitors,
        setCreateNewMonitorCallback: setCreateNewMonitorCallback,
        setUpdateExistingMonitorCallback: setUpdateExistingMonitorCallback
    };
}