export interface Author {
	url: string
	name: string
}

export interface Image {
	url: string
	alt?: string
}

export interface Post {
	url: string
	title: string
	author: Author
	image?: Image
	datetime?: number
	excerpt?: string
}

export interface Event {
	url: string
	title: string
	datetime: number
	location?: string
}