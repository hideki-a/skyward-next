import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import filters from './utils/filters.js';

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyVitePlugin, {
        viteOptions: {
            publicDir: 'public',
            clearScreen: false,
            css: {
                preprocessorOptions: {
                    scss: {
                        api: "modern-compiler",
                    },
                },
            },
            server: {
                mode: 'development',
                middlewareMode: true,
            },
            build: {
                mode: 'production',
                manifest: false,
                modulePreload: { polyfill: false },
                rollupOptions: {
                    output: {
                        assetFileNames: 'assets/css/main.[hash].css',
                        chunkFileNames: 'assets/js/[name].[hash].js',
                        entryFileNames: 'assets/js/[name].[hash].js',
                    },
                },
            },
        },
    });

    eleventyConfig.addGlobalData('permalink', () => {
        return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    eleventyConfig.addPassthroughCopy('src/assets/css');
    eleventyConfig.addPassthroughCopy('src/assets/js');
    eleventyConfig.addPassthroughCopy('public');

    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName]);
    });

    return {
        templateFormats: ['njk', 'html'],
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data',
        },
    }
}
