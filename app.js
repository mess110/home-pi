var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();

time = function() {
  return new Date().getTime();
}
var lastCall = time();
var pushed = true;

init = function () {
  arduino.connect();

  arduino.on('connect', function(){
    console.log("board version " + arduino.boardVersion);
    arduino.servoWrite(9, 45);
  });
}

var http = require('http');

function handleRequest(request, response){
  // console.log(request.url);
  var angle = null;
  if (lastCall + 1000 < time()) {
    lastCall = time();
    arduino.servoWrite(9, 135);
    setTimeout(function() {
      arduino.servoWrite(9, 45);
    }, 400);
  }
  response.end('');
}

var server = http.createServer(handleRequest);
server.listen(8080, init);
