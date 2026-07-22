# Eleventy Plugin Image Caption

> [!WARNING]
> Work in progress, not ready for public consumption yet.

Eleventy (11ty) plugin that adds two shortcodes to an Eleventy project:

| Shortcode        | Description  | 
| ---------------- | ------------------------------------ |
| `captionedImage` | Returns an automatically numbered image caption like "Figure 1: A boy with a dog" The shortcode automatically assigns the image/figure number based on an image file's position on the page (top to bottom). | 
| `imageReference` | Returns a text string that references a particular image by number like "Figure 2". |

## Background


## Examples


## Limitations



## Installation


## Configuration


## Usage






`imageReference` won't work correctly if you use the same image on the page twice. Copy the image to a new file if you want to do this. My long term goal is to allow you to pass an instance parameter to the shortcode in order to reference which version of the you image you want to refer to.

`imageReference` only works for references after the image.

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
