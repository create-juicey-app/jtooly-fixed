import { Button, Typography } from "@mui/material";

export default function Home() {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Include any data you want to send to the server
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography>Next.js Page</Typography>
      <Button onClick={fetchData}>Fetch Data from Python Server</Button>
    </div>
  );
}
