import { Course } from '@/types/courses'
import React from 'react'
import Link from 'next/link'

interface CoursesPromps {
  courses: Course[]
}

export default function Courses({ courses }: CoursesPromps) {
  return (
    <div className="grid-1">
      {courses.map((courses: Course) => (
        <div key={courses.id} className="bg-blue-200 p-4 m-4 rounded-lg">
          <h2 className="text-lg">{courses.title}</h2>
          <small>Level: {courses.level}</small>
          <p className="mb-4">{courses.description}</p>
          <Link
            href={courses.link}
            target="_blank"
            className="py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-lg mb-4"
          >
            Go to Courses
          </Link>
        </div>
      ))}
    </div>
  )
}
