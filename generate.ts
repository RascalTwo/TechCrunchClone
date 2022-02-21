import fs from 'fs';
import path from 'path'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import ejs from 'ejs';
import { Event, Post } from './types';


const cacheOrFetch = (url: string, slug: string, cache: boolean): Promise<string> => {
	const cachePath = path.join('cache.' + slug);
	if (cache && fs.existsSync(cachePath)) return fs.promises.readFile(cachePath).then(b => b.toString())
	return fetch(url)
		.then(r => r.text())
		.then(t => fs.promises.writeFile(cachePath, t).then(() => t))
}


const parsePost = (raw: any): Post => {
	const author = raw._embedded.authors[0];
	const image = raw._embedded['wp:featuredmedia'][0]
	return {
		url: raw.link,
		title: raw.title.rendered,
		author: {
			url: author.link,
			name: author.name
		},
		image: {
			url: image.media_details.sizes.full.source_url,
			alt: image.title.rendered
		},
		datetime: new Date(raw.date).getTime(),
		excerpt: new JSDOM(raw.excerpt.rendered).window.document.body.textContent!
	}
}

const parseEvent = (raw: any): Event => {
	const [day, month, year] = raw.dates.begin.split('/').map(Number)
	return {
		url: raw.link,
		title: raw.title.rendered,
		datetime: new Date(year, month - 1, day).getTime(),
		location: raw.venue ? [raw.venue.city, raw.venue.country].filter(Boolean).join(', ') : undefined
	}
}

const timeAndDate = (date: Date) => {
	const time = date.toLocaleTimeString('default', { timeStyle: 'short' })
	const timezone = date.toLocaleDateString('default', { timeZoneName: 'short' }).split(', ')[1].trim()
	const month = date.toLocaleDateString(undefined, { month: 'long' })
	return `${time} ${timezone} • ${month} ${date.getDate()}, ${date.getFullYear()}`
}

const monthAndDay = (date: Date) => {
	return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate()
}

cacheOrFetch('https://techcrunch.com/', 'index.html', process.env.NODE_ENV !== 'production').then(html => {
	const dom = new JSDOM(html, { url: 'https://techcrunch.com/' });
	const data = JSON.parse(dom.window.document.querySelector('script#tc-app-js-extra')!.textContent!.split(' = ').slice(1).join(' = ').trim().slice(0, -1));
	const featured = data.feature_islands.homepage.map(parsePost);
	const posts = data.entities.posts.map(parsePost)
	const events = data.entities.events.map(parseEvent).sort((a: Event, b: Event) => a.datetime - b.datetime)

	return ejs.renderFile(path.join('templates', 'index.ejs'), {
		timeAndDate, monthAndDay,
		featured,
		posts,
		events,
		now: Date.now()
	}).then(html => fs.promises.writeFile(path.join('static', 'index.html'), html));

}).catch(console.error)