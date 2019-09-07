import { assert } from 'chai';
import moment from 'moment';
import Task, { groupByDay } from './task';
import { DATE_FORMAT } from '../helpers/dateFormats';

describe('Task', () => {
  it('groups tasks by Day', () => {
    const now = moment();
    const yesterday = now.clone().subtract(1, 'day');
    const threeDaysAgo = now.clone().subtract(3, 'days');

    const tasksRaw = [
      {
        id: 1,
        name: 'Task 1',
        start: yesterday.clone().subtract(1, 'hours').toISOString(),
        end: yesterday.toISOString()
      },
      {
        id: 2,
        name: 'Task 2',
        start: now.clone().subtract(1, 'hours').toISOString(),
        end: now.toISOString()
      },
      {
        id: 3,
        name: 'Task 3',
        start: threeDaysAgo.clone().subtract(35, 'minutes').toISOString(),
        end: threeDaysAgo.toISOString()
      },
      {
        id: 4,
        name: 'Task 4',
        start: threeDaysAgo.clone().subtract(105, 'minutes').toISOString(),
        end: threeDaysAgo.toISOString()
      }
    ];
    const tasks = tasksRaw.map(t => new Task(t));
    const todayTasks = tasks.filter(t => t.id == 2);
    const yesterdayTasks = tasks.filter(t => t.id == 1);
    const threeDaysAgoTasks = tasks.filter(t => [3, 4].includes(t.id));

    const expectedGroupedTasks = {
      Today: { total: 3600000, tasks: todayTasks },
      Yesterday: { total: 3600000, tasks: yesterdayTasks },
      [threeDaysAgoTasks[0].end.format(DATE_FORMAT)]: { total: 8400000, tasks: threeDaysAgoTasks }
    };

    assert.deepStrictEqual(groupByDay(tasks), expectedGroupedTasks);
  });
});
