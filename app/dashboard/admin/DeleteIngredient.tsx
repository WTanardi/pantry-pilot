'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { XSquare } from 'lucide-react'
import toast from 'react-hot-toast'

type Ingredient = {
  id: number
  name: string
  categoryId: number
}

const Deleteingredient = ({ ingredient }: { ingredient: Ingredient }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async (ingredientId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/ingredient/${ingredientId}`)
    toast.success(`${ingredient.name} deleted`)
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
        <XSquare />
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete {ingredient.name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(ingredient.id)}
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

export default Deleteingredient
