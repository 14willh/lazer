const duplicate = async () => 
{
    const p = Deno.run({
        cmd: ["cp", "lazer.ts", `lazer-js.ts`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const compile = async () => 
{
    const p = Deno.run({
        cmd: ["npx", "tsc", `lazer-js.ts`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const minify = async () => 
{
    const p = Deno.run({
        cmd: ["node", "scripts/js-minify.js", `lazer-js.js`, `lazer-js.js`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const cleanup = async () => 
{
    const p = Deno.run({
        cmd: ["rm", `lazer-js.ts`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

// main
await Deno.mkdir(outDir, { recursive: true });
await duplicate();
await compile();
await minify();
await cleanup();
