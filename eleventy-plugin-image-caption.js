/********************************************************************
 * Image Caption shortcut
 * by John M. Wargo
 * Created July 21, 2026
 * 
 * This should automatically caption all of the image files on a 
 * page. Using sequential numbers, of course.
 ********************************************************************/

const isDev = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";

const captions = [];

var classStr;
var options = {};

const defaultConfig = {
    captionBold: true,
    captionClass: 'caption',
    captionLabel: 'Image'
};

function generateCaption(figureNumber, captionText) {
    return options.captionBold
        ? `<p${classStr}><strong>${options.captionLabel} ${figureNumber}: </strong>${captionText}</p>`
        : `<p${classStr}>${options.captionLabel} ${figureNumber}: ${captionText}</p>`;
}

function imageCaption(imagePath, captionText) {
    console.log(`[ImageCaption] "${imagePath}"`);
    const page = this.page.url; // get the current page URL
    // does the page's array exist in the captions?
    if (!captions[page]) {
        // then make a new entry for it
        captions[page] = [];
    }
    // append the caption to the captions array for the current page
    captions[page].push({ imagePath, captionText });
    // if we're in dev mode, just return generic text
    // to understand why, read the repo's readme file
    if (isDev) return generateCaption("#", captionText);
    return generateCaption(captions[page].length, captionText);
}

function imageReference(imagePath) {
    console.log(`[ImageReference] "${imagePath}"`);
    const page = this.page.url; // get the current page URL

    // Is the page in the captions array?
    if (!captions[page]) return "Invalid Reference";
    // does the image exist in the captions array for the current page? It should
    const figureNumber = captions[page].findIndex(image => image.imagePath === imagePath) + 1;
    if (figureNumber === 0) return "Unable to find caption for this image.";
    return `${options.captionLabel} ${figureNumber}`;
}

export default function (eleventyConfig, pluginOptions) {
    // populate the default options
    options = { ...defaultConfig, ...pluginOptions };
    // calculate the class string based on options
    classStr = options.captionClass.length > 0
        ? ` class="${options.captionClass}"`
        : "";

    // Add the shortcodes
    eleventyConfig.addLiquidShortcode('imageCaption', imageCaption);
    eleventyConfig.addLiquidShortcode('imageReference', imageReference);
}
