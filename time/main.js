/* global $, window, document */

(function () {
  'use strict';

  function updateClock () {
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();

    rotateArm('hour', hour);
    rotateArm('minute', minute);
    rotateArm('second', second);

    document.title = now.getTime();

    return now;
  }

  var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      months = ['jan', 'febr', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
  };

  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };

  function rotateArm(arm, time) {
    $('.' + arm).css('transform', 'rotate(' + ((arm === 'hour') ? (time % 12) * 30 : time * 6) + 'deg)');
  }

  $('document').ready(function () {
    var currentTime = updateClock();

    $('.date p').text(currentTime.getDayName() + ' | ' + currentTime.getMonthName() + ' ' + currentTime.getDate());

    window.setInterval(updateClock, 1000);
  });

}());