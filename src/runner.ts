export function runner<P = any, Task extends (params?: P) => any = () => any>(
  tasks: Task[],
  params?: P,
  perCount = 50,
) {
  return tasks.reduce(
    (prev, next, currentIndex) =>
      prev.finally(() =>
        currentIndex && currentIndex % perCount === 0
          ? new Promise((resolve) =>
              setTimeout(() => resolve(next(params)), 20),
            )
          : Promise.resolve(next(params)),
      ),
    Promise.resolve(),
  );
}
