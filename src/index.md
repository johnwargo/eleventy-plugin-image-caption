---
layout: default
title: Eleventy Plugin Image Caption
---

Puppy dog images courtesy of [Unsplash](https://unsplash.com/s/photos/puppies)

The [Eleventy Plugin Image Caption](https://github.com/johnwargo/eleventy-plugin-image-caption) plugin adds a couple of shortcodes to an [11ty](https://www.11ty.dev/) that makes it easier to add numbered captions to images plus reference those captions elsewhere on a page. This page uses the plugin, so you can see what it looks like in operation.

Here's a cute image of a dog sitting with a flower in her mouth.

![A dog holding a flower in its mouth](/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg)
{% captionedImage "/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg" "Dog with Flower" %}

Photo by <a href="https://unsplash.com/@richardbrutyo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Brutyo</a> on <a href="https://unsplash.com/photos/yellow-labrador-retriever-biting-yellow-tulip-flower-Sg3XwuEpybU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Notice the caption on the image above, the bold portion is generated based on the image number and the caption label configured when the site loads the plugin. The regular text to the right is passes as a parameter to the shortcode. You can configure the plugin to disable the bold label if you want.

**Note:** When you run this 11ty site in `serve` mode, the caption will show **image #**; when you run an 11ty site in development mode, every refresh of the app increments the image numbers. For that reason, the plugin returns generic text in that scenario.

Lets look at another capability of the plugin, referencing images by caption index later in the post. Here's a picture of a cute puppy laying on the ground.

![A puppy lying on the ground](/images/mtsjrdl-5yAhL8ViUVg-unsplash.jpg)
{% captionedImage "/images/mtsjrdl-5yAhL8ViUVg-unsplash.jpg" "A puppy lying down on the ground" %}

Photo by <a href="https://unsplash.com/@mtsjrdl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">mtsjrdl</a> on <a href="https://unsplash.com/photos/white-and-brown-long-coated-dog-5yAhL8ViUVg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

I personally think {% imageReference "/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg" %} is cuter than {% imageReference "/images/mtsjrdl-5yAhL8ViUVg-unsplash.jpg" %}, don't you?

Finally, here's another image of a puppy. I don't have another plugin use case to show you, I just like looking at pictures of puppys.


![A puppy sitting on some grass](/images/parttime-portraits-atOlntWcO4k-unsplash.jpg)
{% captionedImage "/images/parttime-portraits-atOlntWcO4k-unsplash.jpg" "A puppy sitting on some grass" %}

Photo by <a href="https://unsplash.com/@parttimepotraits?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">PartTime Portraits</a> on <a href="https://unsplash.com/photos/light-golden-retriever-puppy-on-green-grass-field-during-daytime-atOlntWcO4k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

