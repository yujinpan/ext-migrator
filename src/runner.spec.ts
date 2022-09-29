import { runner } from '@/runner';

describe('runner', function () {
  it('should run tasks', async function () {
    let currentCount = 0;
    const task = jest.fn((count: number) => {
      currentCount = count;
    });
    const tasks = Array(100).fill(task);

    await runner(tasks, '123');

    expect(task).toBeCalledTimes(100);
    expect(task).toBeCalledWith('123');
    expect(currentCount).toBe('123');
  });

  it('should run tasks with rest', async function () {
    const tasks = Array(100).fill(
      jest.fn(() => {
        //
      }),
    );

    const time = Date.now();
    await runner(tasks, '123', 1);
    expect(Date.now() - time).toBeGreaterThan(100 * 20);
  });
});
