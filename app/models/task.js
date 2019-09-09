import moment from 'moment';
import { DATE_FORMAT } from '../helpers/dateFormats';

export default class Task {
  constructor({ id, name, start, end }) {
    this.id = id;
    this.name = name;
    this.start = moment.utc(start);
    this.end = moment.utc(end);
    this.duration = this.end.diff(start); // in milliseconds
  }
}

function getUpdatedDay(group, day, task) {
  if (day in group) {
    return {
      ...group[day],
      total: group[day].total + task.duration,
      tasks: [...group[day].tasks, task]
    };
  }
  return { total: task.duration, tasks: [task] };
}

export function groupByDay(tasks) {
  const now = moment();
  const yesterday = now.clone().subtract(1, 'day');

  return tasks.reduce((groupedTasks, task) => {
    const taskIsToday = now.isSame(task.end, 'day');
    const taskWasYesterday = yesterday.isSame(task.end, 'day');
    const day = taskIsToday
      ? 'Today'
      : taskWasYesterday
      ? 'Yesterday'
      : task.end.format(DATE_FORMAT);
    groupedTasks[day] = getUpdatedDay(groupedTasks, day, task);
    return groupedTasks;
  }, {});
}
