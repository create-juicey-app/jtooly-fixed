import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
            import { useState } from 'react';
            import Card from '@mui/material/Card';
            import CardContent from '@mui/material/CardContent';
            import CardMedia from '@mui/material/CardMedia';
            import background from '@/public/afu.png';
function CardList() {
                const [cards, setCards] = useState(jsonData);

                return (
                    <div>
                        {cards.map((card) => (
                            <Card key={card.id} sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={card.imageUrl}
                                    alt={card.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            }



const jsonData = [
                {
                    id: 1,
                    title: 'Withered bonnie',
                    description: 'This is one of the leaders of the anti furries alliance',
                    imageUrl: '/afu.png',
                },
                {
                    id: 2,
                    title: 'Juicey',
                    description: 'This is Juicey, the friend of Withered bonnie',
                    imageUrl: 'data:image/png;base64,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',
                },
            ];



export default function SignInSide() {
  return (

      <Grid container component="main" sx={{ height: '100vh' }}>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url()`,
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              ANTI FURRIES UNITED
            </Typography>
            
            <Typography variant="body1">
              Fuck furries, they suck, they must disapear from this fucking planet
            </Typography>
            
            <Typography variant="body1">
            WE MUST FIGHT BROTHERS
            </Typography>
            
            <Typography component="h1" variant="h5">
              Heres the real AntiFurries !
            </Typography>
<CardList></CardList>




          </Box>
        </Grid>
      </Grid>
  );
}