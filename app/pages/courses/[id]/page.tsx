'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/app/comp/navbar';
import Chatbot from '@/app/comp/chatbot';
import { courses } from '@/app/data/courses';

export default function CoursePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id || !(id in courses)) {
    return <h1 className="text-center text-red-500 mt-10">Course not found</h1>;
  }

  const course = courses[id as keyof typeof courses];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-20 space-y-6">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white p-6 rounded-xl flex flex-col md:flex-row md:justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{course.title}</h1>
            <p className="text-gray-300 text-lg">{course.languages.join(', ')}</p>
          </div>
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 mt-4 md:mt-0">
            <p>{course.duration}</p>
            <p className="text-sm">{course.level} level required</p>
          </div>
        </div>

        {/* Compatibility & Enrollment */}
        <div className="bg-white shadow-md p-4 rounded-lg flex items-center">
          <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full text-xl">
            {course.compatibility}%
          </div>
          <div className="ml-4">
            <p className="font-bold">Great for:</p>
            <p className="text-gray-600">Interested in {course.languages.join(', ')}</p>
          </div>
          <button className="ml-auto bg-red-500 text-white px-6 py-2 rounded-lg">Enroll</button>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar */}
          <nav className="col-span-1 bg-gray-100 p-4 rounded-lg">
            <ul className="space-y-4 text-gray-600">
              <li><a href="#introduction" className="text-red-500 font-bold">Introduction</a></li>
              <li><a href="#reviews">What others say</a></li>
              <li><a href="#learn">What you will learn</a></li>
              <li><a href="#prerequisites">What you need</a></li>
            </ul>
          </nav>

          {/* Main Content */}
          <div className="col-span-3 space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-gray-600">{course.description}</p>
            </section>

            <section id="reviews">
              <h2 className="text-2xl font-bold">What others say</h2>
              {course.reviews.map((review, index) => (
                <p key={index} className="text-gray-600 mt-2">
                  <span className="font-bold">“{review.text}”</span> <br />
                  <span className="text-sm text-gray-400">Took course in {review.date}</span>
                </p>
              ))}
            </section>

            <section id="learn">
              <h2 className="text-2xl font-bold">What you will learn</h2>
              <div className="flex flex-wrap gap-2">
                {course.learn.map((item, index) => (
                  <span key={index} className="bg-red-500 text-white px-4 py-1 rounded-lg">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section id="prerequisites">
              <h2 className="text-2xl font-bold">What you need</h2>
              <ul className="space-y-2">
                {course.prerequisites.map((req, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-md">{req}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <Chatbot />
      </main>

      <footer className="p-4 w-full text-end bg-gray-50 border-t">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} YuLearn. All rights reserved.</p>
      </footer>
    </div>
  );
}
