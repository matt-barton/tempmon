function ToolbarView(context) {

    var toolbarButtons = $('#toolbar .button', context);
    var toolbarRefreshButton = $('#toolbarRefresh', context);
    var toolbarBackButton = $('#toolbarBack', context);

    /* Public Methods */
    function setToolbarActions(actions) {
        toolbarButtons
            .off('click')
            .hide();

        if (actions.refresh) {
            toolbarRefreshButton
                .show()
                .click(actions.refresh);
        }

        if (actions.back) {
            toolbarBackButton
                .show()
                .click(actions.back)
        }
    }

    return {
        setToolbarActions: setToolbarActions
    }
}