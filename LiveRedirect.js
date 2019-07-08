$(function() {
	//establish variables
	var $displayTable = $("#displayTable");
	var loginNames = ["AntonioAsh", "BraindeadSurki", "Chachava", "Crittle888", "Ember798", "FibroWolf", "HrvstrOfEnergy","Liza_M", "MuuMuuFace", "NeenSheep", "TheOptionalOath", "Princess___Lissy", "TheQuietestGirl"]
	var urlString = "";
	var statusString = "";
	var htmlString = "";
	var liveStreamers = [];

//create urlString with loginName array
	for (var i = 0; i < loginNames.length; i++){
		if (loginNames.length > i-1) {
			urlString += "login=" + loginNames[i] + "&";
			statusString += "user_login=" + loginNames[i] + "&";
		} else {
			urlString += "login=" + loginNames[i];
			statusString += "user_login=" + loginNames[i];
		}
	}
//get user data
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/helix/users?" + urlString,
		headers: {
			'Client-ID': '7b4w6b4fjx7llf1dcudr2fhpnr5uxr'
		},
		success: function(profileData) {
			checkStatus(profileData);
		}
	});

//check to see if users are live
	function checkStatus(profileData) {
		$.ajax({
			type: 'GET',
			url: "https://api.twitch.tv/helix/streams?" + statusString,
			headers: {
				'Client-ID': '7b4w6b4fjx7llf1dcudr2fhpnr5uxr'
			},
			success: function(newData) {
				if (newData.data.length != 0) {
					for (var i = 0; i < newData.data.length; i++) {
						if (newData.data[i].type == 'live') {
							if (checkIDMatch(newData.data[i].user_id, profileData)) {
								liveStreamers.push(newData.data[i].user_name);
							}
						}
					}
				}
				sendAddress(profileData);
			}
		});
	};

	function checkIDMatch(newID, profileData) {
		for (var i = 0; i < profileData.data.length; i++) {
			if (newID == profileData.data[i].id) {
				return true;
			}
		}
		return false;
	}

	function sendAddress(profileData) {
		htmlString = 'https://kadgar.net/live'
			for (var j = 0; j < liveStreamers.length; j++){
				htmlString += "/" + liveStreamers[j];
			}
		window.location.replace(htmlString);
	};

});