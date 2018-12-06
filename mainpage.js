const socket= new WebSocket("ws://localhost:4000");
console.log(socket);
	var field=document.getElementById('chatbox');
	var user_id;
	document.getElementById('submit').onclick=function(){
		var user_name=document.getElementById('user-name').value;
		user_id = user_name;
		document.getElementById('showName').innerHTML = "Hello " + user_id +"!";
		document.getElementById('user-name').value="";
		socket.send(JSON.stringify({
			type:"name",
			data:user_id
		}));
	}; 
	socket.onopen = function(event) {
		socket.send(JSON.stringify({
			type:"name",
			data:user_id
		}));
	};
	document.getElementById('btn').onclick=function(){
		var textmsg=document.getElementById('msg').value;
		field.innerHTML +="<b>you:</b>"+textmsg +"<br>";
		//socket.send(textmsg.value);
		socket.send(JSON.stringify({
			type:"message",
			data:textmsg
		}));		
	};
		
		
	socket.onmessage=function(event){
		console.log(event);
		var json = JSON.parse(event.data);
		field.innerHTML += json.name +":"+ json.data+"<br>";
	}