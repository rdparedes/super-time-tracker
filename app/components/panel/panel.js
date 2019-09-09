import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Timer from './timer/timer';
import History from './history/history';
import TabPanel from './tabPanel';
import Task, { groupByDay } from '../../models/task';
import { getTimeEntries, postTimeEntry } from '../../apiService';

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
  const [groupedTasks, setGroupedTasks] = React.useState({});
  const [taskList, setTaskList] = React.useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function updateTasks(data) {
    const t = Object.values(data).map(e => new Task(e));
    setGroupedTasks(groupByDay(t));
    setTaskList(t);
  }

  React.useEffect(() => {
    async function fetchData() {
      const timeEntries = await getTimeEntries();
      updateTasks(timeEntries);
    }
    fetchData();
  }, []);

  const addEntry = React.useCallback(async entry => {
    const updatedEntries = await postTimeEntry(entry);
    updateTasks(updatedEntries);
  });

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
        <Timer addEntryCallback={addEntry} tasks={groupedTasks} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <History tasks={taskList} />
      </TabPanel>
    </div>
  );
}
