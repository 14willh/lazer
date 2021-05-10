// deno-lint-ignore-file no-undef

// ANSI Color Codes
enum Color {
  reset = "\u001b[0m",
  red = "\u001b[31m",
  green = "\u001b[32m",
  yellow = "\u001b[33m",
  blue = "\u001b[34m",
  magenta = "\u001b[35m",
  cyan = "\u001b[36m",
}

class Printer {

  // Used to track state of calls to if/elseif/else()
  private printNext = true;
  private blockEntered = false;

  // used to track buffer mode
  private bufferString = '';
  private bufferMode = false;

  // Saved Buffers Map
  private static AliasedBufferMap = new Map<string, string>();

  constructor() {
    if (!this.echo) {
      throw new Error("Deno or Node.js needs to be installed to use Printer.");
    }
  }

  // @ts-ignore Work out Deno vs Node.js environment
  private echoInternal = (input?: string) => { try { return Deno.stdout.writeSync(new TextEncoder().encode(input))}catch(_e){ return process.stdout.write(input) } };
  
  private echo = (input?: string) => 
  {
    if(this.bufferMode)
    {
      if(input && input.length > 0)
      {
        this.bufferString += String(input);
      }
    }
    else 
    {
      this.echoInternal(input);
    }
  } 
  
  public if = (cond: boolean): Printer => {
    this.blockEntered = cond;
    this.printNext = cond;
    return this;
  };

  public elseif = (cond: boolean): Printer => {
    // previous if/elseif block was entered, skip this block
    if (this.blockEntered) {
      this.printNext = false;
      return this;
    }

    return this.if(cond);
  };

  public else = (): Printer => {
    return this.elseif(true);
  };

  // Reset state
  public end = () => {
    this.printNext = true;
    this.blockEntered = false;
    return this;
  };

  public buffer = (): Printer => 
  {
    this.bufferMode = true;
    return this;
  };

  public return = (): string => 
  {
    this.reset();
    return this.bufferString;
  };

  // Save current buffer as alias
  public store = (alias: string): Printer => 
  {
    if(this.bufferMode)
    {
      Printer.AliasedBufferMap.set(alias, this.bufferString);
    }
    return this;
  }
  // print a saved buffer alias (if it exists)
  public load = (alias: string): Printer => 
  {
    if(this.bufferMode)
    {
      const aliasedBuffer = Printer.AliasedBufferMap.get(alias);
      if(aliasedBuffer)
      {
        this.bufferString = aliasedBuffer;
      } 
    }
    return this;
  }

  public print = (...args: unknown[]): Printer => {
    if (!this.printNext) {
      return this;
    }

    const argString = args.reduce<string>((a, c, i) => {
      const isObject = typeof c === "object";
      const cString = isObject ? JSON.stringify(c, null, 4) : c;

      return i > 0 ? `${a} ${cString}` : `${a}${cString}`;
    }, "");

    this.echo(argString);

    return this;
  };
  public print_b = (): Printer => 
  {
    this.bufferMode = false;
    this.print(this.bufferString);
    this.reset();
    this.bufferMode = true;
    return this;
  }
  public print_color = (color: Color, ...args: unknown[]): Printer => {
    if (!this.printNext) {
      return this;
    }

    this.echo(color);
    this.print(...args);
    this.echo(Color.reset);

    return this;
  };
  public print_ln = (...args: unknown[]): Printer => this.print(...args, "\n");
  public print_color_ln = (color: Color, ...args: unknown[]): Printer => {
    if (!this.printNext) {
      return this;
    }

    this.print_color(color, ...args);
    return this.print_ln();
  };
  public print_red = (...args: unknown[]): Printer =>
    this.print_color(Color.red, ...args);
  public print_red_ln = (...args: unknown[]): Printer =>
    this.print_color_ln(Color.red, ...args);
  public print_green = (...args: unknown[]): Printer =>
    this.print_color(Color.green, ...args);
  public print_green_ln = (...args: unknown[]): Printer =>
    this.print_color_ln(Color.green, ...args);
  public print_yellow = (...args: unknown[]): Printer =>
    this.print_color(Color.yellow, ...args);
  public print_yellow_ln = (...args: unknown[]): Printer =>
    this.print_color_ln(Color.yellow, ...args);
  public print_blue = (...args: unknown[]): Printer =>
    this.print_color(Color.blue, ...args);
  public print_blue_ln = (...args: unknown[]): Printer =>
    this.print_color_ln(Color.blue, ...args);
  public print_magenta = (...args: unknown[]): Printer =>
    this.print_color(Color.magenta, ...args);
  public print_magenta_ln = (...args: unknown[]): Printer =>
    this.print_color_ln(Color.magenta, ...args);
  public print_cyan = (...args: unknown[]): Printer =>
    this.print_color(Color.cyan, ...args);
  public print_cyan_ln = (...args: unknown[]): Printer =>
    this.print_color_ln(Color.cyan, ...args);

  public print_space = (len = 1): Printer =>
    this.print(new Array(len + 1).join(" "));
  public print_utc_time = () => this.print(new Date().toUTCString());
  public print_pad_right = (
    str: string | number,
    len: number,
    delim = " ",
  ): Printer => {
    const padLen = len - String(str).length;
    if (padLen > 0) {
      return this.print(str + new Array(padLen + 1).join(delim));
    } else if (padLen < 0) {
      return this.print(
        String(str).slice(0, len - String(padLen).length) + `+${-padLen}`,
      );
    }
    return this.print(str);
  };
  public print_pad_left = (
    str: string | number,
    len: number,
    delim = " ",
  ): Printer => {
    const padLen = len - String(str).length;
    if (padLen > 0) {
      return this.print(new Array(padLen + 1).join(delim) + str);
    }
    return this.print(str);
  };

  public set_color = (color: Color): Printer => {
    if (!this.printNext) {
      return this;
    }

    this.echo(color);
    return this;
  };
  public reset = (): Printer => this.set_color(Color.reset);
  public set_color_red = (): Printer => this.set_color(Color.red);
  public set_color_green = (): Printer => this.set_color(Color.green);
  public set_color_yellow = (): Printer => this.set_color(Color.yellow);
  public set_color_blue = (): Printer => this.set_color(Color.blue);
  public set_color_magenta = (): Printer => this.set_color(Color.magenta);
  public set_color_cyan = (): Printer => this.set_color(Color.cyan);
}

// Enforce calling reset before starting new print chain
export const lazer = (...args: unknown[]) =>
  new Printer().reset().print(...args);
