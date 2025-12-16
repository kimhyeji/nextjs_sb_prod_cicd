'use client'

import { useEffect, useState } from 'react'
import api from '../../utils/api'

type Member = {
  id: number
  username: string
}

export default function About() {
  const [member, setMember] = useState<Member | null>(null)

  useEffect(() => {
    api.get('/members/me').then((res) => {
      setMember(res.data.data.memberDto)
    })
  }, [])

  return (
    <>
      <h4>소개 페이지</h4>

      {member && (
        <ul>
          <li>id : {member.id}</li>
          <li>username : {member.username}</li>
        </ul>
      )}
    </>
  )
}
