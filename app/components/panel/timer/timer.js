import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Day from './day';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GreenButton from '../../greenButton/greenButton';
import {
  HOURS_MINUTES_SECONDS,
  FULL_DATE_FORMAT,
  DAY_MONTH_YEAR
} from '../../../helpers/dateFormats';

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

function sortTasks(t) {
  const sortedTasks = {};
  Object.keys(t)
    .sort((a, b) => moment(a, DAY_MONTH_YEAR) < moment(b, DAY_MONTH_YEAR))
    .forEach(key => (sortedTasks[key] = t[key]));
  return sortedTasks;
}

export function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Timer({
  tasks,
  addEntryCallback,
  updateEntryCallback,
  deleteEntryCallback
}) {
  const classes = useStyles();
  const sortedTasks = sortTasks(tasks);

  const [taskName, setTaskName] = React.useState('');
  const [chrono, setChrono] = React.useState(moment.utc(0));
  const [isRunning, setIsRunning] = React.useState(false);
  const [textFieldIsDisabled, setTextFieldIsDisabled] = React.useState(false);

  function handleStartClick() {
    if (taskName) {
      setIsRunning(true);
      setTextFieldIsDisabled(true);
    } else {
      alert('First, you have to name your task.');
    }
  }

  function handleStopClick() {
    const now = moment.utc(Date(), FULL_DATE_FORMAT);
    const task = {
      name: taskName,
      start: moment(now.diff(chrono)).toISOString(),
      end: now.toISOString()
    };
    addEntryCallback(task);
    setTaskName('');
    setTextFieldIsDisabled(false);
    setChrono(moment.utc(0));
    setIsRunning(false);
  }

  useInterval(
    () => {
      chrono.add(1, 'second');
      setChrono(chrono.clone());
    },
    isRunning ? 1000 : null
  );

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container className={classes.taskInput} spacing={1} alignItems="center">
        <Grid item xs={9}>
          <TextField
            id="task-name"
            label="What are you working on?"
            value={taskName}
            onChange={event => setTaskName(event.target.value)}
            disabled={textFieldIsDisabled}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1">{chrono.format(HOURS_MINUTES_SECONDS)}</Typography>
        </Grid>
        <Grid item xs={2}>
          {isRunning ? (
            <Button
              color="secondary"
              variant="contained"
              className={classes.button}
              onClick={handleStopClick}
            >
              Stop
            </Button>
          ) : (
            <GreenButton variant="contained" className={classes.button} onClick={handleStartClick}>
              Start
            </GreenButton>
          )}
        </Grid>
      </Grid>

      <Grid container direction="column">
        {sortedTasks &&
          Object.keys(sortedTasks).map(t => (
            <Day
              key={t}
              day={t}
              {...sortedTasks[t]}
              updateEntryCallback={updateEntryCallback}
              deleteEntryCallback={deleteEntryCallback}
            ></Day>
          ))}
      </Grid>
    </Grid>
  );
}

Timer.propTypes = {
  tasks: PropTypes.object,
  addEntryCallback: PropTypes.func.isRequired,
  updateEntryCallback: PropTypes.func.isRequired,
  deleteEntryCallback: PropTypes.func.isRequired
};
