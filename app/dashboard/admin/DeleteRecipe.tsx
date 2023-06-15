'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { XSquare } from 'lucide-react'
import toast from 'react-hot-toast'

type Recipe = {
  id: number
  name: string
  img: string | null
  desc: string | null
  price: number
  step: string[]
}

const DeleteRecipe = ({ recipes }: { recipes: Recipe }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async (recipeId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/recipe/${recipeId}`)
    toast.success(`${recipes.name} deleted`)
    setIsLoading(false)
    await router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={handleModal}>
        <XSquare />
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete {recipes.name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(recipes.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteRecipe
