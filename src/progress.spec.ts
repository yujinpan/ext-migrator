import { Progress } from '@/progress';
import { runner } from '@/runner';

describe('progress', () => {
  it('should tick', async function () {
    const total = 100;
    const progress = new Progress({ total, title: '[ext-migrator]' });
    const tasks: (() => any)[] = [];
    for (let i = 0; i < total; i++) {
      tasks.push(() => progress.tick(i + '...'));
    }
    await runner(tasks, undefined, 1);
    expect(progress.value).toBe(total);
  });
});
