import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Task from '../../../models/task';
import { HOURS_MINUTES_SECONDS, DAY_MONTH_YEAR, DATE_FORMAT } from '../../../helpers/dateFormats';
import TaskRow from './taskRow';

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

export default function Day({ day, total, tasks, updateEntryCallback, deleteEntryCallback }) {
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
          <TaskRow
            key={t.id}
            {...t}
            updateEntryCallback={updateEntryCallback}
            deleteEntryCallback={deleteEntryCallback}
          />
        ))}
      </TableBody>
    </Table>
  );
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)).isRequired,
  updateEntryCallback: PropTypes.func.isRequired,
  deleteEntryCallback: PropTypes.func.isRequired
};
