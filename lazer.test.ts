import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts"
import { lazer } from "./lazer.ts";

const decorate_echo = (printer: any): { stdout: string } => 
{
    const context = { stdout: '' }
    const orig = printer['echo'];
    printer['echo'] = (output: string) => 
    {
        context.stdout += output;
        return orig(output);
    }

    return context;
}

// Printer #if
Deno.test('Printer #if should print following statements when condition is true', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);
    
    printer
        .if(true)
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
});

Deno.test('Printer #if should not print following statements when condition is false', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #if should print all statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), true);
    assertEquals(context.stdout.includes("this is true 2"), true);
    assertEquals(context.stdout.includes("this is true 3"), true);
});

Deno.test('Printer #if should print no statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), false);
    assertEquals(context.stdout.includes("this is true 2"), false);
    assertEquals(context.stdout.includes("this is true 3"), false);
});

// Printer #elseif
Deno.test('Printer #elseif should print following statements when condition is true', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

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
    const context = decorate_echo(printer);

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
    const context = decorate_echo(printer);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #elseif should print all statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .elseif(true)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), true);
    assertEquals(context.stdout.includes("this is true 2"), true);
    assertEquals(context.stdout.includes("this is true 3"), true);
});

Deno.test('Printer #elseif should print no statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .elseif(false)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), false);
    assertEquals(context.stdout.includes("this is true 2"), false);
    assertEquals(context.stdout.includes("this is true 3"), false);
});

// Printer #else
Deno.test('Printer #else should not print if previous if block entered', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

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
    const context = decorate_echo(printer);

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
    const context = decorate_echo(printer);

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
    const context = decorate_echo(printer);

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

Deno.test('Printer #else should print all statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .else()
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), true);
    assertEquals(context.stdout.includes("this is true 2"), true);
    assertEquals(context.stdout.includes("this is true 3"), true);
});

Deno.test('Printer #else should print no statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .else()
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), false);
    assertEquals(context.stdout.includes("this is true 2"), false);
    assertEquals(context.stdout.includes("this is true 3"), false);
});