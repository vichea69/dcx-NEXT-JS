import Image from 'next/image'
import React from 'react'

const Element = () => {
    return (
        <div className="w-full bg-white">
            {/* Section 1 */}
            <section className="w-full bg-fuchsia-50 py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-8 gap-12">
                    {/* Text */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-3">
                            Fast-track your learning
                        </h3>
                        <h2 className="text-gray-900 font-bold text-4xl md:text-5xl leading-tight mb-5">
                            Learn By Doing
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                            Learn programming skills from absolute beginner to advanced mastery. We build project-based
                            courses to help you learn professionally and feel like a complete developer.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/assets/images/two.png"
                            alt="Learn by doing"
                            width={520}
                            height={400}
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="w-full bg-blue-50 py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-8 gap-12">
                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/assets/images/one.png"
                            alt="Put Your Learning Into Practice"
                            width={520}
                            height={400}
                            className="rounded-xl shadow-lg"
                        />
                    </div>

                    {/* Text */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3">
                            Step-by-step lessons
                        </h3>
                        <h2 className="text-gray-900 font-bold text-4xl md:text-5xl leading-tight mb-5">
                            Put Your Learning<br />Into Practice
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                            Apply your knowledge with real-world projects. Learn everything you need to take your
                            career to the next level — through doing, not just watching.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Element