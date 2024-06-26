'use client'

import {ColorModel} from '@/app/types/color'
import {merge} from '@/app/utils/classes-merge'
import {colors} from '@/constants/colors'
import {Big_Shoulders_Display} from 'next/font/google'
import {useEffect, useState} from 'react'

const bigShoulders = Big_Shoulders_Display({subsets: ['latin']})

export default function Home() {
  const filters = ['featured', 'all', ...Object.keys(colors)] as const

  const [activeTab, setActiveTab] = useState('featured')
  const [colorList, setColorList] = useState<ColorModel[]>([])

  const filterFeatured = () => {
    return Object.keys(colors)
      .map(group => colors[group].filter(color => color.featured))
      .flat(1)
  }

  const filterAll = () => {
    return Object.keys(colors)
      .map(group => colors[group])
      .flat(1)
  }

  const filterByColor = (color: string) => {
    return colors[color]
  }

  useEffect(() => {
    switch (activeTab) {
      case 'featured':
        setColorList(filterFeatured())
        break
      case 'all':
        setColorList(filterAll())
        break
      default:
        setColorList(filterByColor(activeTab))
        break
    }
  }, [activeTab])

  useEffect(() => {
    setColorList(filterFeatured())
  }, [])

  return (
    <main className='p-5 bg-base-200 min-h-screen'>
      <header className='w-full flex items-center justify-between'>
        <h1
          className={merge([
            bigShoulders.className,
            'text-6xl font-extrabold letter tracking-[-4px] text-primary',
          ])}>
          Coolors
        </h1>

        <h2 className='text-1xl btn btn-accent rounded-2xl btn-sm'>
          Dark winter
        </h2>
      </header>

      <section className='w-full overflow-hidden mt-5'>
        <div
          role='tablist'
          className='tabs overflow-x-auto w-full no-scrollbar transition-all'>
          {filters.map(filter => (
            <span
              key={filter}
              role='tab'
              className={merge([
                'tab capitalize transition-all flex-1 font-semibold text-base-content/70',
                activeTab === filter &&
                  'tab-active text-2xl font-bold text-base-content',
              ])}
              onClick={() => setActiveTab(filter)}>
              {filter}
            </span>
          ))}
        </div>
      </section>

      <section className='w-full flex'>
        <div className='shadow-md bg-base-100 rounded-lg p-5 grid grid-cols-4 md:grid-cols-6 gap-2 mt-5 w-full'>
          {colorList.map(color => (
            <div
              key={color.hexadecimal}
              className='h-32 rounded-xl'
              style={{background: color.hexadecimal}}></div>
          ))}
        </div>
      </section>
    </main>
  )
}
