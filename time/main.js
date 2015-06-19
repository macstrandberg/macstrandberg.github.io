(function () {
  'use strict';

  /* todo:
   * re-write to use animation frames(correct term?)
   * fix hour-hand to properly align closer to next hour when minutes > 30
   * make second-hand seamlessly float between seconds, instead of jumping to the next second each second
  **/

  var currentTime,
      dateElement = document.querySelectorAll('.date p')[0],
      days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      head = document.getElementsByTagName('head')[0],
      hour,
      hourArm = document.getElementsByClassName('hour')[0],
      millisecond,
      minute,
      minuteArm = document.getElementsByClassName('minute')[0],
      months = ['jan', 'febr', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
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

    rotateArm('hour', hour);
    rotateArm('minute', minute);
    rotateArm('second', second);

    changeStyleByHour(hour);

    document.title = now.getTime();

    return now;
  }

  function rotateArm(arm, time) {
    if (arm === 'hour') {
      hourArm.style.transform = 'rotate(' + (time % 12) * 30 + 'deg)';
    } else if (arm === 'minute') {
      minuteArm.style.transform = 'rotate(' + time * 6 + 'deg)';
    } else {
      secondArm.style.transform = 'rotate(' + time * 6 + 'deg)';
    }
    // document.getElementsByClassName(arm)[0].style.transform = 'rotate(' + ((arm === 'hour') ? (time % 12) * 30 : time * 6) + 'deg)';
  }

  document.addEventListener('DOMContentLoaded', function () {
    currentTime = updateClock();

    dateElement.textContent = currentTime.getDayName() + ' | ' + currentTime.getMonthName() + ' ' + currentTime.getDate();

    window.setInterval(updateClock, 1000);
  });

}());