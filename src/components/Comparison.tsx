'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, X, Check } from 'lucide-react'
import { calculateMealPrice } from '@/lib/kroger-api'

// Comparison data with images
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPrices() {
      setIsLoading(true)
      const updatedComparisons = await Promise.all(
        initialMealComparisons.map(async (comparison) => {
          try {
            const mealData = await calculateMealPrice(
              comparison.homeCooked.ingredients,
            )
            const total = mealData.total

            const finalTotal =
              total > 0
                ? total
                : comparison.homeCooked.ingredients.length * 3.5
            const finalPerServing = finalTotal / 4

            const savings = comparison.delivery.total - finalPerServing
            const savingsPercent = Math.round(
              (savings / comparison.delivery.total) * 100,
            )

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: finalTotal,
                perServing: finalPerServing,
                loading: false,
              },
              savings,
              savingsPercent,
            }
          } catch (error) {
            console.error('Error fetching prices:', error)
            // Fallback to estimated prices
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
      setIsLoading(false)
    }

    fetchPrices()
  }, [])

  return (
    <section
      id="comparison"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '80px 16px',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
          width: '100%',
          maxWidth: '1540px',
        }}
      >
        {/* Header Section */}
        <div className="text-center">
          <h2
            className="mb-3 font-semibold text-[#222222] sm:mb-4"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.5rem)' }}
          >
            See what you&apos;re actually paying
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#717171] sm:text-lg">
            Same meal. Different price. You decide.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full space-y-4 sm:space-y-6">
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 sm:rounded-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image */}
                <div className="relative h-40 sm:h-48 lg:col-span-3 lg:h-auto">
                  <Image
                    src={comparison.image}
                    alt={comparison.meal}
                    fill
                    className="object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    quality={100}
                    fetchPriority={index < 2 ? 'high' : 'auto'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent lg:bg-gradient-to-t" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      {comparison.meal}
                    </h3>
                  </div>
                </div>

                {/* Comparison Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-9">
                  {/* Delivery - The "bad" option */}
                  <div className="border-b border-gray-200 bg-white p-4 sm:p-6 md:border-b-0 md:border-r md:p-8">
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="mb-0.5 text-xs font-medium text-[#222222] sm:text-sm">
                          Eating Out
                        </p>
                        <p className="text-[10px] leading-tight text-[#717171] sm:text-xs">
                          1 serving
                        </p>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-8 sm:w-8">
                        <X
                          className="h-3.5 w-3.5 text-red-600 sm:h-4 sm:w-4"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    <div className="mb-3 space-y-1.5 text-xs sm:mb-4 sm:space-y-2 sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Food</span>
                        <span className="text-[#222222]">
                          ${comparison.delivery.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Fees & tip</span>
                        <span className="text-[#222222]">
                          ${(comparison.delivery.fees + comparison.delivery.tip).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex items-end justify-between">
                        <span className="text-xs font-medium text-[#222222] sm:text-sm">
                          Total
                        </span>
                        <span className="text-xl font-bold text-[#222222] sm:text-2xl">
                          ${comparison.delivery.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Home Cooking - The "good" option */}
                  <div className="bg-white p-4 sm:p-6 md:p-8">
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="mb-0.5 text-xs font-medium text-[#222222] sm:text-sm">
                          Home Cooked
                        </p>
                        <p className="text-[10px] leading-tight text-[#717171] sm:text-xs">
                          {comparison.homeCooked.servings} servings
                        </p>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-8 sm:w-8">
                        <Check
                          className="h-3.5 w-3.5 text-[#16A34A] sm:h-4 sm:w-4"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    <div className="mb-3 space-y-1.5 text-xs sm:mb-4 sm:space-y-2 sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Groceries</span>
                        <span className="text-[#222222]">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" />
                          ) : (
                            `$${comparison.homeCooked.price.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Fees</span>
                        <span className="text-[#222222]">$0.00</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex items-end justify-between">
                        <span className="text-xs font-medium text-[#222222] sm:text-sm">
                          Per serving
                        </span>
                        <span className="text-xl font-bold text-[#16A34A] sm:text-2xl">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                          ) : (
                            `$${comparison.homeCooked.perServing.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Strip */}
              <div className="flex flex-col items-center justify-between gap-2 bg-[#222222] px-4 py-3 sm:flex-row sm:gap-3 sm:px-6 sm:py-4 md:px-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-4">
                  <p className="text-xs text-white/70 sm:text-sm">You save</p>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {comparison.homeCooked.loading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white sm:h-5 sm:w-5" />
                    ) : (
                      `$${comparison.savings.toFixed(2)}`
                    )}
                  </p>
                  {!comparison.homeCooked.loading && (
                    <span className="rounded bg-[#16A34A] px-1.5 py-0.5 text-[10px] font-semibold text-white sm:px-2 sm:text-xs">
                      {comparison.savingsPercent}% less
                    </span>
                  )}
                </div>
                <p className="text-center text-xs text-white/70 sm:text-left sm:text-sm">
                  + {comparison.homeCooked.servings - 1} extra servings
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
