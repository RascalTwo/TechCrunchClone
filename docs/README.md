[EJS]: https://ejs.co/
[jsdom]: https://github.com/jsdom/jsdom

# [Tech Crunch Clone](https://rascaltwo.github.io/TechCrunchClone/)

[![GitHub Action](https://github.com/RascalTwo/TechCrunchClone/actions/workflows/main.yaml/badge.svg?event=schedule)](https://rascaltwo.github.io/TechCrunchClone/)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Frascaltwo.github.io%2FTechCrunchClone%2F&label=Website)](https://rascaltwo.github.io/TechCrunchClone/)

A minimalist clone of the [Tech Crunch Homepage](https://techcrunch.com/), with dark mode and daily incremental static regeneration.

**Link to project:** https://rascaltwo.github.io/TechCrunchClone/

[![screenshot of the webpage fold](https://user-images.githubusercontent.com/9403665/173896859-7702d87f-8275-4ac2-a891-864d84383b70.png)](https://rascaltwo.github.io/TechCrunchClone/)

## How It's Made:

**Tech used:** TypeScript, HTML, CSS, JavaScript, [EJS][ejs], SVG, [jsdom](jsdom)

After I completed making a simple static clone of the site, I realized that as far as the homepage is concerned, there were a relatively few pieces of changing content, and almost off of that content was stylistically identical. This led to be expanding the site into a daily regenerating variant, first by writing a scraper with the help of [`jsdom`][jsdom], that would from the homepage obtain the unique content - articles, images, events, etc - and pass this off to [EJS][ejs] to generate my HTML page.

Lastly I wrote a [GitHub Action](./.github/workflows/main.yml) to perform this daily and push the static assets to production, which you can see right now!

## Optimizations

While there always exist optimizations, in this case I got the code to a pretty optimized position, the only remaining optimization would be instead of requiring TypeScript, to build the TypeScript to normal JavaScript, allowing less dependencies to be installed daily.

## Lessons Learned:

Aside from learning to implement the design of the website, I additionally learned how to implement my own version of incremental static regeneration combining my scraper & HTML building script with GitHub Pages.
