

import React, { useState } from 'react';
import './Styles/audio.css';
import AudioPlayer from './components/AudioPlayer';

const initialAudioFiles = JSON.parse(localStorage.getItem('audioList')) ||
  [
    { name: 'Audio2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },

  
  ];

const App = () => {
  const [audioUpload, setAudioUpload] = useState('');
  const [audioFiles, setAudioFiles] = useState(initialAudioFiles);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(
    parseInt(localStorage.getItem('currentAudioIndex')) || 0
  );

  const uploadAudioHandler = () => {
    if (audioUpload === '') return;

    const data = new FormData();
    data.append("file", audioUpload);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "djib5oxng");
    data.append("resource_type", "audio");

    fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const newAudioFiles = [...audioFiles, { name: data.original_filename, url: data.url }];
        setAudioFiles(newAudioFiles);
        localStorage.setItem('audioList', JSON.stringify(newAudioFiles));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAudioClick = (index) => {
    setCurrentAudioIndex(index);
  };

  return (
    <div className='main'>
    <div className='card audio-player-card'>
    
      <input type='file' onChange={(e) => setAudioUpload(e.target.files[0])} />
      <button onClick={uploadAudioHandler}>Upload Audio</button>
      <AudioPlayer
        audioFiles={audioFiles}
        currentAudioIndex={currentAudioIndex}
        setCurrentAudioIndex={setCurrentAudioIndex}
      />
    </div>
    <div className='card'>
      <h3>My Playlist</h3>
      <ul className='audio-list'>
        {audioFiles.map((audio, index) => (
          <li key={index} onClick={() => handleAudioClick(index)}>
            {audio.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default App;




