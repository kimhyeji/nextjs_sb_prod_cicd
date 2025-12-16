'use client'

import Link from 'next/link'
import { useState } from 'react'
import api from '@/src/utils/api'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

type ArticleRow = {
  id: number
  subject: string
  author: string
  createdDate: string
}

type ArticleFormData = {
  subject: string
  content: string
}

export default function Article() {
  const getArticles = async () => {
    return await api.get('/articles').then((res) => res.data.data.articles)
  }

  const { isLoading, error, data } = useQuery<ArticleRow[]>({
    queryKey: ['articles'],
    queryFn: getArticles,
  })

  const deleteArticle = async (id: number | string) => {
    await api.delete(`/articles/${id}`)
  }

  const queryClient = useQueryClient()
  const mutation = useMutation<void, any, number | string>({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })

  if (isLoading) return <>Loading....</>

  if (error) {
    console.log(error)
    return <>에러 발생</>
  }

  if (!data) return null

  if (data) {
    return (
      <>
        <ArticleForm />

        <h4>번호 / 제목 / 작성자 / 생성일 / 삭제여부</h4>
        {data.length == 0 ? (
          <p>현재 게시물이 없습니다.</p>
        ) : (
          <ul>
            {data.map((row) => (
              <li key={row.id}>
                {row.id} /<Link href={`/article/${row.id}`}>{row.subject}</Link>{' '}
                /{row.author} / {row.createdDate}
                <button onClick={() => mutation.mutate(row.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }
}

function ArticleForm() {
  const [article, setArticle] = useState({ subject: '', content: '' })

  const queryClient = useQueryClient()
  const mutation = useMutation<void, any, ArticleFormData>({
    mutationFn: (newArticle) => api.post('/articles', newArticle),
    onSuccess: () => {
      alert('success')
      setArticle({ subject: '', content: '' })
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: () => {
      alert('fail')
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(article)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setArticle({ ...article, [name]: value })
  }

  return (
    <>
      <h4>게시물 작성</h4>
      <form onSubmit={handleSubmit}>
        <label>
          제목 :
          <input
            type="text"
            name="subject"
            onChange={handleChange}
            value={article.subject}
          />
        </label>
        <br />
        <label>
          내용 :
          <input
            type="text"
            name="content"
            onChange={handleChange}
            value={article.content}
          />
        </label>
        <input type="submit" value="등록" />
      </form>
    </>
  )
}
