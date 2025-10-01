import { githubuser } from '@/types/constants'
import { GitHubContent } from '@/types/github'
import Link from 'next/link'

interface RepoProps {
  name: string
}

export default async function RepoDirs({ name }: RepoProps) {
  const username = githubuser
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN // ⚠️ 환경 변수에서 토큰을 가져옵니다.

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}/contents`,
    {
      // ⚠️ 인증 헤더 추가
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      // Next.js 서버 캐시 옵션: 1시간(3600초)마다 데이터 재검증
      next: { revalidate: 3600 },
    }
  )

  const contents: GitHubContent[] = await response.json()
  const dirs = contents.filter((content) => content.type === 'dir')
  return (
    <div className="mt-2 ">
      <h3 className="text-xl font-bold">Directories</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link
              className="underline"
              href={`https://github.com/${username}/${name}/tree/master/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
