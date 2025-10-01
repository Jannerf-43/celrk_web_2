import { githubuser } from '@/types/constants'
import { Repository } from '@/types/repo'
import Link from 'next/link'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

const username = githubuser
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export default async function ReposPage() {
  // 1. SSG: Static Site Generation
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        // ⚠️ 토큰을 사용하여 요청을 인증합니다.
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // 캐싱도 함께 적용
    }
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()
  // console.log(repos)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>
      <ul>
        {repos.map((repo: Repository) => (
          <li key={repo.id} className="bg-gray-100 m-4 p-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
