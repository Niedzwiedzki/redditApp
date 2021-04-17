import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& > .MuiCircularProgress-root': {
          width: "8rem!important",
          height: "8rem!important"

      }
    },
  }));

const Spinner = props => {
  
    const classes = useStyles();
    if (props.loading){
      return (
        <div className="spinner">
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </div>
        );
    } else {
      return null
    }

}

export default Spinner;