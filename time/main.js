(function () {
  'use strict';

  var dateElement = document.querySelectorAll('.date p')[0],
      days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      head = document.getElementsByTagName('head')[0],
      hour,
      hourArm = document.getElementsByClassName('hour')[0],
      millisecond,
      minute,
      minuteArm = document.getElementsByClassName('minute')[0],
      months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      now,
      second,
      secondArm = document.getElementsByClassName('second')[0],
      stylesheet = document.createElement('link');

  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';

  Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
  };

  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };

  function changeStyleByHour (hour) {
    if (hour > 6 && hour < 22) {
      stylesheet.href = 'bright.css';
    } else {
      stylesheet.href = 'dark.css';
    }

    head.appendChild(stylesheet);
  }

  function updateClock () {
    now = new Date();
    hour = now.getHours();
    minute = now.getMinutes();
    second = now.getSeconds();
    millisecond = now.getMilliseconds();

    hourArm.style.transform = 'rotate(' +
      (360 - (1440 - (60 * hour + minute)) / 2) + 'deg)';
    minuteArm.style.transform = 'rotate(' + minute * 6 + 'deg)';
    secondArm.style.transform = 'rotate(' +
        (second + ((millisecond % 60000) / 1000)) * 6 + 'deg)';

    changeStyleByHour(hour);

    document.title = now.getTime();

    return now;
  }

  function draw() {
    requestAnimationFrame(draw);
    updateClock();
  }

  document.addEventListener('DOMContentLoaded', function () {
    dateElement.textContent = new Date().getDayName() + ' | ' +
    new Date().getMonthName() + ' ' + new Date().getDate();

    requestAnimationFrame(draw);
  });

}());