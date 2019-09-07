import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Timer from './timer/timer';
import History from './history/history';
import Task, { groupByDay } from '../../models/task';
import { getTimeEntries } from '../../apiService';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box xs={2}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabPanel: {
    flexGrow: 1
  }
}));

export default function Panel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [groupedTasks, setGroupedTasks] = React.useState(null);
  const [taskList, setTaskList] = React.useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  React.useEffect(() => {
    async function fetchData() {
      const timeEntries = await getTimeEntries();
      const t = Object.values(timeEntries).map(e => new Task(e));
      setGroupedTasks(groupByDay(t));
      setTaskList(t)
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Timer" {...a11yProps(0)} />
        <Tab label="History" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <Timer {...groupedTasks} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <History tasks={taskList} />
      </TabPanel>
    </div>
  );
}
