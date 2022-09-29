import * as readline from 'readline';

/**
 * Progress
 *
 * @example
 * const progress = new Promise();
 * progress.tick('do something ...');
 */
export class Progress {
  private readonly total: number;
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
    this.stream = options.stream || process.stderr;
  }

  tick(msg = '', value = this.value + 1) {
    this.value = value;
    this.write(msg);
    if (this.value === this.total && this.endMsg) {
      this.stream.write('\n');
      this.stream.write(this.endMsg);
    }
  }

  private write(msg: string) {
    readline.cursorTo(this.stream, 0);
    readline.clearLine(this.stream, 1);

    this.stream.write(
      `${this.title ? this.title + ' ' : ''}(${this.value}/${
        this.total
      }) ${msg}`,
    );
  }
}
