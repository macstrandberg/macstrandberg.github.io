(function () {
  'use strict';

  let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
  };

  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  function calculateBinaryTime(hour, minute, second) {
    let decTimes = [],
        binTimes = [],
        columnArrangedBinTimes = [],
        rowArrangedBinTimes = [[],[],[],[]];

    decTimes.push(hour + '');
    decTimes.push(minute + '');
    decTimes.push(second + '');

    for (let i = 0; i < 3; i++) {
      binTimes.push(decTimes[i]); // push decimal time to array

      binTimes.push(decTimes[i].substring(0, 1)); // push first digit
      binTimes[i + 1] = (binTimes[i + 1] >>> 0).toString(2); // convert first digit to bin

      if (decTimes[i].length === 2) {
        binTimes[i + 1] += '-'; // adding splitter
        binTimes.push(decTimes[i].substring(1)); // push second digit
        binTimes[i + 2] = (binTimes[i + 2] >>> 0).toString(2); // convert second digit to bin
      }

      binTimes.splice(i, 1); // remove first and last element(decimal time, );

      if (decTimes[i].length === 2) {
        binTimes[i] += binTimes[i + 1]; // adding first and second digits to one element
        binTimes.splice(-1, 1); // removing last element
      }

      columnArrangedBinTimes.push(binTimes[i]); // push it to the columnArrangedBinTimesurn array
    }

    for (let i = 0; i < columnArrangedBinTimes.length; i++) { // remove dash
      columnArrangedBinTimes[i] = columnArrangedBinTimes[i].split('-');
    }

    for (let i = 0; i < columnArrangedBinTimes.length; i++) { // left zero padding time-strings
      for (let j = 0; j < 2; j++) {
        columnArrangedBinTimes[i][j] = pad(columnArrangedBinTimes[i][j], 4);
      }
    }

    for (let i = 0; i < 3; i++) { // convert from line to column
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 2; k++) {
          rowArrangedBinTimes[j] += columnArrangedBinTimes[i][k].substr(j, 1);
        }
      }
    }

    return rowArrangedBinTimes;
  }

  function parseBinaryTime(timeArr) {
    let tr = document.querySelectorAll('tbody > tr');

    for (let i = 0; i < 4; i++) { // row
      if (timeArr[i] !== undefined) {
        for (let j = 0; j < 6; j++) { // col/cell
          if (timeArr[i][j] === "1") {
            tr[i].querySelectorAll('td')[j].style.backgroundColor = '#B0BEC5'
          } else {
            tr[i].querySelectorAll('td')[j].style.backgroundColor = '#37474F'
          }
        }
      }
    }

    // hide cells that aren't ever lit up
    tr[0].querySelectorAll('td')[0].style.backgroundColor = '#455A64';
    tr[0].querySelectorAll('td')[2].style.backgroundColor = '#455A64';
    tr[0].querySelectorAll('td')[4].style.backgroundColor = '#455A64';
    tr[1].querySelectorAll('td')[0].style.backgroundColor = '#455A64';
  };

  function draw(hour, minute, second) {
    let timeArr = calculateBinaryTime(hour, minute, second);
    parseBinaryTime(timeArr);
  }

  function update() {
    let now = new Date(),
        day = now.getDayName(),
        month = now.getMonthName(),
        date = now.getDate();

    draw(now.getHours(), now.getMinutes(), now.getSeconds());
    document.querySelectorAll('p')[0].textContent = day + ' | ' + month + ' ' + date;
    document.title = now.getTime();

    requestAnimationFrame(update);
  }

  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(update);
  });
}());