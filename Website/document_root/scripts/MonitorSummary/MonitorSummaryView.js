function MonitorSummaryView (context) {

    var contentArea = $('#contentArea', context);
    var monitorsArea = $('#monitorsArea', context);
    var notificationArea = $('#notificationArea', context);

    var monitorHistoryCallback;
    var monitorDetailsCallback;
    var renameMonitorCallback;

    /* Public Methods */
    function init() {
        $('html').click(hidePopupMenus);
        compileTemplates();
    }

    function clear(callback) {
        clearArea(monitorsArea, function() {
            clearArea(notificationArea, callback);
        });
    }


    function blockPage() {
        context.block();
    }

    function unblockPage() {
        context.unblock();
    }

    function displayError(error) {
        alert(error);
    }

    function displayUnidentifiedMonitorWarning() {
        $.tmpl('unidentifiedMonitorTemplate', {})
            .find('a#unidentifiedMonitorLink')
                .click(redirectToMonitorIdentification)
                .end()
            .hide()
            .appendTo(notificationArea)
            .show('slow');
    }

    function displayMonitor(monitor) {

        // create a popup menu for this monitor
        var popupMenu = createPopupMenu(monitor);

        // construct monitor markup from template
        $.tmpl('monitorTemplate', monitor)
            .find('.menuImage')
                // insert the popup menu into the monitor's markup
                .after(popupMenu)
                // assign a click event to display the popup menu
                .click(displayPopupMenu)
                .end()
            .hover(
                // display the menu image on mouseover
                function () {
                    $(this)
                        .find('.menuImage')
                        .show('300');
                },
                // hide the menu image and any open menus on mouseout
                function () {
                    $(this)
                        .find('.menuImage')
                        .hide();
                    hidePopupMenus();
                })
            // finally insert the monitor markup into the dom
            .appendTo(monitorsArea);
    }

    function displayMonitorRenameControls(monitorId) {
        var monitorDetailsArea = $('#monitorDetailsArea_' + monitorId, context);
        monitorDetailsArea.empty();

        var data = {
            Id: monitorId
        };

        var template = $.tmpl('renameMonitorTemplate', data)
            .hide()
            .appendTo(monitorDetailsArea);

        var nameField = $('#newMonitorName_' + monitorId, monitorDetailsArea);

        function doRename() {
            renameMonitorCallback(monitorId, nameField.val());
        }

        function renameCancel() {
            clearArea(monitorDetailsArea);
        }

        $('#renameSubmitButton_' + monitorId, monitorDetailsArea)
            .click(doRename);

        $('#renameCancelButton_' + monitorId, monitorDetailsArea)
            .click(renameCancel);

        $('#renameForm_' + monitorId, monitorDetailsArea)
            .submit(doRename)
            .keyup(function (e) {
                if (e.keyCode == '27') { // esc key
                    renameCancel();
                }
            });

        template.show('quick');
        $('#newMonitorName_' + monitorId, monitorDetailsArea)
            .focus();
    }

    function displayMonitorDetails(model) {
        var monitorDetailsArea = $('#monitorDetailsArea_' + model.MonitorId, context);
        monitorDetailsArea.empty();

        var data = {
            Id: model.MonitorId,
            IdentificationType: model.Identification.IdentityType,
            IdentificationData: model.Identification.Identity,
            FirstReading: model.FirstMeasurement.Time,
            LastReading: model.LastMeasurement.Time
        };

        var template = $.tmpl('monitorDetailsTemplate', data)
            .hide()
            .appendTo(monitorDetailsArea);

        function closeDetails() {
            $('#monitorDetails_' + model.MonitorId).hide('quick');
        }

        $('#closeDetailsButton_' + model.MonitorId)
            .click(closeDetails);

        template.show('quick');
    }

    function displayMonitorHistory(model) {
        var monitorDetailsArea = $('#monitorDetailsArea_' + model.MonitorId, context);
        monitorDetailsArea.empty();

        var data = {
            Id: model.MonitorId
        };

        var template = $.tmpl('monitorHistoryTemplate', data)
            .appendTo(monitorDetailsArea);

        setupGraphLinks($('.graphTypeLink', template), model.Range, model.MonitorId);

        var graphPoints = GraphHelper.GetGraphPoints(model.Measurements);

        function closeDetails() {
            $('#monitorHistory_' + model.MonitorId).hide('quick');
        }

        $('#closeHistoryButton_' + model.MonitorId)
            .click(closeDetails);

        $.jqplot('graph_' + model.MonitorId, graphPoints, {
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                    rendererOptions: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer
                    },
                    tickOptions: {
                        angle: -90,
                        fontSize: '10pt'
                    }
                },
                yaxis:{
                    rendererOptions: {
                        tickRenderer:$.jqplot.CanvasAxisTickRenderer
                    },
                    tickOptions: {
                        fontSize:'10pt', 
                        fontFamily:'Tahoma'
                    }
                }
            }
        });

        template.show('quick');
    }

    function setupGraphLinks (links, currentRange, monitorId) {

        var ranges = ['1d', '1w', '1m'];

        $.each(links, function(index, link) {
            $.each(ranges, function(idx, range) {
                if ($(link).hasClass(range)) {
                    $(link).data('range', range);
                    if (currentRange == range) {
                        $(link)
                            .addClass('selected')
                            .data('selected', true);
                    }
                }
            });
        });

        $(links).click(function() {
            if (!$(this).data('selected')) {
                monitorHistoryCallback(monitorId, $(this).data('range'));
            }
        });
    }

    function setMonitorHistoryCallback(callback) {
        monitorHistoryCallback = callback;
    }

    function setMonitorDetailsCallback(callback) {
        monitorDetailsCallback = callback;
    }

    function setRenameMonitorCallback(callback) {
        renameMonitorCallback = callback;
    }

    function redirectToMonitorIdentification() {
        window.location.href = 'identify_monitors.php';
    }

    /* Private Methods */
    function compileTemplates() {
        $.template('monitorTemplate', $('#monitorTemplate', context));
        $.template('monitorMenuTemplate', $('#monitorMenuTemplate', context));
        $.template('unidentifiedMonitorMenuTemplate', $('#unidentifiedMonitorMenuTemplate', context));
        $.template('unidentifiedMonitorTemplate', $('#unidentifiedMonitorTemplate', context));
        $.template('renameMonitorTemplate', $('#renameMonitorTemplate', context));
        $.template('monitorDetailsTemplate', $('#monitorDetailsTemplate', context));
        $.template('monitorHistoryTemplate', $('#monitorHistoryTemplate', context));
    }

    function clearArea(area, onClearCompleteCallback) {
        area.hide('blind', {}, 'fast', function () {
            area.empty()
                .show();
            if (onClearCompleteCallback) {
                onClearCompleteCallback();
            }
        });
    }

    function createPopupMenu(monitor) {

        var templateName = 'monitorMenuTemplate';
        if (monitor.Unidentified) {
            templateName = 'unidentifiedMonitorMenuTemplate';
        }

        var popupMenu = $.tmpl(templateName, { id: monitor.MonitorId });

        // change css classes to the first and last menu items
        var menuItems = $('li', popupMenu);
        menuItems
            .each(function (idx, item) {
                if (idx == 0) {
                    $(item).addClass('menuItemTop');
                }
                else if (idx == (menuItems.length - 1)) {
                    $(item).addClass('menuItemBottom');
                }
                else {
                    $(item).addClass('menuItem');
                }
            });

        // assign click events to menu items
        $('a#history' + monitor.MonitorId, popupMenu)
            .click(function () {
                monitorHistoryCallback(monitor.MonitorId);
            });

        $('a#details' + monitor.MonitorId, popupMenu)
            .click(function () {
                monitorDetailsCallback(monitor.MonitorId);
            });

        $('a#rename' + monitor.MonitorId, popupMenu)
            .click(function () {
                displayMonitorRenameControls(monitor.MonitorId);
            });

        $('a#identify' + monitor.MonitorId, popupMenu)
            .click(function () {
                redirectToMonitorIdentification();
            });

        return popupMenu;
    }

    function hidePopupMenus() {
        $('ul.popupMenu', context).hide();
    }

    function displayPopupMenu(evt) {

        // stop the hidePopupMenus event propagating
        evt.stopPropagation();

        // position and display the menu
        var img = $(this).parent().find('img')
        var imgPos = img.position();

        var popup = $(this)
            .parent()
            .find('ul');

        popup
            .css({
                top: imgPos.top + 'px',
                left: (imgPos.left - popup.outerWidth() - img.outerWidth()) + 'px'
            })
            .slideToggle('fast');
    }

    return {
        init: init,
        clear: clear,
        blockPage: blockPage,
        unblockPage: unblockPage,
        displayUnidentifiedMonitorWarning: displayUnidentifiedMonitorWarning,
        displayMonitor: displayMonitor,
        displayError: displayError,
        setMonitorHistoryCallback: setMonitorHistoryCallback,
        setMonitorDetailsCallback: setMonitorDetailsCallback,
        setRenameMonitorCallback: setRenameMonitorCallback,
        redirectToMonitorIdentification: redirectToMonitorIdentification,
        displayMonitorRenameControls: displayMonitorRenameControls,
        displayMonitorDetails: displayMonitorDetails,
        displayMonitorHistory: displayMonitorHistory
    };
};