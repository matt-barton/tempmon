GraphHelper = function () {

	return {

		GetGraphPoints: function (measurements) {

			var graphPoints = [];

			jQuery.each(measurements, 
				function (index, measurement) {
					var point = [measurement.Time, parseFloat(measurement.Celsius)];
					graphPoints[graphPoints.length] = point;
				}
			);

			return [graphPoints];
		}
	}

} ();