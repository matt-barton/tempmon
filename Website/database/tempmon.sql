DROP TABLE IF EXISTS tempmon_Monitor;
CREATE TABLE tempmon_Monitor (
	monitorId INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	location VARCHAR(32),

	PRIMARY KEY (monitorId)
);


DROP TABLE IF EXISTS tempmon_MonitorIdentity;
CREATE TABLE tempmon_MonitorIdentity (
	monitorId INT(11) UNSIGNED NOT NULL,
	identity VARCHAR(36),
	identityType VARCHAR(4),

	PRIMARY KEY (monitorId),
	UNIQUE INDEX (identity, identityType)
);


DROP TABLE IF EXISTS tempmon_Measurement;
CREATE TABLE tempmon_Measurement (
	measurementId INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	monitorId INT(11) NOT NULL DEFAULT '0',
	time DATETIME,
	celsius DECIMAL (4, 2),
	farenheit DECIMAL (5,2),
	
	PRIMARY KEY (MeasurementId)
);
