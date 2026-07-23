import imageCaptionPlugin from './eleventy-plugin-image-caption.js';

export default async function (eleventyConfig) {

	// load the plugin with all defaults
	eleventyConfig.addPlugin(imageCaptionPlugin);

	// load some options different from the default
	// Not passing a `captionClass` value defaults to the default
	// eleventyConfig.addPlugin(imageCaptionPlugin, {
	// 	captionBold: false,
	// 	captionLabel: "Figure"
	// });

	// Use a different class for the image paragraph
	// eleventyConfig.addPlugin(imageCaptionPlugin, {
	// 	captionBold: false,
	// 	captionClass: "ImageCaption"
	// });

	eleventyConfig.addPassthroughCopy("src/assets/");
	eleventyConfig.addPassthroughCopy("src/images/");

	return {
		dir: {
			input: 'src',
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data"
		}
	}

};