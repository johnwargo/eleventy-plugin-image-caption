# Eleventy Plugin Starter (JavaScript)

<!-- TOC -->

- [Eleventy Plugin Starter JavaScript](#eleventy-plugin-starter-javascript)
  - [Anatomy of an Eleventy Plugin](#anatomy-of-an-eleventy-plugin)
    - [The Files](#the-files)
    - [The Code](#the-code)
  - [Using This  Project](#using-this--project)

<!-- /TOC -->

When I first started trying to figure out how to write my own Eleventy plugin, many of the articles showed how to do it, but never showed a complete project. For me, to truly understand what I had to deliver in my plugin, I had to know what the project structure looked like. Once I had that, the rest of the work was just writing the JavaScript code for the plugin. 

This repository contains a complete Eleventy plugin as well as a complete Eleventy site that exercises the plugin. With this approach, you done have to maintain an external Eleventy project to test the plugin as you work, you can code and test the plugin in the same place. I created this repository to demonstrate what a simple but complete Eleventy plugin project looks like and works rather than a fill in your code here template.

To make this project more useful to you as you learn, it includes several Eleventy capabilities through the plugin:

* An Eleventy `randomNumbers` collection that returns a list of 10 random numbers.
* An Eleventy `hello` shortcode that takes a name variable and returns the standard "hello, Name" you see in many examples
* Two Eleventy filters, one that generates dynamic HTML based in input values and another that reformats content using default and configurable options.

The repository also includes an Eleventy site that exercises the plugin capabilities on the site's home page (shown below).

Take a look at the repository's `src/index.md` file to see the source for the home page.

To launch the site, open a terminal window or command prompt to the project folder and execute the following commands:

```shell
npm install
npm start
```

This installs the required modules then builds the site:

```text
> eleventy-plugin-starter-template@0.0.1 start
> eleventy --serve

[11ty] Writing _site/index.html from ./src/index.md (liquid)
[11ty] Copied 3 files / Wrote 1 file in 0.10 seconds (v2.0.1)
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```

Open the link listed in the build output to launch the generated site.

![Eleventy Site Home Page](home.png)

## Anatomy of an Eleventy Plugin

### The Files

An Eleventy plugin is essentially Javascript code exposed through a Node module. In this project, all an Eleventy project needs to consume the plugin is the `eleventy-plugin-starter-template.js` file in the root of the repository. If you wanted to, you could copy that file to your Eleventy project and load it using the following code in the site's `.eleventy.js` or `eleventy.config.js` file:

```js
const starterTemplate = require('./eleventy-plugin-starter-template.js');

module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(starterTemplate);

};
```

With that in place, you can use the capabilities exposed by the plugin in the site (as illustrated in this repository's the repository's `src/index.md` file).

Node and `npm` make it easier by packaging the JavaScript file, the `package.json` file, and other stuff into a package you publish to https://npmjs.org so others can easily install it in an eleventy site using:

```shell
npm install eleventy-plugin-starter-template
```

you still have to do this stuff (notice the `./` is missing from the first line):

```js
const starterTemplate = require('eleventy-plugin-starter-template.js');

module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(starterTemplate);

};
```

But at least you don't have to manually copy the JavaScript file to each project.

The project's `.npmignore` handles hiding the Eleventy site project files from npm so that only the files needed to use the plugin make it into the npm package and therefore other Eleventy projects that use the plugin. 

Here's the contents of the project's `.npmignore` file:

```text
# Folders
_site/
node_modules/
src/

# files
.gitignore
eleventy.config.js
home.png
pub.mjs
```

And here's the contents of the npm package.

![npm page](npm.png)

### The Code

The code is essentially the same code you would implement to a shortcode, filter, or custom collection in an Eleventy site. The only difference is that the shortcode, filter, and collection are exported as a Module at the very bottom of the code.

```js
const randomNumbers = (eleventyConfig) => {
  eleventyConfig.addCollection('RandomNumbers', () => {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers;
  });
}

const sayHello = (eleventyConfig) => {
  eleventyConfig.addFilter("sayHello", (name, tag = "H2") => {
    return `<${tag}>Hello, ${name}</${tag}>`;
  });
};

const commaize = (eleventyConfig) => {
  eleventyConfig.addFilter("commaize", function (num, locale = "en-us") {
    return num.toLocaleString(locale);
  });
};

const hello = (eleventyConfig) => {
  eleventyConfig.addShortcode("hello", function (firstName, lastName) {
    return `<p>Hello, ${firstName} ${lastName}</p>`;
  });
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(commaize);
  eleventyConfig.addPlugin(hello);
  eleventyConfig.addPlugin(randomNumbers);
  eleventyConfig.addPlugin(sayHello);
}
```

I chose to structure the code into several constants then export the code that adds each as plugins. If you look at other plugins, you'll see other styles of doing the same thing. 

For example, in my [eleventy-plugin-post-stats](https://github.com/johnwargo/eleventy-plugin-post-stats) plugin, the export and plugin code are all in the same block:

```js
module.exports = function (eleventyConfig: any, options: ModuleOptions = {}) {
  eleventyConfig.addCollection('postStats', (collectionApi: any) => {

   {{ plugin code goes here }} 

  });
}
```

By the way, that plugin is written in TypeScript, so you can use it as an example for TypeScript-driven Eleventy plugins. 


## Using This  Project

To use this repository as a starting point for your Plugin, do the following:

Rename the project's `eleventy-plugin-starter-template.js` file to match the name of your plugin (or whatever you want to call it). 

In the project's `package.json` file, change the value in the `name` property to match the name of your plugin. Note that by convention Eleventy plugin names all begin with `eleventy-plugin`. Next change the file's `main` property to match the JvaScript file name.

```json
{
  "name": "eleventy-plugin-your-template",
  "version": "0.0.2",
  "description": "Eleventy Plugin starter template",
  "main": "eleventy-plugin-your-code.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "eleventy --serve",
    "build": "eleventy"
  },
  "keywords": [
    "Eleventy",
    "Plugin"
  ],
  "author": "John M. Wargo",
  "license": "MIT",
  "dependencies": {
    "@11ty/eleventy": "^2.0.1"
  }
}
```

Open the project's `eleventy.config.js` file and make the following changes:

1. In the first line, replace the `const starterTemplate = require('./eleventy-plugin-starter-template.js');` line with a constant name appropriate for the plugin and the file name for your plugin's main code (as shown below). Notice that the file loads via `./` which means it pulls in the local file rather than an installed module from `node_modules` like it would for any Eleventy project that uses the plugin.
2. Change the line that adds the plugin to the Eleventy project: `eleventyConfig.addPlugin(starterTemplate);` replacing `starterTemplate` wih the constant you created in step 1.

```js
const someConstant = require('./eleventy-plugin-your-code.js');

module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(someConstant);

	eleventyConfig.addPassthroughCopy("src/assets/");
	
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

Finally, open the JavaScript file and code away, using the provided code as an example. If you have questions or problems, create an [Issue](https://github.com/johnwargo/eleventy-plugin-starter/issues) and I'll do what I can to help.

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
