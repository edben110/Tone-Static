module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/js/tone-static/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/55f92_c01ec35b._.js",
  "build/chunks/[root-of-the-server]__509ac410._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/js/tone-static/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];