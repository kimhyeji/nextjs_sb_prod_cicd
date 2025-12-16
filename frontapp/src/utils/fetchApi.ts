import api from './api'

export type Article = {
  id: number
  subject: string
  content: string
  author: string
  createdDate: string
}

const getArticle = async (id: string | number): Promise<Article> => {
  const res = await api.get(`/articles/${id}`)
  return res.data.data.article
}

export default getArticle
