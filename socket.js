const socket=require('ws').Server;


server.on('connection',function(ws) {
	ws.on('message',function(msg){
		msg=JSON.parse(msg);

		server.clients.forEach(function(user){
			if(user != ws){
				user.send(JSON.stringify({
					name: ws.userid,
					data: msg.data
				}));
			};
		});
	});
});