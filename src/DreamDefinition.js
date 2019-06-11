import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; //, useTheme
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ReadMore from './ReadMore'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function shortenDefinition(def) {
  if (def.length > 270) {
    let shortDef = []
    def = def.split(" ")
    let i = 0
    while (shortDef.join(" ").length < 270) {
      shortDef.push(def[i])
      i++;
    }
    return shortDef.join(" ") + " ..."
  }else {
    return def
  }
}

const handleClick = (action, id) => {
  const change = action === "change"
  fetch(`http://localhost:3000/dream_tags/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({change_image: change, img_url: ""})
  })
}

function DreamDefinition(props) {
  const classes = useStyles();
  const {img_url, displayName, interpretation, id, tag_name} = props.selectedTerm
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={img_url}
        title={tag_name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {tag_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {interpretation.length <= 270 ?
              interpretation :
              <React.Fragment>
                {shortenDefinition(interpretation)} <ReadMore interpretation={interpretation} imgUrl={img_url} displayName={displayName}/>
              </React.Fragment>
            }
          </Typography>
          <Button onClick={() => handleClick("change", id)}>Find a new image</Button>
        </CardContent>
        <div className={classes.controls}>

        </div>
      </div>

    </Card>
  );
}

function mapStateToProps(state) {
  return {
    selectedTerm: state.selectedTerm,
  }
}

export default connect(mapStateToProps)(DreamDefinition);
