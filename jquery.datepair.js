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
		defaultDateDelta: 0,
		defaultTimeDelta: 3600000,
		parseTime: function($input){
			return $input.timepicker('getTime');
		},
		updateTime: function($input, dateObj){
			$input.timepicker('setTime', dateObj);
		},
		parseDate: function($input){
			return $input.datepicker('getDate');
		},
		updateDate: function($input, dateObj){
			$input.datepicker('update', dateObj);
		},
		setMinTime: function($input, dateObj){
			$input.timepicker('option', 'minTime', dateObj);
		}
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var $self = $(this);

				var settings = $.extend({}, _defaults);

				if (options) {
					settings = $.extend(settings, options);
				}

				settings = _parseSettings(settings);

				$self.data('datepair-settings', settings);
				_bindChangeHandler($self);

				// initialize datepair-datedelta
				var $startDateInput = _getStartDateInput($self);
				var $endDateInput = _getEndDateInput($self);

				if ($startDateInput.val() && $endDateInput.val()) {
					var startDate = settings.parseDate($startDateInput);
					var endDate = settings.parseDate($endDateInput);
					$self.data('datepair-datedelta', endDate.getTime() - startDate.getTime());
				} else {
					$self.data('datepair-datedelta', null);
				}

				// initialize datepair-timedelta
				var $startTimeInput = _getStartTimeInput($self);
				var $endTimeInput = _getEndTimeInput($self);

				if ($startTimeInput.val() && $endTimeInput.val()) {
					var startTime = settings.parseTime($startTimeInput);
					var endTime = settings.parseTime($endTimeInput);
					$self.data('datepair-timedelta', endTime.getTime() - startTime.getTime());
				} else {
					$self.data('datepair-timedelta', null);
				}

				_updateEndMintime($self);
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

		getTimeDiff: function()
		{
			$self = this;
			return $self.data('datepair-datedelta') * _ONE_DAY + $self.data('datepair-timedelta');
		},

		remove: function()
		{
			var $self = this;
			$self.removeData('datepair-settings');
			_unbindChangeHandler($self)

			return $self;
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

	function _bindChangeHandler($self)
	{
		$self.on('change.datepair', null, _inputChanged);
	}

	function _unbindChangeHandler($self)
	{
		$self.off('change.datepair');
	}

	function _inputChanged(e)
	{
		var $self = $(this);

		// temporarily unbind the change handler to prevent triggering this
		// if we update other inputs
		_unbindChangeHandler($self);

		var settings = $self.data('datepair-settings');
		var $target = $(e.target);

		if ($target.hasClass(settings.dateClass)) {
			if ($target.val() != '') {
				_dateChanged($self, $target);
			} else {
				$self.data('datepair-datedelta', null);
			}

		} else if ($target.hasClass(settings.timeClass)) {
			if ($target.val() != '') {
				_timeChanged($self, $target);
			} else {
				$self.data('datepair-timedelta', null);
			}
		}

		_validateRanges($self);
		_updateEndMintime($self)
		_bindChangeHandler($self);
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

		if (!$startDateInput.length || !$endDateInput.length) {
			return
		}

		if (!$startDateInput.val() || !$endDateInput.val()) {
			if (settings.defaultDateDelta !== null) {
				if ($startDateInput.val()) {
					var startDate = settings.parseDate($startDateInput);
					var newEnd = new Date(startDate.getTime() + settings.defaultDateDelta * _ONE_DAY);
					settings.updateDate($endDateInput, newEnd);
				} else if ($endDateInput.val()) {
					var endDate = settings.parseDate($endDateInput);
					var newStart = new Date(endDate.getTime() - settings.defaultDateDelta * _ONE_DAY);
					settings.updateDate($startDateInput, newStart);
				}

				$self.data('datepair-datedelta', settings.defaultDateDelta * _ONE_DAY);
			} else {
				$self.data('datepair-datedelta', null);
			}

			return;
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
	}

	function _updateEndMintime($self)
	{
		var settings = $self.data('datepair-settings');
		if (typeof settings.setMinTime != 'function') return;

		var startTime = null;
		if (!$self.data('datepair-datedelta') || $self.data('datepair-datedelta') < _ONE_DAY
				|| ($self.data('datepair-timedelta') && $self.data('datepair-datedelta') + $self.data('datepair-timedelta') < _ONE_DAY)) {
			var $startTimeInput = _getStartTimeInput($self);
			startTime = settings.parseTime($startTimeInput);
		}

		var $endTimeInput = _getEndTimeInput($self);
		settings.setMinTime($endTimeInput, startTime);
	}

	function _timeChanged($self, $target)
	{
		var settings = $self.data('datepair-settings');

		var $startTimeInput = _getStartTimeInput($self);
		var $endTimeInput = _getEndTimeInput($self);

		if (!$startTimeInput.length || !$endTimeInput.length) {
			return
		}

		if (!$startTimeInput.val() || !$endTimeInput.val()) {
			if (settings.defaultTimeDelta !== null) {
				if ($startTimeInput.val()) {
					var startTime = settings.parseTime($startTimeInput);
					var newEnd = new Date(startTime.getTime() + settings.defaultTimeDelta);
					settings.updateTime($endTimeInput, newEnd);
				} else if ($endTimeInput.val()) {
					var endTime = settings.parseTime($endTimeInput);
					var newStart = new Date(endTime.getTime() - settings.defaultTimeDelta);
					settings.updateTime($startTimeInput, newStart);
				}

				$self.data('datepair-timedelta', settings.defaultTimeDelta);
			} else {
				$self.data('datepair-timedelta', null);
			}

			return;
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
			if ($endDateInput.val()) {
				var offset = (endTime < startTime) ? _ONE_DAY : -1 * _ONE_DAY;
				var endDate = settings.parseDate($endDateInput);
				settings.updateDate($endDateInput, new Date(endDate.getTime() + offset));
				_dateChanged($self, $endDateInput);
			}
		}

		$self.data('datepair-timedelta', endTime.getTime() - startTime.getTime());
	}

	function _validateRanges($self)
	{
		var $startTimeInput = _getStartTimeInput($self);
		var $endTimeInput = _getEndTimeInput($self);

		if ($startTimeInput.length && $endTimeInput.length && $self.data('datepair-timedelta') === null) {
			$self.trigger('rangeIncomplete');
			return;
		}

		var $startDateInput = _getStartDateInput($self);
		var $endDateInput = _getEndDateInput($self);
		if ($startDateInput.length && $endDateInput.length && $self.data('datepair-datedelta') === null) {
			$self.trigger('rangeIncomplete');
			return;
		}

		if ($self.data('datepair-datedelta') + $self.data('datepair-timedelta') >= 0) {
			$self.trigger('rangeSelected');
		} else {
			$self.trigger('rangeError');
		}
	}


	// Plugin entry
	$.fn.datepair = function(method)
	{
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.datepair"); }
	};
}));
