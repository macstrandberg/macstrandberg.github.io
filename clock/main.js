/* global $, window */

(function () {
  'use strict';
  
  function reloadClock () {
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
    
    setHourArm(hour);
    setMinuteArm(minute);
    setSecondArm(second);
    
//    rotateArm();
  }
  
  function rotateArm(arm) {
    $('.' + arm).css('-webkit-transform', 'rotate(' + (arm * 15) + 'deg)');
  }
  
  function setHourArm(hour) {
    $('.hour').css('-webkit-transform', 'rotate(' + (hour * 15) + 'deg)');
  }
  
  function setMinuteArm(minute) {
    $('.minute').css('-webkit-transform', 'rotate(' + (minute * 6) + 'deg)');
  }
  
  function setSecondArm(second) {
    $('.second').css('-webkit-transform', 'rotate(' + (second * 6) + 'deg)');
  }
  
  $('document').ready(function () {
    reloadClock();
    
    window.setInterval(reloadClock, 1000);
  });
  
}());