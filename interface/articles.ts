export interface iArticles {
  id: number
  title: string
  alltext: string
  summary?: string
  datecreated: Date
  datemodified?: Date
  views: number
  imageurl?: string
  published: boolean
  authorid?: number
}

export interface iArticlesArray extends Array<iArticles> { }