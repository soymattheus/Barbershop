'use client'

import React from 'react'
import Modal from '../ui/modal'

interface Service {
  name: string
  description: string
  price: number
}

interface Category {
  title: string
  services: Service[]
}

export default function Services() {
  const [selectedService, setSelectedService] = React.useState<Category>()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const services: Category[] = [
    {
      title: 'Haircuts',
      services: [
        {
          name: 'Classic Haircut',
          description: 'A traditional cut using clippers or scissors.',
          price: 25,
        },
        {
          name: 'Skin Fade / Bald Fade',
          description: 'A sharp fade that goes all the way down to the skin.',
          price: 30,
        },
        {
          name: 'Taper Fade',
          description:
            'A clean and subtle fade around the neckline and sideburns.',
          price: 28,
        },
        {
          name: 'Scissor Cut',
          description:
            'A full haircut using only scissors for a more natural finish.',
          price: 32,
        },
        {
          name: 'Kids’ Haircut',
          description: 'Fresh cuts for the little ones, styled to perfection.',
          price: 20,
        },
        {
          name: 'Hair Designs / Razor Art',
          description: 'Custom lines and designs shaved in for a bold look.',
          price: 35,
        },
      ],
    },
    {
      title: 'Beard Services',
      services: [
        {
          name: 'Beard Trim',
          description: 'Clean up and shape your beard for a sharp finish.',
          price: 15,
        },
        {
          name: 'Hot Towel Shave',
          description:
            'Traditional straight-razor shave with a relaxing hot towel.',
          price: 22,
        },
        {
          name: 'Razor Line-Up / Shape-Up',
          description: 'Razor-sharp edges around the beard and hairline.',
          price: 18,
        },
        {
          name: 'Beard Color',
          description:
            'Cover greys or switch up your beard tone with a custom dye.',
          price: 20,
        },
      ],
    },
    {
      title: 'Premium Add-Ons',
      services: [
        {
          name: 'Eyebrow Shaping',
          description: 'Crisp, clean brows using razor or threading.',
          price: 10,
        },
        {
          name: 'Hair Styling',
          description: 'Styled with pomade, gel, or spray—your look, your way.',
          price: 12,
        },
        {
          name: 'Shampoo & Wash',
          description:
            'Hair wash with scalp massage and professional products.',
          price: 8,
        },
        {
          name: 'Facial / Black Mask',
          description: 'Deep cleansing facial with detoxifying mask.',
          price: 15,
        },
        {
          name: 'Steam Treatment',
          description: 'Opens up pores before a shave for smoother skin.',
          price: 10,
        },
        {
          name: 'Scalp Massage',
          description:
            'Relaxing massage to boost circulation and chill you out.',
          price: 12,
        },
        {
          name: 'Nose / Ear Waxing',
          description: 'Quick waxing for unwanted hair, clean and painless.',
          price: 10,
        },
      ],
    },
    {
      title: 'Latin-Style Services',
      services: [
        {
          name: 'Puerto Rican or Dominican Style Cuts',
          description:
            'Sharp fades, precise lines, and that clean Latino finish.',
          price: 30,
        },
        {
          name: 'Cut & Blow Dry Combo',
          description: 'Perfect cut followed by a pro blowout.',
          price: 35,
        },
        {
          name: 'The Full Service',
          description:
            'Haircut, beard, eyebrows, facial — the full experience.',
          price: 60,
        },
      ],
    },
    {
      title: 'Grooming & Self-Care',
      services: [
        {
          name: 'Facial Scrub',
          description:
            'Deep exfoliation to cleanse pores and refresh your skin.',
          price: 15,
        },
        {
          name: 'Hydrating Facial',
          description: 'Restores moisture and glow to dry or tired skin.',
          price: 20,
        },
        {
          name: 'Scalp Detox Treatment',
          description: 'Removes buildup and promotes healthy hair growth.',
          price: 18,
        },
        {
          name: 'Color Touch-Up',
          description: 'Blends in grays or refreshes faded hair color.',
          price: 25,
        },
        {
          name: 'Hair Relaxer / Texturizer',
          description: 'Chemical treatment to soften curls or waves.',
          price: 30,
        },
        {
          name: 'After-Cut Cologne Spray',
          description: 'Signature fragrance to finish your session right.',
          price: 5,
        },
      ],
    },
  ]

  type Service = {
    name: string
    description: string
  }

  type Category = {
    title: string
    services: Service[]
  }

  function filterCategory(categoryTitle: string): void {
    const category = services.find(
      cat => cat.title.toLowerCase() === categoryTitle.toLowerCase()
    )
    setSelectedService(category)
    setIsOpen(true)
    console.log(category)
  }

  return (
    <div className="flex flex-col w-full gap-4 items-stretch">
      <div className="flex w-full items-center justify-center">
        <p className="text-text text-2xl text-bold">Available services</p>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-5 items-center">
        <div
          onClick={() => filterCategory('Haircuts')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              filterCategory('Haircuts')
            }
          }}
          className="flex w-full md:w-1/4 text-text justify-center items-center bg-blue h-24 rounded-2xl cursor-pointer"
        >
          <p className="font-bold">Haircuts</p>
        </div>

        <div
          onClick={() => filterCategory('Beard Services')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              filterCategory('Beard Services')
            }
          }}
          className="flex w-full md:w-1/4 text-text justify-center items-center bg-blue h-24 rounded-2xl cursor-pointer"
        >
          <p className="font-bold">Beard Services</p>
        </div>

        <div
          onClick={() => filterCategory('Premium Add-Ons')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              filterCategory('Premium Add-Ons')
            }
          }}
          className="flex w-full md:w-1/4 text-text justify-center items-center bg-blue h-24 rounded-2xl cursor-pointer"
        >
          <p className="font-bold">Premium Add-Ons</p>
        </div>

        <div
          onClick={() => filterCategory('Latin-Style Services')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              filterCategory('Latin-Style Services')
            }
          }}
          className="flex w-full md:w-1/4 text-text justify-center items-center bg-blue h-24 rounded-2xl cursor-pointer"
        >
          <p className="font-bold">Latin-Style Services</p>
        </div>

        <div
          onClick={() => filterCategory('Grooming & Self-Care')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              filterCategory('Grooming & Self-Care')
            }
          }}
          className="flex w-full md:w-1/4 text-text justify-center items-center bg-blue h-24 rounded-2xl cursor-pointer"
        >
          <p className="font-bold">Grooming & Self-Care</p>
        </div>
      </div>

      <Modal
        title={selectedService?.title || ''}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <ul>
          {selectedService?.services?.map((item: Service, index: number) => (
            <React.Fragment key={index}>
              <li className="text-text font-bold">
                {item?.name} - ${item?.price.toFixed(2)}
              </li>
              <p className="text-text text-sm pl-3 italic">
                {item?.description}
              </p>
            </React.Fragment>
          ))}
        </ul>
      </Modal>
    </div>
  )
}
