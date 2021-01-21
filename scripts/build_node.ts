const compile = async () => 
{
    const p = Deno.run({
        cmd: ["npx", "tsc", "lazer.ts"],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const minify = async () => 
{
    const p = Deno.run({
        cmd: ["node", "scripts/js-minify.js", "lazer.js", "lazer.min.js"],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

// main
await compile();
await minify();