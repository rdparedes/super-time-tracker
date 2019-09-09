import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import GreenButton from '../../greenButton/greenButton';
import Task from '../../../models/task';
import {
  HOURS_MINUTES_SECONDS,
  HOURS_MINUTES,
  DAY_MONTH_YEAR,
  DATE_FORMAT
} from '../../../helpers/dateFormats';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
}));

function getFormattedDay(d) {
  const day = moment(d, DAY_MONTH_YEAR);
  const now = moment();
  const yesterday = now.clone().subtract(1, 'day');

  const taskIsToday = now.isSame(day, 'day');
  const taskWasYesterday = yesterday.isSame(day, 'day');
  return taskIsToday ? 'Today' : taskWasYesterday ? 'Yesterday' : day.format(DATE_FORMAT);
}

export default function Day({ day, total, tasks, deleteEntryCallback }) {
  const classes = useStyles();
  const formattedDay = getFormattedDay(day);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6">{formattedDay}</Typography>
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Typography variant="h6">{moment.utc(total).format(HOURS_MINUTES_SECONDS)}</Typography>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(t => (
          <TableRow key={t.id}>
            <TableCell>{t.name}</TableCell>
            <TableCell>
              {t.start.format(HOURS_MINUTES)} - {t.end.format(HOURS_MINUTES)}
            </TableCell>
            <TableCell>{moment.utc(t.duration).format(HOURS_MINUTES_SECONDS)}</TableCell>
            <TableCell>
              <GreenButton variant="contained">Continue</GreenButton>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteEntryCallback(t.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)).isRequired,
  deleteEntryCallback: PropTypes.func.isRequired
};
