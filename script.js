document.getElementById('convert-button').addEventListener('click', async () => {
	const youtubeURL = document.getElementById('convert-input').value;
  
	if (!youtubeURL) {
		alert("Please enter a YouTube link!");
		return;
	}

	const url = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php?url=${encodeURIComponent(youtubeURL)}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '75cdab17d8msh2830f0b4f95c747p1bec26jsn797626b0fd7f',
			'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);

		// Check if the API has returned a download link
		if (result.status === "finished" && result.dlink) {
			// Display the download link as a clickable link
			document.getElementById('downloadisready').innerHTML = `
				Download is ready! <a href="${result.dlink}" target="_blank">Click here to download the MP3</a>
			`;
		} else {
			document.getElementById('downloadisready').innerText = "Conversion in progress. Please try again shortly.";
		}
	} catch (error) {
		console.error(error);
		alert("An error occurred while converting the video.");
	}
});
