# Eleventy Plugin Image Caption

> [!WARNING]
> Work in progress, not ready for public consumption.

<!-- TOC -->

- [Eleventy Plugin Image Caption](#eleventy-plugin-image-caption)
  - [Background](#background)
  - [Examples](#examples)
  - [Limitations](#limitations)
    - [One Image](#one-image)
    - [Serve Mode](#serve-mode)
  - [Installation](#installation)
  - [Plugin Configuration](#plugin-configuration)
  - [Usage](#usage)

<!-- /TOC -->

Eleventy (11ty) plugin that adds two shortcodes to a site:

| Shortcode        | Description  | 
| ---------------- | ------------------------------------ |
| `captionedImage` | Returns an automatically numbered image caption like "Figure 1: A boy with a dog" The shortcode automatically assigns the image/figure number based on an image file's position on the page (top to bottom). | 
| `imageReference` | Returns a text string that references a particular image by number like "Figure 2". |

## Background

I've always loved the Microsoft Word features that allow you to add an auto numbering caption to an embedded image or table then reference the caption elsewhere in the document. This is something you could do to any Word document manually, but with these features, the numbers and references update automatically whenever you move images around or add new images to the document.

While working on a new Eleventy site, I realized that I wanted the same capability in Eleventy. This particular site will host a lot of tutorials and product reviews, so being able to easily reference image captions in a post was key to readability.

## Examples

This repository includes a complete Eleventy site that demonstrates the functionality exposed through the plugin; you can access the site on [Netlify](https://eleventy-plugin-image-caption.netlify.app/).

Here's an example of a simple caption added to an image using the `captionedImage` shortcode. Its the first image in the file, so the plugin automatically numbers it with a 1.

![Example 1](/images/example-01.png)

When you invoke the shortcode, you give it the file path pointing to the image plus the text added to the caption and the plugin handles the rest.

The next example highlights referencing an image in the post image number/reference using the `imageReference` shortcode.

![Example 2](/images/example-02.png)

When you invoke the shortcode, you give it the file path pointing to the image and the plugin handles the rest.

## Limitations

Before we get too deep into the technical details of the plugin, its important to note two limitations.

### One Image 

`imageReference` won't work correctly if you use the same image on the page twice. Remember, the shortcode takes the file path of the image you want to reference. If you display the same image more than one time on the page, the plugin won't know which instance you're referring to. 

Resolution: Copy the image to a different/second file name if you want to do this. 

My long term goal is to allow you to pass an instance parameter to the shortcode to identify which version of the you image intend to reference.

### Serve Mode

When running the site included with this plugin on your local development workstation (starting the Eleventy server with the `--serve` parameter), you'll notice that the captions don't show the image number in the caption.

![Example 3](/images/example-03.png)

This is... on purpose. As I coded the plugin, I realized that when I run the server in development mode, every time I save the project and the page refreshes in the browser, the assigned image numbers incremented. This means that they'd be accurate and I made the decision to essentially disable auto numbering in development mode, instead showing a `#` to represent the image number.

When you publish the site on a server or run you run a local build and look in the project's `_site` folder, you'll see that the captions number as expected.

## Installation

To install the plugin, open a terminal window or command prompt, navigate to an Eleventy project folder, and execute the following command:

```
npm i eleventy-plugin-image-caption
```

## Plugin Configuration

| Configuration Option | Description  | 
| -------------------- | ------------ |
| `captionBold`        | Default: `true`  |
| `captionLabel`       | Default: `Image` |
| `captionLabel`       | Default:  `caption` |



```js
import imageCaptionPlugin from 'eleventy-plugin-image-caption';
```

```js
eleventyConfig.addPlugin(imageCaptionPlugin);
```

```js
eleventyConfig.addPlugin(imageCaptionPlugin, {
  captionBold: true,
  captionLabel: "Image",
  captionClass: "caption"
});
```

```js
import imageCaptionPlugin from './eleventy-plugin-image-caption.js';

export default async function (eleventyConfig) {

  eleventyConfig.addPlugin(imageCaptionPlugin, {
		captionBold: true,
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
```


## Usage






`imageReference` only works for references after the image.

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
