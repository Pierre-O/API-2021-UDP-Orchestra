const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');
const { v4: uuidv4 } = require('uuid');

const instrumentMap = new Map();
instrumentMap.set('piano', 'ti-ta-ti');
instrumentMap.set('trumpet', 'pouet');
instrumentMap.set('flute', 'trulu');
instrumentMap.set('violin', 'gzi-gzi');
instrumentMap.set('drum', 'boum-boum');

const TIME = 1000;
const PROTOCOL_PORT = 2205;
const PROTOCOL_MULTICAST_ADDRESS = '239.255.22.5';

const instrument = process.argv[2];

if(process.argv.length != 3){
	console.log("Invalid number of arguments");
	return;
}

if(!instrumentMap.has(instrument)){
	console.log("Invalid instrument");
	return;
}

function Musician(instrumentChosen){
	
	this.uuid = uuidv4();
	this.instrumentChosen = instrumentChosen;
	
	Musician.prototype.update = function(){
		
		var measure = {
			uuid: uuid
			sound: instrumentMap.get(instrumentChosen),
			instrument: instrumentChosen;
		};
		var payload = JSON.stringify(measure);
		
		message = new Buffer(payload);
		udpSocket.send(message, 0, message.length, PROTOCOL_PORT, PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
			console.log("Sending payload: " + payload + " via port " + udpSocket.address().port);
		});
		
	}
	
	setInterval(this.update.bind(this), TIME);
	
}

var musician1 = new Musician(instrument);

