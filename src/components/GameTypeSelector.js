import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {GameTypes} from "./GameType";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export const GameTypeSelector = ({setGameType}) => {
  return <Container className={"gametype-selector-container"}>
    <Grid container
          justify="center"
          spacing={3}>
      {GameTypes.map(gameType => <GameTypeCard
          key={gameType.name}
          gameType={gameType}
          setGameType={setGameType}/>)}
    </Grid>
  </Container>
};

const GameTypeCard = ({gameType, setGameType}) => {
  return <Grid item>
    <Card
        classes={{
          root: 'gametype-selector-card'
        }}>
      <CardActionArea onClick={() => setGameType(gameType)}>
        <CardMedia
            classes={{
              media: 'gametype-selector-card-media'
            }}
            component={"img"}
            image={"/images/" + gameType.imageFile}
            title={gameType.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {gameType.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {gameType.getCountries().length} countries
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
};