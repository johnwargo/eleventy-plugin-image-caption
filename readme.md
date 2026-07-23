# Eleventy Plugin Image Caption

> [!WARNING]
> Work in progress, not ready for public consumption.

Eleventy (11ty) plugin that adds two shortcodes to an Eleventy project:

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

![Example 1](/images/example-01.png).

When you invoke the shortcode, you give it the file path pointing to the image plus the text added to th caption and the plugin handles the rest.



## Limitations



## Installation


## Configuration


## Usage






`imageReference` won't work correctly if you use the same image on the page twice. Copy the image to a new file if you want to do this. My long term goal is to allow you to pass an instance parameter to the shortcode in order to reference which version of the you image you want to refer to.

`imageReference` only works for references after the image.

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
