const dgram = require('dgram');
const net = require('net');
const moment = require('moment');

const TIME_INACTIVITY = 5; // in seconds
const PROTOCOL_TCP_PORT = 2205;
const PROTOCOL_PORT = 9907;
const PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";

var orchestra = new Map();

const tcpServer = net.createServer();
const udpSocket = dgram.createSocket('udp4');

udpSocket.bind(PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  udpSocket.addMembership(PROTOCOL_MULTICAST_ADDRESS);
});

udpSocket.on('message', function(msg, source) {
	console.log("message received");
	var payload = JSON.parse(msg);
	
	var musician = {
		instrument: payload.instrument,
		sound: payload.sound,
		date: moment(),
		activeSince: moment().format()
	};
	
	if(!orchestra.has(payload.uuid)){
		orchestra.set(payload.uuid,musician);
	}
	else{
		orchestra.get(payload.uuid)[2] = moment();
	}
	
});

tcpServer.listen(PROTOCOL_TCP_PORT, function(){
	console.log("listening");
});

tcpServer.on('connection', function(socket) {
	console.log("connection etablished");
	
	var payload = [];
	
	for(let [key, value] of orchestra){
		if(moment().diff(value.date, 'seconds') > TIME_INACTIVITY){
			orchestra.delete(key);
		}
		else{
			var tcpJson = {
				uuid: key,
				instrument: value.instrument,
				activeSince: value.activeSinve
			}
		}
		payload.push(tcpJson);
	}
	
	console.log(JSON.stringify(payload));
	socket.write(JSON.stringify(payload));
	socket.destroy();
});