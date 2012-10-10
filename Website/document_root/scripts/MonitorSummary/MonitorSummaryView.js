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

    function clear() {
        clearArea(monitorsArea);
        clearArea(notificationArea);
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
    }

    function clearArea(area) {
        area.hide('blind', {}, 'fast', function () {
            area.empty()
                .show();
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
                alert("View history for " + monitor.MonitorId);
            });

        $('a#details' + monitor.MonitorId, popupMenu)
            .click(function () {
                alert("View details for " + monitor.MonitorId);
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
        displayMonitorRenameControls: displayMonitorRenameControls
    };
};