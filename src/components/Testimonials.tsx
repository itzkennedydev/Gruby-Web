'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    content:
      '"Gruby has completely changed how I plan meals. I save money every week and discover amazing recipes."',
    author: {
      name: 'Maria Santos',
      role: 'Home Chef',
      company: 'Los Angeles, CA',
    },
  },
  {
    content:
      '"The AI budget coach helped me cut my grocery bill by 30%. Plus, I\'m cooking better meals than ever."',
    author: {
      name: 'James Chen',
      role: 'Food Enthusiast',
      company: 'Seattle, WA',
    },
  },
  {
    content: '"I love sharing my recipes with the community. Gruby makes cooking social and fun!"',
    author: {
      name: 'Sarah Mitchell',
      role: 'Recipe Creator',
      company: 'Austin, TX',
    },
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f7f7] px-4 py-1.5 text-sm font-medium text-[#3995f7] mb-6">
            Case studies
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: '"Graphik Semibold", "Graphik", sans-serif',
              fontWeight: 600,
              fontSize: '40px',
              letterSpacing: '-0.02em',
              lineHeight: '120%',
              color: '#000',
            }}
          >
            Why home chefs love Gruby
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-[640px] mx-auto"
            style={{
              fontFamily: '"Graphik", sans-serif',
              fontSize: '18px',
              lineHeight: '160%',
              color: '#696969',
            }}
          >
            Real stories from home chefs using Gruby to cook smarter, save money, and share their journey.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className="h-full flex flex-col rounded-2xl p-8"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #f7f7f7',
                }}
              >
                {/* Quote mark */}
                <svg
                  className="h-8 w-8 text-gray-200 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <p
                  className="flex-1 mb-6"
                  style={{
                    fontFamily: '"Graphik", sans-serif',
                    fontSize: '16px',
                    lineHeight: '160%',
                    color: '#696969',
                  }}
                >
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#696969] font-semibold">
                    {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: '"Graphik Semibold", "Graphik", sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#000',
                      }}
                    >
                      {testimonial.author.name}
                    </p>
                    <p
                      style={{
                        fontFamily: '"Graphik", sans-serif',
                        fontSize: '12px',
                        color: '#a1a1a1',
                      }}
                    >
                      {testimonial.author.role}, {testimonial.author.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
