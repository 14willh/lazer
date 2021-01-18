import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts"
import { lazer } from "./lazer.ts";

// const get_mock_fn = (fn) => 
// {
//     const orig = fn;


// }

Deno.test('Printer #if should print following statements when condition is true', () => 
{
    const printer = lazer();
    const original_print_ln = printer.print_ln;

    let print_ln_called = false;
    printer.print_ln = (...args: any[]) => 
    {
        print_ln_called = printer['print_next'];
        return original_print_ln(...args);
    }

    printer
        .if(true)
        .print_ln("this is true")
        .end();

    assertEquals(print_ln_called, true);
});

Deno.test('Printer #if should not print following statements when condition is false', () => 
{
    const printer = lazer();
    const original_print_ln = printer.print_ln;

    let print_ln_called = false;
    printer.print_ln = (...args: any[]) => 
    {
        print_ln_called = printer['print_next'];
        return original_print_ln(...args);
    }

    printer
        .if(false)
        .print_ln("this is false")
        .end();

    assertEquals(print_ln_called, false);
});

Deno.test('Printer #elseif should print following statements when condition is true', () => 
{
    const printer = lazer();
    const original_print_ln = printer.print_ln;

    let print_ln_called = false;
    printer.print_ln = (...args: any[]) => 
    {
        print_ln_called = printer['print_next'];
        return original_print_ln(...args);
    }

    printer
        .if(false)
        .print_ln("this is false")
        .elseif(true)
        .print_ln("this is true")
        .end();

    assertEquals(print_ln_called, true);
});

Deno.test('Printer #elseif should not print following statements when a previous block has been entered', () => 
{
    const printer = lazer();
    const original_print_ln = printer.print_ln;

    let print_ln_called = false;
    printer.print_ln = (...args: any[]) => 
    {
        print_ln_called = printer['print_next'];
        return original_print_ln(...args);
    }

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false")
        .end();

    assertEquals(print_ln_called, false);
});

Deno.test('Printer #elseif not should print following statements when condition is false', () => 
{

});

Deno.test('Printer #else', () => 
{

});