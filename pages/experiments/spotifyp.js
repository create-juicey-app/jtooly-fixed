import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const clientId = 'a4e3c29ad1d941f99f0719db56bd873b';
const clientSecret = '5385510075864b50a41b593920a64fc2';
// im fucking going insane
const SpotifyPlayer = () => {
  const [song, setSong] = useState(null);
  const [time, setTime] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
          body: 'grant_type=client_credentials',
        });
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error(error);
      }
    };
    getToken();
  }, []);
    
  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      const fetchSong = async () => {
        try {
          const data = await spotifyApi.getMyCurrentPlaybackState();
          setSong(data.item);
          setTime(data.progress_ms);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSong();
    }
  }, [accessToken]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {song ? (
        <div>
          <img src={song.album.images[0].url} alt={song.name} />
          <h2>{song.name}</h2>
          <p>{song.artists[0].name}</p>
          <p>
            {formatTime(time)} / {formatTime(song.duration_ms)}
          </p>
        </div>
      ) : (
        <p>No song playing</p>
      )}
    </div>
  );
};

export default SpotifyPlayer;