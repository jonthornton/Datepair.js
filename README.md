Datepicker Plugin for jQuery
========================

[See a demo and examples here](http://jonthornton.github.com/jquery-datepair)

jquery.datepair is a lightweight jQuery plugin for intelligently selecting date and time ranges, inspired by Google Calendar.

Requirements
------------
* [jQuery](http://jquery.com/) (>= 1.7)
* [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker) (>= 1.3) (this dependency can be overridden)
* [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker) (>= 1.3) (this dependency can be overridden)

Usage
-----

```javascript
$('#container').datepair(options);
```

Where ```#container``` contains time/date input elements with the appropriate class names. ```options``` is an optional javascript object with parameters explained below.

Options
-------

- **startClass**  
Class name of the range start input(s).  
*default: "start"*

- **endClass**  
Class name of the range end input(s).  
*default: "end"*

- **timeClass**  
Class name of the time inputs, if any.  
*default: "time"*

- **dateClass**  
Class name of the date inputs, if any.  
*default: "date"*

- **defaultDateDelta**  
Fill in the second date value with the specified range when the users selects the first date. Value is in days. Set this to ```null``` to disable automatically setting the second date.  
*default: 0*

- **defaultTimeDelta**  
Fill in the second time value with the specified range when the users selects the first time. Value is in milliseconds; set this to ```7200000``` for a 2 hour range, for example. Set this to ```null``` to disable automatically setting the second time.  
*default: 0*

- **parseTime**  
A function that takes a jQuery element for a time input and returns a local time ```Date``` object representing the time input value. See [example page](http://jonthornton.github.com/jquery-datepair) for more info.  
*default: function for [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker)*

- **updateTime**  
A function that takes a jQuery element for a time input and a local time ```Date``` object representing the time, and sets the input value.  
*default: function for [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker)*

- **parseDate**  
A function that takes a jQuery element for a date input and returns a local time ```Date``` object representing the date input value.  
*default: function for [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker)*

- **updateDate**  
A function that takes a jQuery element for a date input and a local time ```Date``` object representing the date, and sets the input value.  
*default: function for [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker)*

- **setMinTime**  
A function that takes a jQuery element for a time input and a local time ```Date``` object representing the time, and sets the timepicker minTime value.  
*default: function for [jquery-timepicker](https://github.com/jonthornton/jquery-datepicker)*


Help
----

Submit a [GitHub Issues request](https://github.com/jonthornton/jquery-datepicker/issues/new).

Development guidelines
----------------------

1. Install dependencies (jquery + grunt) `npm install`
2. For sanity checks and minification run `grunt`, or just `grunt lint` to have the code linted

- - -

This software is made available under the open source MIT License. &copy; 2014 [Jon Thornton](http://www.jonthornton.com).
