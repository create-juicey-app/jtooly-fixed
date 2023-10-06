import { Avatar, Stack, Grid, TextField, Typography } from "@mui/material";
import { MongoClient, ObjectId } from "mongodb";
import React, { useState, useEffect } from "react";

export default function UserPage({ user }) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/users/checkselfadmin");
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Stack>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            src={user.image}
            sx={{
              width: "20vh",
              height: "20vh",
              maxWidth: "200px",
              maxHeight: "200px",
              marginRight: 10,
            }}
          ></Avatar>
          <div>
            <Typography variant="h3">{user.name}</Typography>
            {isAdmin ? (
              <Typography variant="h6">{user.email}</Typography>
            ) : null}
          </div>
        </Grid>
        <TextField
          sx={{ marginTop: 5 }}
          label="Bio"
          multiline
          disabled
          rows={8}
          defaultValue="Default Value"
        ></TextField>
      </Stack>
    </div>
  );
}

export async function getServerSideProps(context) {
  const uri = process.env.MONGODB_URI;
  let client;
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    const userId = context.params.userId;
    const usersCollection = client.db("test").collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    console.log(user);

    return {
      props: {
        user: {
          ...user,
          _id: user._id.toString(),
        },
      },
    };
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    return { props: { user: null } };
  } finally {
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
