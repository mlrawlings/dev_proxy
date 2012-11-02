var server;
var pathToHostsFile;

var defaultPort = 90;
var fs = require('fs');
var httpProxy = require('http-proxy');

var setupHostsProxy = function() {
	var routes = {};
	var hosts = fs.readFileSync(pathToHostsFile).toString().split('\n');
	for( var i = 0; i < hosts.length; i++ ) {
		var info = hosts[i].match(/^\s*([0-9\.\:]+)\s+([^\#\s]+)\s*(\#\s*\:([0-9]+))?/);
		if( info ) {
			routes[info[2]] = info[1] + ':' + ( info[4] || defaultPort );
		}
	}
	if(server) { 
		server.close(); 
	}
	process.nextTick( function() {
		server = httpProxy.createServer({hostnameOnly: true, router: routes}).listen(80);
	} );
}

if( process.platform === 'win32' ) {
	pathToHostsFile = 'C:/Windows/System32/drivers/etc/hosts';
}
else if( process.platform === 'darwin' ) {
	pathToHostsFile = '/private/etc/hosts';
}
else if( process.platform === 'linux' ) {
	pathToHostsFile = '/etc/hosts';
}

setupHostsProxy();
fs.watchFile( pathToHostsFile, setupHostsProxy );