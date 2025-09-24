'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

export default function DashboardCPage() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="text-9xl">로딩중 . . .</div>
  }

  if (!isSignedIn) {
    return <div>페이지 보고싶으면 로그인 해</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">클라이언트 측 대시보드</h1>
      <div className="mb-5">
        <p>use client 지시자 사용함</p>
        <p>브라우저에서 useUser() gkatn dldyd</p>
        <p>어서와, {user.firstName}!</p>
        <p>Email : {user.primaryEmailAddress?.emailAddress}</p>
      </div>
    </div>
  )
}
