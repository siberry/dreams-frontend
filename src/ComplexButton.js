import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // minWidth: 300,
    // width: '100%',
  },
  image: {
    position: 'relative',
    height: 225,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      // height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function ComplexButton(props) {
  const classes = useStyles();
  let {displayName, interpretation, id, img_url} = props
  img_url = img_url && img_url.length > 0 ? img_url : "https://d32dm0rphc51dk.cloudfront.net/y-A5_Pp8nxYiCor6mwkUKg/square.jpg"

  return (
    <div className={classes.root}>
    <Grid item xs={12}>
        <ButtonBase
          focusRipple
          key={props.tagname}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%',
          }}
          onClick={() => props.setClickedTerm({displayName, interpretation, id, img_url})}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${img_url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {props.tag_name}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
    </Grid>
    </div>
  );
}
