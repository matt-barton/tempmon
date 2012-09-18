function DisplayController() {

    function getTemperatureColour(temp, scale) {
        if (scale == 'C') {
            if (temp < 1) {
                return 'temp-freezing';
            }
            else if (temp < 3) {
                return 'temp-very-cold';
            }
            else if (temp < 6) {
                return 'temp-cold';
            }
            else if (temp < 10) {
                return 'temp-cool';
            }
            else if (temp < 13) {
                return 'temp-mild';
            }
            else if (temp < 16) {
                return 'temp-slightly-warm';
            }
            else if (temp < 20) {
                return 'temp-warm';
            }
            else if (temp < 23) {
                return 'temp-quite-hot';
            }
            else if (temp < 26) {
                return 'temp-hot';
            }
            else if (temp < 29) {
                return 'temp-very-hot';
            }
            else {
                return 'temp-extremely-hot';
            }
        }
        else {
            if (temp < 34) {
                return 'temp-freezing';
            }
            else if (temp < 38) {
                return 'temp--very-cold';
            }
            else if (temp < 43) {
                return 'temp-cold';
            }
            else if (temp < 50) {
                return 'temp-cool';
            }
            else if (temp < 56) {
                return 'temp-mild';
            }
            else if (temp < 61) {
                return 'temp-slightly-warm';
            }
            else if (temp < 68) {
                return 'temp-warm';
            }
            else if (temp < 74) {
                return 'temp-quite-hot';
            }
            else if (temp < 79) {
                return 'temp-hot';
            }
            else if (temp < 85) {
                return 'temp-very-hot';
            }
            else {
                return 'temp-extremely-hot';
            }
        }
    }

    return {
        getTemperatureColour: getTemperatureColour
    }
}