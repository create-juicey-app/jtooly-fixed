import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const clientId = "a4e3c29ad1d941f99f0719db56bd873b";
const clientSecret = "5385510075864b50a41b593920a64fc2";
const refreshToken = "AQBLTTf9tV4MjGLrLroHnQqRpNlPrHB1lgj48xWMdmhBFGdnR88191audmrHBc7tk8y1ulONxdFWns91NQ2dKB6Ri0q8okXfwkDCHOwnJ-raGDf4EGuNr5siA5UKpKdDTB2_ZZkS1oI3RJkCo8kSB41GsjUXYCTK9fitivxnBrH5e4jjRX4Y1nDi__b0tuCHPtO1jXelyBO6ydqtXGpphrvWE2DsyDOXlSLYOT1xpfqXvoU5SQkW";

//spotifyApi.setClientId(clientId);???
//spotifyApi.setClientSecret(clientSecret);
//spotifyApi.setRefreshToken(refreshToken);

//spotifyApi.refreshAccessToken().then(
//  function(data) {
//    console.log('The access token has been refreshed!');
//    spotifyApi.setAccessToken(data.body['access_token']);
//  },
//  function(err) {
//    console.log('Could not refresh access token', err);
//  }
//);