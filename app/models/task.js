import moment from 'moment';
import { DAY_MONTH_YEAR } from '../helpers/dateFormats';

export default class Task {
  constructor({ id, name, start, end }) {
    this.id = id;
    this.name = name;
    this.start = moment.utc(start);
    this.end = moment.utc(end);
    this.duration = this.end.diff(this.start); // in milliseconds
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
  return tasks.reduce((groupedTasks, task) => {
    const day = task.end.format(DAY_MONTH_YEAR);
    groupedTasks[day] = getUpdatedDay(groupedTasks, day, task);
    return groupedTasks;
  }, {});
}
