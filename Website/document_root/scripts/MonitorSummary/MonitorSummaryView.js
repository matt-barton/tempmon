function MonitorSummaryView (context) {

    var monitorsArea = $('#monitorsArea', context);
    var notificationArea = $('#notificationArea', context);

    function init() {
        $('html').click(hidePopupMenus);
    }

    function blockPage() {
        context.block();
    }

    function unblockPage() {
        context.unblock();
    }

    function compileTemplates() {
        $.template('monitorTemplate', $('#monitorTemplate', context));
        $.template('monitorMenuTemplate', $('#monitorMenuTemplate', context));
        $.template('unidentifiedMonitorTemplate', $('#unidentifiedMonitorTemplate', context));
    }

    function displayError(error) {
        alert(error);
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

    function createPopupMenu(monitor) {
        var popupMenu = $.tmpl('monitorMenuTemplate', { id: monitor.MonitorId });

        // change css classes to the first and last menu items
        var menuItems = $('li', popupMenu);
        menuItems
            .each(function (idx, item) {
                if (idx == 0) {
                    $(item)
                        .addClass('menuItemTop')
                        .removeClass('menuItem')
                }

                if (idx == (menuItems.length - 1)) {
                    $(item)
                        .addClass('menuItemBottom')
                        .removeClass('menuItem')
                }
            });

        // assign click events to menu items
        $('a#history' + monitor.MonitorId, popupMenu)
            .click(function () {
                monitorHistory(monitor.MonitorId);
            });

        $('a#details' + monitor.MonitorId, popupMenu)
            .click(function () {
                monitorDetails(monitor.MonitorId);
            });

        $('a#rename' + monitor.MonitorId, popupMenu)
            .click(function () {
                renameMonitor(monitor.MonitorId);
            });

            return popupMenu;
    }

    function monitorHistory(monitorId) {
        // TODO: complete this method
        alert('History for monitor ' + monitorId);
    }

    function monitorDetails(monitorId) {
        // TODO: complete this method
        alert('Details for monitor ' + monitorId);
    }

    function renameMonitor(monitorId) {
        // TODO: complete this method
        alert('Rename monitor ' + monitorId);
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

    function displayUnidentifiedMonitorWarning() {
        $.tmpl('unidentifiedMonitorTemplate', {})
            .hide()
            .appendTo(notificationArea)
            .show('slow');
    }

    return {
        init: init,
        blockPage: blockPage,
        unblockPage: unblockPage,
        compileTemplates: compileTemplates,
        displayUnidentifiedMonitorWarning: displayUnidentifiedMonitorWarning,
        displayMonitor: displayMonitor,
        displayError: displayError
    };
};