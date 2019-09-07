import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Day from './day';
import GreenButton from '../../greenButton';
import Task from '../../../models/task';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  taskInput: {
    paddingLeft: theme.spacing(1)
  }
}));

export default function Timer(tasks) {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container className={classes.taskInput} spacing={1} alignItems="center">
        <Grid item xs={9}>
          <TextField
            id="task-name"
            label="What are you working on?"
            // className={classes.textField} // TODO: Call API
            // value={values.name}
            // onChange={handleChange('name')}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1">0:00:00</Typography>
        </Grid>
        <Grid item xs={2}>
          <GreenButton variant="contained" className={classes.button}>
            Start
          </GreenButton>
        </Grid>
      </Grid>

      <Grid container direction="column">
        {tasks && Object.keys(tasks).map(t => <Day key={t} day={t} {...tasks[t]}></Day>)}
      </Grid>
    </Grid>
  );
}

Timer.propTypes = {
  tasks: PropTypes.objectOf(
    PropTypes.objectOf({
      day: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)).isRequired
    })
  )
};
