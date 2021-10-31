const bindings = require('bindings');
const ffplayer = bindings('sange');
const EventEmitter = require('events');

const FFPLAYER_RETRYABLE_ERRORS = new Map();

FFPLAYER_RETRYABLE_ERRORS.set(-808465656, 'HTTP 400');
FFPLAYER_RETRYABLE_ERRORS.set(-825242872, 'HTTP 401');
FFPLAYER_RETRYABLE_ERRORS.set(-858797304, 'HTTP 403');
FFPLAYER_RETRYABLE_ERRORS.set(-875574520, 'HTTP 404');
FFPLAYER_RETRYABLE_ERRORS.set(-1482175736, 'HTTP 4XX');
FFPLAYER_RETRYABLE_ERRORS.set(-1482175992, 'HTTP 5XX');

module.exports = class Player extends EventEmitter{
	constructor(){
		super();

		this.paused = false;
		this.ffplayer = new ffplayer();
		this.ffplayer.onready = this.emit.bind(this, 'ready');
		this.ffplayer.onpacket = this.emit.bind(this, 'packet');
		this.ffplayer.onfinish = this.emit.bind(this, 'finish');
		this.ffplayer.ondebug = this.emit.bind(this, 'debug');
		this.ffplayer.onerror = this.onerror.bind(this);
	}

	onerror(error, code){
		this.emit('error', error, FFPLAYER_RETRYABLE_ERRORS.has(code));
	}

	setURL(url){
		return this.ffplayer.setURL(url);
	}

	setOutput(channels, sample_rate, bitrate){
		return this.ffplayer.setOutput(channels, sample_rate, bitrate);
	}

	isPaused(){
		return this.paused;
	}

	setPaused(paused){
		this.paused = paused;

		return this.ffplayer.setPaused(paused);
	}

	setVolume(volume){
		return this.ffplayer.setVolume(volume);
	}

	setBitrate(bitrate){
		return this.ffplayer.setBitrate(bitrate);
	}

	setRate(rate){
		return this.ffplayer.setRate(rate);
	}

	setTempo(tempo){
		return this.ffplayer.setTempo(tempo);
	}

	setTremolo(depth, rate){
		return this.ffplayer.setTremolo(depth, rate);
	}

	setEqualizer(eqs){
		return this.ffplayer.setEqualizer(...eqs);
	}

	seek(time){
		return this.ffplayer.seek(time);
	}

	getTime(){
		return this.ffplayer.getTime();
	}

	getDuration(){
		return this.ffplayer.getDuration();
	}

	getFramesDropped(){
		return this.ffplayer.getFramesDropped();
	}

	getTotalFrames(){
		return this.ffplayer.getTotalFrames();
	}

	start(){
		return this.ffplayer.start();
	}

	stop(){
		return this.ffplayer.stop();
	}

	destroy(){
		return this.ffplayer.destroy();
	}
}