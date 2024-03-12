import React, { useEffect, useState } from "react";

const AudioPlayer = ({ audioFiles, currentAudioIndex, setCurrentAudioIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById("audioPlayer");

    // Set the source when the current audio index changes
    audioElement.src = audioFiles[currentAudioIndex].url;

    // Listen for audio end to play the next track
    audioElement.addEventListener("ended", () => {
      if (currentAudioIndex < audioFiles.length - 1) {
        setCurrentAudioIndex(currentAudioIndex + 1);
      } else {
        setCurrentAudioIndex(0);
      }
    });

    // cleanup on unmounted phase
    return () => {
      audioElement.pause();
      audioElement.removeEventListener("ended", () => {});
    };
  }, [currentAudioIndex, audioFiles, setCurrentAudioIndex]);

  const togglePlayPause = () => {
    const audioElement = document.getElementById("audioPlayer");

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
  

    <div className="nowplaying-div">
      <h3 className="now-playing-text">Now Playing: {audioFiles[currentAudioIndex].name}</h3>

  <div className="audio-instance">
    <audio id="audioPlayer" controls onEnded={() => setIsPlaying(false)}>
      <source src={audioFiles[currentAudioIndex].url} type="audio/mp3" />
      Your browser does not support the audio tag.
    </audio>
  </div>

</div>

  );
};

export default AudioPlayer;

