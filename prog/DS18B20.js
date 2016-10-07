var influx = require('influx');
var five = require("johnny-five");

var client = influx({host: 'raspberrypi', port: 8086, protocol: 'http', database: 'temperature', username: '', password: ''});
var board = new five.Board();

board.on("ready", function() {
  var thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: 10,
    freq: 1000
  });

  thermometer.on("data", function() {
    console.log(this.celsius + "°C");
    client.writePoint('temp', {value: this.celsius}, {}, function(err) {
      if (err) console.log(err);
    });
  });
});
