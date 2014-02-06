/************************
jquery-datepair v1.2.13
http://jonthornton.github.com/jquery-datepair/

requires jQuery 1.7+
************************/


(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var _ONE_DAY = 86400000;
	var _defaults =	{
		startClass: 'start',
		endClass: 'end',
		timeClass: 'time',
		dateClass: 'date',
		parseTime: function($timeInput){
			return $timeInput.timepicker('getTime');
		},
		parseDate: function($dateInput){
			return ($dateInput.data('datepicker').date != null ? $dateInput.data('datepicker').date : $dateInput.data('datepicker').viewDate);
		},
		setMinTime: function($input, dateObj){
			$input.timepicker('option', 'minTime', dateObj);
		},
		updateDate: function($input, dateObj){
			$input.data('datepicker').setUTCDate(dateObj);
		},
		updateTime: function($input, dateObj){
			$input.timepicker('setTime', dateObj);
		}
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var self = $(this);

				var settings = $.extend({}, _defaults);

				if (options) {
					settings = $.extend(settings, options);
				}

				settings = _parseSettings(settings);

				self.data('datepair-settings', settings);
				self.on('changeDate.datepair', null, _inputChanged);
				self.on('changeTime.datepair', null, _inputChanged);

				// initialize datepair-datedelta and datepair-timedelta
			});
		},

		option: function(key, value)
		{
			var self = this;
			var settings = self.data('datepair-settings');

			if (typeof key == 'object') {
				settings = $.extend(settings, key);

			} else if (typeof key == 'string' && typeof value != 'undefined') {
				settings[key] = value;

			} else if (typeof key == 'string') {
				return settings[key];
			}

			settings = _parseSettings(settings);

			self.data('datepair-settings', settings);

			return self;
		},

		remove: function()
		{
			var self = this;
			self.removeData('datepair-settings');
			self.off('.timepicker');
		}
	};

	// private methods

	function _parseSettings(settings)
	{
		// if (settings.startClass) {
		// 	settings.minTime = _time2int(settings.minTime);
		// }

		return settings;
	}

	function _inputChanged(e)
	{
		var $self = $(this);
		var settings = $self.data('datepair-settings');
		var $target = $(e.target);

		if ($target.val() == '') {
			return;
		}

		if ($target.hasClass(settings.dateClass)) {
			_dateChanged($self, $target);

		} else if ($target.hasClass(settings.timeClass)) {
			_timeChanged($self, $target);
		}
	}

	function _getStartDateInput($self)
	{
		var settings = $self.data('datepair-settings');
		return $self.find('.'+settings.startClass+'.'+settings.dateClass);
	}

	function _getEndDateInput($self)
	{
		var settings = $self.data('datepair-settings');
		return $self.find('.'+settings.endClass+'.'+settings.dateClass);
	}

	function _getStartTimeInput($self)
	{
		var settings = $self.data('datepair-settings');
		return $self.find('.'+settings.startClass+'.'+settings.timeClass);
	}

	function _getEndTimeInput($self)
	{
		var settings = $self.data('datepair-settings');
		return $self.find('.'+settings.endClass+'.'+settings.timeClass);
	}

	function _dateChanged($self, $target)
	{
		var settings = $self.data('datepair-settings');

		var $startDateInput = _getStartDateInput($self);
		var $endDateInput = _getEndDateInput($self);

		if (!$startDateInput.val() || !$endDateInput.val()) {
			if ($startDateInput.val()) {
				settings.updateDate($endDateInput, settings.parseDate($startDateInput));
			} else if ($endDateInput.val()) {
				settings.updateDate($startDateInput, settings.parseDate($endDateInput));
			}


			$self.data('datepair-datedelta', 0);
			_updateEndMintime($self);
			return;
		} else if (!$self.data('datepair-datedelta')) {
			$self.data('datepair-datedelta', 0);
		}

		var startDate = settings.parseDate($startDateInput);
		var endDate = settings.parseDate($endDateInput);

		if ($target.hasClass(settings.startClass)) {
			var newEndDate = new Date(startDate.getTime()+$self.data('datepair-datedelta'));
			settings.updateDate($endDateInput, newEndDate);
		} else if ($target.hasClass(settings.endClass)) {
			if (endDate < startDate) {
				$self.data('datepair-datedelta', 0);
				settings.updateDate($startDateInput, endDate);
			} else {
				$self.data('datepair-datedelta', endDate.getTime() - startDate.getTime());
			}
		}

		_updateEndMintime($self);
	}

	function _updateEndMintime($self)
	{
		var settings = $self.data('datepair-settings');
		var $startTimeInput = _getStartTimeInput($self);
		var $endTimeInput = _getEndTimeInput($self);

		var startTime;
		if ($self.data('datepair-datedelta') <= _ONE_DAY) {
			var startTime = settings.parseTime($startTimeInput);
		}

		settings.setMinTime($endTimeInput, startTime);
	}

	function _timeChanged($self, $target)
	{
		var settings = $self.data('datepair-settings');

		var $startTimeInput = $self.find('.'+settings.startClass+'.'+settings.timeClass);
		var $endTimeInput = $self.find('.'+settings.endClass+'.'+settings.timeClass);

		if (!$startTimeInput.val() || !$endTimeInput.val()) {
			$self.data('datepair-timedelta', 0);
			_updateEndMintime($self);
			return;
		} else if (!$self.data('datepair-timedelta')) {
			$self.data('datepair-timedelta', 0);
		}

		var startTime = settings.parseTime($startTimeInput);
		var endTime = settings.parseTime($endTimeInput);

		if ($target.hasClass(settings.startClass)) {
			var newEndTime = new Date(startTime.getTime()+$self.data('datepair-timedelta'));
			settings.updateTime($endTimeInput, newEndTime);
			endTime = settings.parseTime($endTimeInput);
		}

		if ((endTime.getTime() - startTime.getTime()) * $self.data('datepair-timedelta') < 0) {
			var $endDateInput = _getEndDateInput($self);
			var endDate = settings.parseDate($endDateInput);
			var offset = (endTime < startTime) ? _ONE_DAY : -1 * _ONE_DAY;

			settings.updateDate($endDateInput, new Date(endDate.getTime() + offset));
			var newDelta = $self.data('datepair-timedelta') + offset;
			$self.data('datepair-timedelta', newDelta);
		}

		$self.data('datepair-timedelta', endTime.getTime() - startTime.getTime());

		_updateEndMintime($self);
	}


	// Plugin entry
	$.fn.datepair = function(method)
	{
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.datepair"); }
	};
}));
