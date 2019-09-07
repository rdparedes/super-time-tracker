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
import { HOURS_MINUTES_SECONDS, HOURS_MINUTES, DAY_MONTH_YEAR } from '../../../helpers/dateFormats';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
}));

export default function History({ tasks }) {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Date</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Time</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Duration</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Task</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks &&
          tasks.map(t => (
            <TableRow key={t.id}>
              <TableCell>{t.end.format(DAY_MONTH_YEAR)}</TableCell>
              <TableCell>
                {t.start.format(HOURS_MINUTES)} - {t.end.format(HOURS_MINUTES)}
              </TableCell>
              <TableCell>{moment.utc(t.duration).format(HOURS_MINUTES_SECONDS)}</TableCell>
              <TableCell>{t.name}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

History.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task))
};
