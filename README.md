# Datepair Plugin for jQuery

[See a demo and examples here](http://jonthornton.github.com/jquery-datepair)

jquery.datepair is a lightweight jQuery plugin for intelligently selecting date and time ranges, inspired by Google Calendar. Datepair will keep the start and end date/times in sync and can set default values based on user action. The plugin does not provide any UI widgets; it's preconfigured to work with [jquery-timepicker](https://github.com/jonthornton/jquery-timepicker) and [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker), but you can use it with any datepicker or timepicker (or none at all).

**This plugin is v0.1.0 and under active development. API may change without warning.**

## Requirements

* [jQuery](http://jquery.com/) (>= 1.7)
* [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker) (>= 1.3) (this dependency can be overridden)
* [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker) (>= 1.3) (this dependency can be overridden)

## Usage

```javascript
$('#container').datepair(options);
```

Where ```#container``` contains time/date input elements with the appropriate class names. ```options``` is an optional javascript object with parameters explained below.

## Options

- **dateClass**  
Class name of the date inputs, if any.  
*default: "date"*

- **defaultDateDelta**  
Fill in the second date value with the specified range when the users selects the first date. Value is in days. Set this to ```null``` to disable automatically setting the second date.  
*default: 0*

- **defaultTimeDelta**  
Fill in the second time value with the specified range when the users selects the first time. Value is in milliseconds; set this to ```7200000``` for a 2 hour range, for example. Set this to ```null``` to disable automatically setting the second time.  
*default: 0*

- **endClass**  
Class name of the range end input(s).  
*default: "end"*

- **parseDate**  
A function that takes a jQuery element for a date input and returns a local time ```Date``` object representing the date input value.  
*default: function for [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker)*

- **parseTime**  
A function that takes a jQuery element for a time input and returns a local time ```Date``` object representing the time input value. See [example page](http://jonthornton.github.com/jquery-datepair) for more info.  
*default: function for [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker)*

- **setMinTime**  
A function that takes a jQuery element for a time input and a local time ```Date``` object representing the time, and sets the timepicker minTime value.  
*default: function for [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker)*

- **startClass**  
Class name of the range start input(s).  
*default: "start"*

- **timeClass**  
Class name of the time inputs, if any.  
*default: "time"*

- **updateDate**  
A function that takes a jQuery element for a date input and a local time ```Date``` object representing the date, and sets the input value.  
*default: function for [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker)*

- **updateTime**  
A function that takes a jQuery element for a time input and a local time ```Date``` object representing the time, and sets the input value.  
*default: function for [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker)*


## Methods

- **getTimeDiff**  
Get the date/time range size, in milliseconds.

	```javascript
	var milliseconds = $('#container').datepair('getTimeDiff');
	```

- **remove**  
Unbind the datepair functionality from a set of inputs. 

	```javascript
	$('#container').datepair('remove');
	```

## Events

- **rangeError**  
Fired after the user interacts with the datepair inputs but selects an invalid range, where the end time/date is before the start.

- **rangeIncomplete**  
Fired after the user interacts with the datepair inputs but one or more empty inputs remain. Unpaired inputs (such as a start date with no corresponding end date) will not be taken into account.

- **rangeSelected**  
Fired after the user interacts with the datepair inputs and all paired inputs have valid values.

## Help

Submit a [GitHub Issues request](https://github.com/jonthornton/jquery-datepicker/issues/new).

## Development Guidelines

1. Install dependencies (jquery + grunt) `npm install`
2. For sanity checks and minification run `grunt`, or just `grunt lint` to have the code linted

- - -

This software is made available under the open source MIT License. &copy; 2014 [Jon Thornton](http://www.jonthornton.com).
