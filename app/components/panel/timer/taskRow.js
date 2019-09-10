import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import GreenButton from '../../greenButton/greenButton';
import { useInterval } from './timer';
import { HOURS_MINUTES_SECONDS, HOURS_MINUTES } from '../../../helpers/dateFormats';

export default function TaskRow({
  id,
  name,
  duration,
  start,
  end,
  updateEntryCallback,
  deleteEntryCallback
}) {
  const [chrono, setChrono] = React.useState(moment.utc(duration));
  const [isRunning, setIsRunning] = React.useState(false);

  function handleStartClick() {
    setIsRunning(true);
  }

  function handleStopClick() {
    const task = {
      id,
      end: start.add(+chrono).toISOString()
    };
    updateEntryCallback(task);
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
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        {start.format(HOURS_MINUTES)} - {end.format(HOURS_MINUTES)}
      </TableCell>
      <TableCell>{chrono.format(HOURS_MINUTES_SECONDS)}</TableCell>
      <TableCell>
        {isRunning ? (
          <Button color="secondary" variant="contained" onClick={handleStopClick}>
            Stop
          </Button>
        ) : (
          <GreenButton variant="contained" onClick={handleStartClick}>
            Continue
          </GreenButton>
        )}
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => deleteEntryCallback(id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

TaskRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  start: PropTypes.objectOf(moment).isRequired,
  end: PropTypes.objectOf(moment),
  updateEntryCallback: PropTypes.func.isRequired,
  deleteEntryCallback: PropTypes.func.isRequired
};
