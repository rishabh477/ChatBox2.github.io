const socket = require('ws').Server;
const server = new socket ({port:4000});

server.on('connection',function(ws) {
		console.log("socket connection estd");
		ws.on('message',function (msg){
			message = JSON.parse(msg);
			if(message.type== "name"){
				ws.userId=message.data || "unknown";
				return;
			}
			server.clients.forEach(function(user){
				if( user!= ws){
					user.send(JSON.stringify({
						name:ws.userId,
						data:message.data
					}));

				}
			})
		})
	});