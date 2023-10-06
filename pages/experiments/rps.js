import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";

import io from "socket.io-client";
const socket = io("http://196.148.141.88.rev.sfr.net:3001");

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    socket.on("choice", ({ ipAddress, choice }) => {
      setChoices((prevChoices) => [...prevChoices, { ipAddress, choice }]);
    });
  }, []);
  useEffect(() => {
    socket.on("result", (result) => {
      setResult(result);
    });

    return () => {
      socket.off("result");
    };
  }, []);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    socket.emit("choice", choice);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setResult(null);
  };

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
            Make your choice:
          </Typography>
          <Button
            variant="contained"
            onClick={() => handlePlayerChoice("rock")}
          >
            Rock
          </Button>
          <Button
            variant="contained"
            onClick={() => handlePlayerChoice("paper")}
          >
            Paper
          </Button>
          <Button
            variant="contained"
            onClick={() => handlePlayerChoice("scissors")}
          >
            Scissors
          </Button>
        </Grid>
        <Grid item>
          {choices.map(({ ipAddress, choice }, index) => (
            <div key={index}>
              <p>IP Address: {ipAddress}</p>
              <p>Choice: {choice}</p>
            </div>
          ))}
        </Grid>

        <Grid item>
          {playerChoice && result && (
            <div>
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Result:
              </Typography>
              <Typography variant="body1">You chose: {playerChoice}</Typography>
              <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                {result}
              </Typography>
              <Button
                variant="contained"
                onClick={resetGame}
                sx={{ marginTop: "1rem" }}
              >
                Play Again
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
