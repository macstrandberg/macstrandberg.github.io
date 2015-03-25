!function () {
  'use strict';

  var currentTime,
      now,
      hour,
      minute,
      second,
      clockFace = document.getElementsByClassName('clock-face')[0],
      armMiddle = document.getElementsByClassName('arm middle')[0],
      armHour = document.getElementsByClassName('arm hour')[0],
      armMinute = document.getElementsByClassName('arm minute')[0],
      armSecond = document.getElementsByClassName('arm second')[0],
      dateElement = document.querySelectorAll('.date p')[0],
      lightBackground = '#E3F2FD',
      lightHour = '#2196F3',
      lightMinute = '#82B1FF',
      lightDate = 'rgba(0, 0, 0, 0.87)',
      darkBackground = '#263238',
      darkMinute = '#607D8B',
      darkSecond = '#90AfAE',
      darkDate = 'rgba(255, 255, 255, 1)',
      days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      months = ['jan', 'febr', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
  };

  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };

  function updateClock () {
    now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds();

    rotateArm('hour', hour);
    rotateArm('minute', minute);
    rotateArm('second', second);

    window.changeStyleByHour(hour);

    document.title = now.getTime();

    return now;
  }

  window.changeStyleByHour = function (hour) {
    if (hour > 6 && hour < 22) {
      clockFace.style.backgroundColor = lightBackground;
      armMiddle.style.backgroundColor = lightBackground;
      armHour.style.backgroundColor = lightMinute;
      armMinute.style.backgroundColor = lightMinute;
      armSecond.style.backgroundColor = lightHour;
      dateElement.style.color = lightDate;
    } else {
      clockFace.style.backgroundColor = darkBackground;
      armMiddle.style.backgroundColor = darkBackground;
      armHour.style.backgroundColor = darkSecond;
      armMinute.style.backgroundColor = darkSecond;
      armSecond.style.backgroundColor = darkMinute;
      dateElement.style.color = darkDate;
    }
  }

  function rotateArm(arm, time) {
    document.getElementsByClassName(arm)[0].style.transform = 'rotate(' + ((arm === 'hour') ? (time % 12) * 30 : time * 6) + 'deg)';
  }

  document.addEventListener('DOMContentLoaded', function () {
    currentTime = updateClock();

    dateElement.textContent = currentTime.getDayName() + ' | ' + currentTime.getMonthName() + ' ' + currentTime.getDate();

    window.setInterval(updateClock, 1000);
  });

}();