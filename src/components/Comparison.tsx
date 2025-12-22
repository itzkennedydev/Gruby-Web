'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface MealComparison {
  meal: string
  image: string
  delivery: {
    price: number
    fees: number
    tip: number
    total: number
  }
  homeCooked: {
    ingredients: string[]
    price: number
    servings: number
    perServing: number
    loading?: boolean
  }
  savings: number
  savingsPercent: number
}

const initialMealComparisons: MealComparison[] = [
  {
    meal: 'Chicken Stir Fry',
    image:
      'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800',
    delivery: {
      price: 16.99,
      fees: 3.5,
      tip: 3.0,
      total: 23.49,
    },
    homeCooked: {
      ingredients: [
        'Chicken breast',
        'Bell pepper',
        'Broccoli',
        'Rice',
        'Soy sauce',
      ],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
  {
    meal: 'Pasta Carbonara',
    image:
      'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    delivery: {
      price: 15.99,
      fees: 3.25,
      tip: 2.75,
      total: 21.99,
    },
    homeCooked: {
      ingredients: ['Pasta', 'Bacon', 'Eggs', 'Parmesan cheese', 'Heavy cream'],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
  {
    meal: 'Burger & Fries',
    image:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    delivery: {
      price: 14.99,
      fees: 3.0,
      tip: 2.5,
      total: 20.49,
    },
    homeCooked: {
      ingredients: [
        'Ground beef',
        'Hamburger buns',
        'Cheese',
        'Potatoes',
        'Lettuce',
      ],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
]

export default function Comparison() {
  const [comparisons, setComparisons] = useState<MealComparison[]>(
    initialMealComparisons,
  )

  useEffect(() => {
    async function fetchPrices() {
      const updatedComparisons = await Promise.all(
        initialMealComparisons.map(async (comparison) => {
          try {
            // Call the server-side API route to get real Kroger prices
            const response = await fetch('/api/kroger/price', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ingredients: comparison.homeCooked.ingredients,
              }),
            })

            const data = await response.json()

            // Use real prices if found, otherwise fall back to estimates
            let total = data.total
            if (!total || total === 0 || data.foundPrices === 0) {
              // Fall back to $3.50 estimate per ingredient if no prices found
              total = comparison.homeCooked.ingredients.length * 3.5
            }

            const finalPerServing = total / 4

            const savings = comparison.delivery.total - finalPerServing
            const savingsPercent = Math.round(
              (savings / comparison.delivery.total) * 100,
            )

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: total,
                perServing: finalPerServing,
                loading: false,
              },
              savings,
              savingsPercent,
            }
          } catch {
            const estimatedTotal = comparison.homeCooked.ingredients.length * 3.5
            const estimatedPerServing = estimatedTotal / 4
            const savings = comparison.delivery.total - estimatedPerServing
            const savingsPercent = Math.round(
              (savings / comparison.delivery.total) * 100,
            )

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: estimatedTotal,
                perServing: estimatedPerServing,
                loading: false,
              },
              savings,
              savingsPercent,
            }
          }
        }),
      )
      setComparisons(updatedComparisons)
    }

    fetchPrices()
  }, [])

  return (
    <section
      id="comparison"
      className="w-full py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1540px] mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-[#717171] mb-2">
            The real cost breakdown
          </p>
          <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] font-semibold text-[#222] tracking-tight leading-tight">
            See what you&apos;re actually paying
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden border border-[#E5E5E5]"
              style={{ borderRadius: '18px' }}
            >
              {/* Image */}
              <div className="relative h-44">
                <Image
                  src={comparison.image}
                  alt={comparison.meal}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-20"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                  }}
                />
                <h3 className="absolute bottom-3 left-4 text-base font-semibold text-white">
                  {comparison.meal}
                </h3>
              </div>

              {/* Comparison Section */}
              <div className="p-5">
                <div className="grid grid-cols-[1fr_1px_1fr] gap-5">
                  {/* Eating Out */}
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-[#222]">Eating Out</p>
                      <p className="text-xs text-[#717171] mt-0.5">1 serving</p>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Food</span>
                        <span>${comparison.delivery.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Fees & tip</span>
                        <span>${(comparison.delivery.fees + comparison.delivery.tip).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-[#717171]">Total</span>
                        <span className="text-xl font-semibold text-[#DC2626]">${comparison.delivery.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="bg-[#E5E5E5]" />

                  {/* Home Cooked */}
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-[#222]">Home Cooked</p>
                      <p className="text-xs text-[#717171] mt-0.5">{comparison.homeCooked.servings} servings</p>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Groceries</span>
                        <span>
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-[#717171]" />
                          ) : (
                            `$${comparison.homeCooked.price.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Fees</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-[#717171]">Per serving</span>
                        <span className="text-xl font-semibold text-[#16A34A]">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-[#16A34A]" />
                          ) : (
                            `$${comparison.homeCooked.perServing.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Banner */}
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between" style={{ borderRadius: '0 0 18px 18px' }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/60">You save</span>
                  <span className="text-lg font-semibold text-white">
                    {comparison.homeCooked.loading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      `$${comparison.savings.toFixed(2)}`
                    )}
                  </span>
                </div>
                {!comparison.homeCooked.loading && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 text-white bg-[#16A34A] rounded-full">
                      {comparison.savingsPercent}% less
                    </span>
                    <span className="text-sm text-white/60">+{comparison.homeCooked.servings - 1} servings</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
