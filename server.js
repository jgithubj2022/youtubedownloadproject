const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const app = express();

app.get('/convert', (req, res) => {
    const url = req.query.url;
    const output = 'output.mp3';

    if (!ytdl.validateURL(url)) {
        return res.status(400).send('Invalid YouTube URL');
    }

    res.header('Content-Disposition', 'attachment; filename="output.mp3"');

    ytdl(url, { quality: 'highestaudio' })
        .pipe(ffmpeg({ source: ytdl(url) })
            .audioCodec('libmp3lame')
            .format('mp3')
            .pipe(res));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
