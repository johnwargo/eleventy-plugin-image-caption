# Eleventy Plugin Image Caption

<!-- TOC -->

- [Eleventy Plugin Image Caption](#eleventy-plugin-image-caption)
  - [Background](#background)
  - [Examples](#examples)
  - [Limitations](#limitations)
    - [Single Image](#single-image)
    - [Serve Mode](#serve-mode)
    - [Image Reference Position](#image-reference-position)
  - [Installation](#installation)
  - [Plugin Configuration](#plugin-configuration)
  - [Usage](#usage)
    - [imageCaption](#imagecaption)
    - [imageReference](#imagereference)

<!-- /TOC -->

---

An Eleventy (11ty) plugin that adds two shortcodes to a site:

| Shortcode        | Description  | 
| ---------------- | ------------------------------------ |
| `imageCaption` | Returns an automatically numbered image caption like "Figure 1: A boy with a dog" The shortcode automatically assigns the image/figure number based on an image file's position on the page (top to bottom). | 
| `imageReference` | Returns a text string that references a particular image by number like "Figure 2". |

See the plugin in action on the [demo site](https://eleventy-plugin-image-caption.netlify.app/) included in this repository.

## Background

I've always loved the Microsoft Word features that allow you to add an auto numbering caption to an embedded image or table then reference the caption elsewhere in the document. This is something you could do to any Word document manually, but with these features, the numbers and references update automatically whenever you move images around or add new images to the document.

While working on a new Eleventy site, I realized that I wanted the same capability in Eleventy. This particular site will host a lot of tutorials and product reviews, so being able to easily reference image captions in a post was key to readability.

## Examples

This repository includes a complete Eleventy site that demonstrates the functionality exposed through the plugin; you can access the site on [Netlify](https://eleventy-plugin-image-caption.netlify.app/).

Here's an example of a simple caption added to an image using the `captionedImage` shortcode. The shortcut adds a paragraph with the text "Image 1: Dog with Flower" shown in the following figure. Its the first image in the file, so the plugin automatically numbers it with a 1.

![Example 1](/images/example-01.png)

When you invoke the shortcode, you give it the file path pointing to the image plus the text added to the caption and the plugin handles the rest.

The next example highlights referencing an image in the post image number/reference using the `imageReference` shortcode.

![Example 2](/images/example-02.png)

When you invoke the shortcode, you give it the file path pointing to the image and the plugin handles the rest.

## Limitations

Before we get too deep into the technical details of the plugin, its important to note two limitations.

### Single Image

`imageReference` won't work correctly if you use the same image on the page twice. Remember, the shortcode takes the file path of the image you want to reference. If you display the same image more than one time on the page, the plugin won't know which instance you're referring to. 

Resolution: Copy the image to a different/second file name if you want to do this. 

My long term goal is to allow you to pass an instance parameter to the shortcode to identify which version of the you image intend to reference.

### Serve Mode

When running the site included with this plugin on your local development workstation (starting the Eleventy server with the `--serve` parameter), you'll notice that the captions don't show the image number in the caption.

![Example 3](/images/example-03.png)

This is...deliberate (on purpose). As I coded the plugin, I realized that when I run the server in development mode, every time I save the project and the page refreshes in the browser, the assigned image numbers incremented. This means that they'd be accurate and I made the decision to essentially disable auto numbering in development mode, instead showing a `#` to represent the image number.

When you publish the site on a server or run you run a local build and look in the project's `_site` folder, you'll see that the captions number as expected.

### Image Reference Position

A page must add a caption an image using the `imageCaption` shortcode before you can use the `imageReference` shortcode to reference it. Its the process of adding the image to the page that creates the index used by `imageReference` to lookup the image number.

This is a side effect of how I coded the plugin. I'm not happy with this limitation, so I plan on refactoring the code to get around it. I'm not sure if I can do it, but I will try to figure it out.

## Installation

To install the plugin, open a terminal window or command prompt, navigate to an Eleventy project folder, and execute the following command:

```
npm i eleventy-plugin-image-caption
```

## Plugin Configuration

The plugin supports a few configuration options that allow you to configure the plugin's behavior. 

| Configuration Option | Description  | 
| -------------------- | ------------ |
| `captionBold`        | Boolean value that controls whether the caption text ("Image #:" or "Figure #:") is bold (HTML `strong`).<br />Default: `true`.  |
| `captionClass`       | String value that specifies the class name added to the <br />Default: `caption`. |
| `captionLabel`       | String value that specifies the text label prepended to the caption.<br />Default: `Image`. |

As with any Eleventy Plugin, to use it you must import it into your project's configuration file (mine is `.eleventy.config.js`):

```js
import imageCaptionPlugin from 'eleventy-plugin-image-caption';
```

Then, within the exported function in the configuration file, add the plugin to the Eleventy configuration. The following code adds the plugin with its default settings (described in the table above):

```js
eleventyConfig.addPlugin(imageCaptionPlugin);
```

You can also load the plugin and specify configuration options as shown in the following example. The example disables bolding for the caption label and sets the caption label to "Figure: ":

```js
eleventyConfig.addPlugin(imageCaptionPlugin, {
	captionBold: false,
	captionLabel: "Figure"
});
```

If your site uses a different class name for captions, specify it in the configuration like this:

```js
eleventyConfig.addPlugin(imageCaptionPlugin, {		
	captionBold: false,
	captionClass: "ImageCaption"
});
```

Here's an example of a complete Eleventy configuration file using the settings from the second example above:

```js
import imageCaptionPlugin from './eleventy-plugin-image-caption.js';

export default async function (eleventyConfig) {

  eleventyConfig.addPlugin(imageCaptionPlugin, {
		captionBold: false,
		captionLabel: "Figure"
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

With that in place, you can start using the shortcodes in your site's pages.

## Usage

### `imageCaption`

To add a caption to an image on one of your site's pages, use the `imageCaption` shortcode which looks something like this:

```liquid
{% imageCaption "<image-file-path>" "<caption-text>" %}
```

In the example: 

+ `<image-file-path>` refers to the file name (with relevant path) to the image file being captioned. 
+ `<caption-text>` refers to the text you want displayed in the caption.

Here's an example from the sample app included in this repository:

```liquid
{% imageCaption "/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg" "Dog with Flower" %}
```

When Eleventy builds the site, the plugin will replace the shortcode with:  

```text
Image 1: Dog with Flower
```

Which is what you see in the first screenshot on this page.

### `imageReference`

**Note:** As mentioned in the [Limitations](#limitations) section of this document, the `imageReference` shortcode only works images that have already been captioned. The captioned image must be higher in the page content than the associated image reference shortcode.

To calculate the caption label (label text plus image number) on a page, use the `imageReference` shortcode:

```liquid
{% imageReference "<image-file-path>" %}
```

In the example: 

+ `<image-file-path>` refers to the file name (with relevant path) to the captioned image file on the page. 

For example, to calculate a reference to the image from the previous section's example,  you would use the following shortcode *after* the image has already been captioned.

```liquid
{% imageReference "/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg" %}
```

Here's an example from the sample app included in this repository:

```liquid
I personally think {% imageReference "/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg" %} is cuter than {% imageReference "/images/mtsjrdl-5yAhL8ViUVg-unsplash.jpg" %}, don't you?
```

Which generates the following text:

```text
I personally think Image 1 is cuter than Image 2, don't you?
```

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
