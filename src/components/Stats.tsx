'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '$3,600',
    label: 'Yearly savings potential',
    title: 'Keep Your Cash',
    description: 'The average person spends $300/month on delivery fees and markups alone. That\'s $3,600/year. Cook at home and actually keep it.',
  },
  {
    value: 'Less',
    label: 'Packaging waste',
    title: 'Skip the Waste',
    description: 'Every delivery order = foam containers, plastic bags, and carbon emissions. Cooking at home is the greener choice.',
  },
  {
    value: '100+',
    label: 'Achievements to unlock',
    title: 'Level Up Your Skills',
    description: 'Cooking streaks, achievement badges, and guided cooking mode help you go from microwave meals to actual chef-level. For real.',
  },
]

export default function Stats() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
        width: '100%',
        padding: '80px 16px',
        backgroundColor: '#000',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: '"Graphik Medium", "Graphik", sans-serif',
            fontSize: '14px',
            color: 'var(--color-support)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Why cook at home?
        </p>
        <h2
          style={{
            fontFamily: '"Graphik Semibold", "Graphik", sans-serif',
            fontWeight: 600,
            fontSize: '40px',
            letterSpacing: '-0.04em',
            lineHeight: '120%',
            color: '#fff',
          }}
        >
          Access Gruby wherever you go
        </h2>
        <p
          style={{
            fontFamily: '"Graphik", sans-serif',
            fontSize: '18px',
            lineHeight: '160%',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Available on all your devices
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          width: '100%',
          maxWidth: '1200px',
        }}
        className="stats-grid"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '32px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: '"Graphik Semibold", "Graphik", sans-serif',
                  fontWeight: 600,
                  fontSize: '48px',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-support)',
                  lineHeight: '100%',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: '"Graphik", sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: '"Graphik Semibold", "Graphik", sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                  color: '#fff',
                  marginBottom: '8px',
                }}
              >
                {stat.title}
              </h3>
              <p
                style={{
                  fontFamily: '"Graphik", sans-serif',
                  fontSize: '15px',
                  lineHeight: '150%',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
