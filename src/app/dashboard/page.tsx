import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

export default async function DashboardPage() {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return <div>이 페이지 볼라면 로그인을 해</div>
  }

  const user = await currentUser()
  return (
    <div>
      <h1 className="text2xl font-bold mb-5">Dashboard</h1>
      <div>
        <p> auth, currentUser 함수 이용</p>
        <p>안늬영, {user?.firstName}!</p>
        <p className="text-5xl">
          이메일 : {user?.primaryEmailAddress?.emailAddress}
        </p>
        <p>사용자 등록 : {user?.createdAt}</p>
        <p className="mb-5">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㄴ</p>
        <p className="mb-5">ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ</p>
      </div>
    </div>
  )
}
