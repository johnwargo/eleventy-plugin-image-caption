import imageCaptionPlugin from './eleventy-plugin-image-caption.js';

export default async function (eleventyConfig) {

	// load the plugin with all defaults
	eleventyConfig.addPlugin(imageCaptionPlugin);

	eleventyConfig.addPlugin(imageCaptionPlugin, {
		captionBold: true,
		captionLabel: "Image",
		captionClass: "doggie"
	});

	// eleventyConfig.addPlugin(imageCaptionPlugin, {
	// 	captionBold: true,
	// 	captionLabel: "Image",
	// 	captionClass: ""
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