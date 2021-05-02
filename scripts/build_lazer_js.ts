const outDir = 'nodejs';

const duplicate = async () => 
{
    const p = Deno.run({
        cmd: ["cp", "lazer.ts", `${outDir}/index.ts`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const compile = async () => 
{
    const p = Deno.run({
        cmd: ["npx", "tsc", `${outDir}/index.ts`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const minify = async () => 
{
    const p = Deno.run({
        cmd: ["node", "scripts/js-minify.js", `${outDir}/index.js`, `${outDir}/index.js`],
    });
    const { code } = await p.status(); // (*1); wait here for child to finish
    p.close();
}

const cleanup = async () => 
{
    const p = Deno.run({
        cmd: ["rm", `${outDir}/index.ts`],
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