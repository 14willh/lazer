declare enum Color {}

declare class Printer 
{
    public if(cond: boolean): Printer;
    public elseif(cond: boolean): Printer;
    public else(): Printer;
    public end(): Printer;

    public print(...args: unknown[]): Printer;
    public print_color(color: Color): Printer;
    public print_ln(...args: unknown[]): Printer;
}