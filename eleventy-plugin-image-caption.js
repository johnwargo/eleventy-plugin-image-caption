/********************************************************************
 * Image Caption shortcut
 * by John M. Wargo
 * Created July 21, 2026
 * 
 * This should automatically caption all of the image files on a 
 * page. Using sequential numbers, of course.
 ********************************************************************/

// TODO: add support for selecting which version of an image you want to refer to

const DEFAULT_CAPTION_BOLD = true;
const DEFAULT_CAPTION_CLASS = "caption";
const DEFAULT_CAPTION_LABEL = "Figure";

const isDev = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";

const captions = [];

var captionBold;
var captionClass;
var captionLabel;

function captionedImageShortcode(imagePath, captionText) {
    const SHORTCODE_NAME = 'ImageCaption';
    var classStr;

    console.log(`[${SHORTCODE_NAME}] "${imagePath}"`);
    const page = this.page.url; // get the current page URL

    // does the page's array exist in the captions?
    if (!captions[page]) {
        // then make a new entry for it
        captions[page] = [];
    }
    // append the caption to the captions array for the current page
    captions[page].push({ imagePath, captionText });

    classStr = captionClass.length > 0
        ? ` class="${captionClass}"`
        : "";

    // if we're in dev mode, just return generic text
    // to understand why, read the repo's readme file
    if (isDev) return captionBold
        ? `<p${classStr}><strong>${captionLabel} #: </strong>${captionText}</p>`
        : `<p${classStr}>${captionLabel} #: ${captionText}</p>`;

    const figureNumber = captions[page].length;
    return captionBold
        ? `<p${classStr}><strong>${captionLabel} ${figureNumber}: </strong>${captionText}</p>`
        : `<p${classStr}>${captionLabel} ${figureNumber}: ${captionText}</p>`;
}

function imageReferenceShortcode(imagePath) {
    const SHORTCODE_NAME = 'ImageReference';
    console.log(`[${SHORTCODE_NAME}] "${imagePath}"`);
    const page = this.page.url; // get the current page URL

    // Is the page in the captions array?
    if (!captions[page]) {
        // too early to reference images
        return "Invalid Reference";
    }
    const figureNumber = captions[page].findIndex(image => image.imagePath === imagePath) + 1;
    if (figureNumber === 0) return "Unable to find caption for this image.";
    return `${captionLabel} ${figureNumber}`;
}

export default function (eleventyConfig, options) {
    // populate our default options
    captionBold = options?.captionBold ?? DEFAULT_CAPTION_BOLD;
    captionClass = options?.captionClass || DEFAULT_CAPTION_CLASS;
    captionLabel = options?.captionLabel || DEFAULT_CAPTION_LABEL;
bah
    console.log(`Caption Class: ${captionClass}`);

    // Add the shortcodes
    eleventyConfig.addLiquidShortcode('captionedImage', captionedImageShortcode);
    eleventyConfig.addLiquidShortcode('imageReference', imageReferenceShortcode);
}
