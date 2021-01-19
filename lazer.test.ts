import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts"
import { lazer } from "./lazer.ts";

const decorate_echo = (printer: any, context: { stdout: string }): void => 
{
    const orig = printer['echo'];
    printer['echo'] = (output: string) => 
    {
        context.stdout += output;
        return orig(output);
    }
}

Deno.test('Printer #if should print following statements when condition is true', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(true)
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
});

Deno.test('Printer #if should not print following statements when condition is false', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #elseif should print following statements when condition is true', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(false)
        .print_ln("this is false")
        .elseif(true)
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is false"), false);
    assertEquals(context.stdout.includes("this is true"), true);
});

Deno.test('Printer #elseif should not print following statements when a previous block has been entered', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(false)
        .print_ln("this is false if")
        .elseif(false)
        .print_ln("this is false elseif")
        .end();

    assertEquals(context.stdout.includes("this is false if"), false);
    assertEquals(context.stdout.includes("this is false elseif"), false);
});

Deno.test('Printer #elseif not should print following statements when condition is false', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #else should not print if previous if block entered', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #else should not print if previous if block entered', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false elseif")
        .else()
        .print_ln("this is false else")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false elseif"), false);
    assertEquals(context.stdout.includes("this is false else"), false);
});

Deno.test('Printer #else should not print if previous elseif block entered', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(false)
        .print_ln("this is false if")
        .elseif(true)
        .print_ln("this is true")
        .else()
        .print_ln("this is false else")
        .end();

    assertEquals(context.stdout.includes("this is false if"), false);
    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false else"), false);
});

Deno.test('Printer #else should print if previous if/elseif block not entered', () => 
{
    const printer = lazer();
    const context = { stdout: '' };
    decorate_echo(printer, context);

    printer
        .if(false)
        .print_ln("this is false if")
        .elseif(false)
        .print_ln("this is false elseif")
        .else()
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is false if"), false);
    assertEquals(context.stdout.includes("this is false elseif"), false);
    assertEquals(context.stdout.includes("this is true"), true);
});