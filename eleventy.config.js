import imageCaptionPlugin from './eleventy-plugin-image-caption.js';

export default async function (eleventyConfig) {

  eleventyConfig.addPlugin(imageCaptionPlugin, {
		captionLabel: "Image",
		captionClass: "caption"
	});

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