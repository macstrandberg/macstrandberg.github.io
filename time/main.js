(function () {
  'use strict';

  var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      dateElement = document.querySelectorAll('.date p')[0],
      head = document.getElementsByTagName('head')[0],
      months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      stylesheets = [
        ["#FFF8E1", "#FFE57F", "#FFC107"], // amber
        ["#E3F2FD", "#82B1FF", "#2196F3"], // blue
        ["#E0F7FA", "#84FFFF", "#00BCD4"], // cyan
        ["#FBE9E7", "#FF9E80", "#FF5722"], // deepOrange
        ["#EDE7F6", "#B388FF", "#673AB7"], // deepPurple
        ["#E8F5E9", "#B9F6CA", "#4CAF50"], // green
        ["#E8EAF6", "#8C9EFF", "#3F51B5"], // indigo
        ["#E1F5FE", "#80D8FF", "#03A9F4"], // lightBlue
        ["#F1F8E9", "#CCFF90", "#8BC34A"], // lightGreen
        ["#F9FBE7", "#F4FF81", "#CDDC39"], // lime
        ["#FFF3E0", "#FFD180", "#FF9800"], // orange
        ["#FCE4EC", "#FF80AB", "#E91E63"], // pink
        ["#F3E5F5", "#EA80FC", "#9C27B0"], // purple
        ["#FFEBEE", "#FF8A80", "#F44336"], // red
        ["#E0F2F1", "#A7FFEB", "#009688"], // teal
        ["#FFFDE7", "#FFFF8D", "#FFEB3B"], // yellow
        ["#263238", "#90AFAE", "#607D8B"]  // night
      ];

  Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
  };

  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };

  function setStyle() {
    var style,
        sheet = document.styleSheets[0],
        rules = sheet.rules,
        hour = new Date().getHours();

    if (hour > 6 && hour < 22) {
      style = Math.floor(Math.random() * 15)
    } else {
      style = 16;
      document.querySelector('.date').style.color = 'rgba(255, 255, 255, 1)';
    }

    document.querySelector('.clock').style.backgroundColor = stylesheets[style][0];
    sheet.insertRule('.clock:before {background-color: ' + stylesheets[style][0] + ';}', rules.length);
    document.querySelector('.hour').style.backgroundColor = stylesheets[style][1];
    document.querySelector('.minute').style.backgroundColor = stylesheets[style][1];
    document.querySelector('.second').style.backgroundColor = stylesheets[style][2];
  }

  function initLocalClocks() {
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var hands = [
      {hand: 'hour', angle: (hours * 30) + (minutes / 2)},
      {hand: 'minute', angle: (minutes * 6)},
      {hand: 'second', angle: (seconds * 6)}
    ];

    // Loop through each of these hands to set their angle
    for (var j = 0; j < hands.length; j++) {
      var elements = document.querySelectorAll('.' + hands[j].hand);
      for (var k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
        elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minute') {
          elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
        }
      }
    }
  }

  /*
   * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
   */
  function setUpMinuteHands() {
    // Find out how far into the minute we are
    var containers = document.querySelectorAll('.minute-container');
    var secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
      // Set a timeout until the end of the current minute, to move the hand
      var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
      setTimeout(function() {
        moveMinuteHands(containers);
      }, delay);
    }
  }

  /*
   * Do the first minute's rotation
   */
  function moveMinuteHands(containers) {
    for (var i = 0; i < containers.length; i++) {
      containers[i].style.webkitTransform = 'rotateZ(6deg)';
      containers[i].style.transform = 'rotateZ(6deg)';
    }
    // Then continue with a 60 second interval
    setInterval(function() {
      for (var i = 0; i < containers.length; i++) {
        if (containers[i].angle === undefined) {
          containers[i].angle = 12;
        } else {
          containers[i].angle += 6;
        }
        containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 60000);
  }

  /*
   * Move the second containers
   */
  function moveSecondHands() {
    var containers = document.querySelectorAll('.second-container');
    setInterval(function() {
      for (var i = 0; i < containers.length; i++) {
        if (containers[i].angle === undefined) {
          containers[i].angle = 6;
        } else {
          containers[i].angle += 6;
        }
        containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 1000);
  }

  function update() {
    requestAnimationFrame(update);
    document.title = new Date().getTime();
  }

  document.addEventListener('DOMContentLoaded', function () {
    dateElement.textContent = new Date().getDayName() + ' | ' +
    new Date().getMonthName() + ' ' + new Date().getDate();

    initLocalClocks();
    moveSecondHands();
    setUpMinuteHands();
    setStyle();

    requestAnimationFrame(update);
  });
}());