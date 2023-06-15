'use client'
import { useState, SyntheticEvent } from 'react'
import type { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Edit } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Ingredient = {
  id: number
  name: string
  categoryId: number
}

const UpdateIngredient = ({
  categories,
  ingredient,
}: {
  categories: Category[]
  ingredient: Ingredient
}) => {
  const [name, setName] = useState(ingredient.name)
  const [categoryId, setCategoryId] = useState(ingredient.categoryId)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.patch(`/api/ingredient/${ingredient.id}`, {
      name: name,
      categoryId: categoryId,
    })
    toast.success(`${name} updated`)
    setIsLoading(false)
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={handleModal}>
        <Edit />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {ingredient.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Ingredient Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Ingredient Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="select select-bordered"
              >
                {categories.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateIngredient
