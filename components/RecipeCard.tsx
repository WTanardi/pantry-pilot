import React, { FC, useState } from 'react'
import Image from 'next/image'
import { Prisma } from '@prisma/client'
import { X } from 'lucide-react'
import AddOrder from '@/app/dashboard/user/AddOrder'

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true
    name: true
    img: true
    step: true
    price: true
    ingredients: {
      select: {
        amount: true
        measurement: true
        ingredient: {
          select: {
            name: true
          }
        }
        ingredientId: true
      }
    }
  }
}>

interface RecipeCardProps {
  id: number
  name: string
  img: string | null
  ingredients: {
    amount: number
    measurement: string
    ingredient: {
      name: string
    }
    ingredientId: number
  }[]
  step: string[]
  price: number
  userIngArr: number[]
}

const RecipeCard: FC<RecipeCardProps> = ({
  id,
  name,
  img,
  ingredients,
  step,
  price,
  userIngArr,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Recipe Card */}
      <div
        className="flex rounded-lg shadow-xl w-80 space-x-4 bg-[#fafcff] items-center cursor-pointer"
        onClick={handleModal}
      >
        {/* Card Image */}
        <Image
          src={img ?? 'https://picsum.photos/200'}
          alt={`${name} recipe`}
          width={96}
          height={96}
          className="rounded-lg object-cover w-24"
        />
        {/* Recipe Details */}
        <div className="">
          <div className="text-lg">{name}</div>
          {/* <div className="font-light text-sm">
            You have all {ingredients.length} Ingredients
          </div> */}
        </div>
      </div>
      {/* Modal */}
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box p-0">
          <Image
            src={img ?? 'https://picsum.photos/200'}
            alt={`${name} image`}
            width={350}
            height={350}
            className="w-full h-36 object-cover"
          />
          <div className="text-sm p-6">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="mb-4">
              {ingredients.map((e, i) => (
                <li
                  key={i}
                  className={
                    userIngArr.includes(e.ingredientId) ? '' : 'text-red-500'
                  }
                >
                  {`- ${e.amount} ${e.measurement} ${e.ingredient.name}`}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol>
              {step.map((e, i) => (
                <li key={i}>{`${i + 1}. ${e}`}</li>
              ))}
            </ol>
          </div>
          <div className="modal-action">
            <div className="m-4">
              <AddOrder price={price} name={name} foodId={id} />
            </div>
          </div>
          <div
            className="absolute top-0 right-0 m-4 cursor-pointer"
            onClick={handleModal}
          >
            <X strokeWidth={4} color="gray" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeCard
