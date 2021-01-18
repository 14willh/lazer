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

/// @ts-ignore
const _echo = Deno ? (input?: string) => Deno.stdout.writeSync(new TextEncoder().encode(input)) : process ? process.stdout.write : undefined;
if(!_echo)
{
  throw new Error('Deno or Node.js needs to be installed to use Printer.');
}

class Printer {

  // Used to track state of calls to if/elseif/else()
  private print_next = true;
  private block_entered = false;

  public if = (cond: boolean): Printer => 
  {
    this.block_entered = cond;
    this.print_next = cond;
    return this;
  }

  public elseif = (cond: boolean): Printer => 
  {
    // previous if/elseif block was entered, skip this block
    if(this.block_entered)
    {
      this.print_next = false;
      return this;
    }
    
    return this.if(cond);
  }

  public else = (): Printer => 
  {
    return this.elseif(true);
  }

  // Reset state
  public end = () => 
  {
    this.print_next = true;
    this.block_entered = false;
    return this;
  }

  public print = (...args: any[]): Printer => {
    if(!this.print_next) 
      return this;

    const arg_string = args.reduce((a, c, i) => {
      const isObject = typeof c === "object";
      const c_string = isObject ? JSON.stringify(c, null, 4) : c;

      return i > 0 ? `${a} ${c_string}` : `${a}${c_string}`;
    }, "");

    _echo(arg_string);

    return this;
  };
  public print_color = (color: Color, ...args: any[]): Printer => {
    if(!this.print_next) 
      return this;
    
    _echo(color);
    this.print(...args);
    _echo(Color.reset);

    return this;
  };
  public print_ln = (...args: any[]): Printer => this.print(...args, "\n");
  public print_color_ln = (color: Color, ...args: any[]): Printer => {
    if(!this.print_next) 
      return this;

    this.print_color(color, ...args);
    return this.print_ln();
  };
  public print_red = (...args: any[]): Printer =>
    this.print_color(Color.red, ...args);
  public print_red_ln = (...args: any[]): Printer =>
    this.print_color_ln(Color.red, ...args);
  public print_green = (...args: any[]): Printer =>
    this.print_color(Color.green, ...args);
  public print_green_ln = (...args: any[]): Printer =>
    this.print_color_ln(Color.green, ...args);
  public print_yellow = (...args: any[]): Printer =>
    this.print_color(Color.yellow, ...args);
  public print_yellow_ln = (...args: any[]): Printer =>
    this.print_color_ln(Color.yellow, ...args);
  public print_blue = (...args: any[]): Printer =>
    this.print_color(Color.blue, ...args);
  public print_blue_ln = (...args: any[]): Printer =>
    this.print_color_ln(Color.blue, ...args);

  public print_space = (len = 1): Printer =>
    this.print(new Array(len + 1).join(" "));
  public print_utc_time = () => this.print(new Date().toUTCString());
  public print_pad_right = (
    str: string | number,
    len: number,
    delim = " ",
  ): Printer => {
    const pad_len = len - String(str).length;
    if (pad_len > 0) {
      return this.print(str + new Array(pad_len + 1).join(delim));
    } else if (pad_len < 0) {
      return this.print(
        String(str).slice(0, len - String(pad_len).length) + `+${-pad_len}`,
      );
    }
    return this.print(str);
  };
  public print_pad_left = (
    str: string | number,
    len: number,
    delim = " ",
  ): Printer => {
    const pad_len = len - String(str).length;
    if (pad_len > 0) {
      return this.print(new Array(pad_len + 1).join(delim) + str);
    }
    return this.print(str);
  };

  public set_color = (color: Color): Printer => {
    if(!this.print_next) 
      return this;

    _echo(color);
    return this;
  };
  public reset = (): Printer => this.set_color(Color.reset);
  public set_color_red = (): Printer => this.set_color(Color.red);
}

// Enforce calling reset before starting new print chain
export const lazer = (...args: any) => new Printer().reset().print(...args);
