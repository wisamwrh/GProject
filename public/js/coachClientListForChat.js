$(document).ready(async () => {
	var CoachName = '';
	var coachID ='';
	var authCoach = await fetch('/coachs/myProfile', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZiNzViOGM3MTc0NTRkYTQ2YTBkOWQiLCJpYXQiOjE2MTE1OTg3OTN9.QpP4iCDH1FYMLRWGoZYmbVsVhAzoxRM7u9_ykey3kPE',
			'Cookie': 'Authorization=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZiNzViOGM3MTc0NTRkYTQ2YTBkOWQiLCJpYXQiOjE2MTE1OTg3OTN9.QpP4iCDH1FYMLRWGoZYmbVsVhAzoxRM7u9_ykey3kPE'
		}
	});
	if(authCoach.status === 200){
		authCoach.json().then(async (data) => {
			CoachName = data.name;
			coachID = data._id;
		});
		console.log(CoachName, coachID);
	}
    
	var MyClients = await fetch('/coaches/myClients', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	MyClients.json().then((data) => {
		$('#back').hide();
		data.forEach((client) => {
			$('#clientslist').append(
				`<div class="CCLFC-client">
                <img src="/images/f0a64e32194d341befecc80458707565.jpg" class="CCLFC-client-profile-picture" />
                <div class="CCLFC-client-name-div">${client.name}</div>
                <button id="${client._id}" class="CCLFC-client-chat-btn">Chat</button>
                </div>`
			);
		});
	});
    
	$('#clientslist').on('click', (e)=> {
		window.location.href = (`/chat?username=${CoachName}&room=${e.target.id}+${coachID}`);
	});
});