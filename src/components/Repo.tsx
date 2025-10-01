import { githubuser } from '@/types/constants'
import Link from 'next/link'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'
interface RepoProps {
  name: string
}
export default async function Repo({ name }: RepoProps) {
  const username = githubuser
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}`,
    {
      // ⚠️ 인증 헤더 추가
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      // Next.js 서버 캐시 옵션: 1시간(3600초)마다 데이터 재검증
      next: { revalidate: 3600 },
    }
  )
  const repo = await response.json()
  // console.log(repo)
  return (
    <div>
      <h3 className="text-xl font-bold">
        <Link href={`https://github.com/${username}/${name}`}>{repo.name}</Link>
      </h3>
      <p>{repo.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="flex items-center gap-1">
          <FaStar /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch /> {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <FaEye /> {repo.stargazers_count}
        </span>
      </div>
    </div>
  )
}
