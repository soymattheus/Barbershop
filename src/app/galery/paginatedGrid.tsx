'use client'

import Image from 'next/image'
import { useState } from 'react'

const images = [
  { imagePath: '/images/corte01.jpg' },
  { imagePath: '/images/corte02.jpg' },
  { imagePath: '/images/corte03.jpg' },
  { imagePath: '/images/corte04.jpg' },
  { imagePath: '/images/corte03.jpg' },
  { imagePath: '/images/corte04.jpg' },
  { imagePath: '/images/corte02.jpg' },
  { imagePath: '/images/corte01.jpg' },
  { imagePath: '/images/corte01.jpg' },
  { imagePath: '/images/corte02.jpg' },
]

const ITEMS_PER_PAGE = 6

export default function PaginatedGrid() {
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(false)
  const [imgPath, setImgPath] = useState('')

  const handleOpenPhoto = (path: string): void => {
    setOpen(true)
    setImgPath(path)
  }

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)
  const paginatedData = images.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  )

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        {paginatedData.map((item, i) => (
          <Image
            key={i}
            src={item?.imagePath}
            alt="Barber Shop"
            width={400}
            height={300}
            className="rounded-md object-cover"
            onClick={() => handleOpenPhoto(item?.imagePath)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          type="button"
          className="bg-primary text-white px-4 py-1 rounded disabled:opacity-30"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="text-primary font-semibold">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          className="bg-primary text-white px-4 py-1 rounded disabled:opacity-30"
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 p-5"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <Image
            src={imgPath}
            alt="Barber Full"
            width={450}
            height={300}
            className="rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
