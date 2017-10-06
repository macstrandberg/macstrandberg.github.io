(function () {
  'use strict';

  let now = moment().format('HH:mm:ss'),
    $clockFace = document.querySelectorAll('.clock-face')[0];

  window.time = {
    hour: 0,
    minute: 0,
    second: 0,
    setHour: function(hour) {
      this.hour = hour;
    },
    setMinute: function(minute) {
      this.minute = minute;
    },
    setSecond: function(second) {
      this.second = second;
    },
    getHour: function() {
      return this.hour;
    },
    getMinute: function() {
      return this.minute;
    },
    getSecond: function() {
      return this.second;
    },
    pad: function(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    },
    calculateBinaryTime: function () {
      let Debug = false;
      let decTimes = [];
      let binTimes = [];
      let columnArrangedBinTimes = [];
      let rowArrangedBinTimes = [[],[],[],[]];

      decTimes.push(this.getHour() + '');
      decTimes.push(this.getMinute() + '');
      decTimes.push(this.getSecond() + '');

      for (let i = 0; i < 3; i++) {
        binTimes.push(decTimes[i]); // push decimal time to array
        Debug ? console.debug('****************************') : null;
        Debug ? console.debug('pushed decimal') : null;
        Debug ? console.debug(binTimes) : null;

        // push first digit
        binTimes.push(decTimes[i].substring(0, 1));
        Debug ? console.debug('pushed first digit') : null;
        Debug ? console.debug(binTimes) : null;
        // convert first digit to bin
        binTimes[i + 1] = (binTimes[i + 1] >>> 0).toString(2);
        Debug ? console.debug('converted first digit to bin') : null;
        Debug ? console.debug(binTimes) : null;

        if (decTimes[i].length === 2) {
          // adding splitter
          binTimes[i + 1] += '-';
          Debug ? console.debug('splitter added') : null;
          Debug ? console.debug(binTimes) : null;

          // push second digit
          binTimes.push(decTimes[i].substring(1));
          Debug ? console.debug('pushed second digit to bin') : null;
          Debug ? console.debug(binTimes) : null;
          // convert second digit to bin
          binTimes[i + 2] = (binTimes[i + 2] >>> 0).toString(2);
          Debug ? console.debug('converted second digit to bin') : null;
          Debug ? console.debug(binTimes) : null;
        }

        // remove first and last element(decimal time, );
        binTimes.splice(i, 1);
        Debug ? console.debug('spliced i,1') : null;
        Debug ? console.debug(binTimes) : null;

        if (decTimes[i].length === 2) {
          // adding first and second digits to one element
          binTimes[i] += binTimes[i + 1];
          Debug ? console.debug('concat') : null;
          Debug ? console.debug(binTimes) : null;

          // removing last element
          binTimes.splice(-1, 1);
          Debug ? console.debug('spliced -1,1') : null;
          Debug ? console.debug(binTimes) : null;
        }
        Debug ? console.debug('****************************') : null;

        // document.getElementById('binTimeString').innerText = binTimes;

        // push it to the columnArrangedBinTimesurn array
        columnArrangedBinTimes.push(binTimes[i]);
      }

      for (let i = 0; i < columnArrangedBinTimes.length; i++) { // remove dash
        columnArrangedBinTimes[i] = columnArrangedBinTimes[i].split('-');
      }

      for (let i = 0; i < columnArrangedBinTimes.length; i++) { // left zero padding time-strings
        for (let j = 0; j < 2; j++) {
          columnArrangedBinTimes[i][j] = this.pad(columnArrangedBinTimes[i][j], 4);
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
    },
    parseBinaryTime: function (timeArr) {
      let tr = document.querySelectorAll('tbody > tr');

      for (let i = 0; i < 4; i++) { // row
        if (timeArr[i] !== undefined) {
          for (let j = 0; j < 6; j++) { // col/cell
            if (timeArr[i][j] === "1") {
              // tr[i].querySelectorAll('td')[j].textContent = '*';
              tr[i].querySelectorAll('td')[j].style.backgroundColor = '#B0BEC5'
            } else {
              // tr[i].querySelectorAll('td')[j].innerHTML = '&nbsp;';
              tr[i].querySelectorAll('td')[j].style.backgroundColor = '#455A64'
            }
          }
        }
      }
    },
    draw: function(hour, minute, second) {
      this.setHour(hour);
      this.setMinute(minute);
      this.setSecond(second);

      let timeArr = this.calculateBinaryTime();
      this.parseBinaryTime(timeArr);
    }
  };

  function update() {
    let now = moment();

    window.time.draw(now.hour(), now.minute(), now.second());
    requestAnimationFrame(update);
  }

  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(update);
  });

}());