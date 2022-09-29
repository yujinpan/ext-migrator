import * as readline from 'readline';

/**
 * Progress
 *
 * @example
 * const progress = new Promise();
 * progress.tick('do something ...');
 */
export class Progress {
  private total: number;
  private readonly title: string;
  private readonly endMsg: string;
  private readonly stream: NodeJS.WriteStream;

  value = 0;

  constructor(
    options: {
      total?: number;
      title?: string;
      endMsg?: string;
      stream?: NodeJS.WriteStream;
    } = {},
  ) {
    this.total = options.total || 100;
    this.title = options.title;
    this.endMsg = options.endMsg;
    this.stream = options.stream || process.stdout;
  }

  setTotal(total: number) {
    this.total = total;
  }

  tick(msg = '', value = this.value + 1) {
    this.value = value;
    if (this.value === this.total) {
      this.clear();

      if (this.endMsg) {
        this.stream.write(this.endMsg);
      }
    } else {
      this.write(msg);
    }
  }

  private write(msg: string) {
    this.clear();

    this.stream.write(
      `${this.title ? this.title + ' ' : ''}(${this.value}/${
        this.total
      }) ${msg}`,
    );
  }

  private clear() {
    readline.cursorTo(this.stream, 0, 0);
    readline.clearLine(this.stream, 1);
  }
}
