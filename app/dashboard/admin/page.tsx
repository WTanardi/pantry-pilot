'use client'
import { Prisma } from '@prisma/client'
import axios from 'axios'
import { Carrot, LogOut, Plus, Receipt, Soup } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React, { FormEventHandler, useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Updateingredient from './UpdateIngredient'
import Deleteingredient from './DeleteIngredient'
import { X } from 'lucide-react'
import UpdateRecipe from './UpdateRecipe'
import DeleteRecipe from './DeleteRecipe'

type Ingredient = Prisma.IngredientGetPayload<{
  select: {
    id: true
    name: true
    category: true
    categoryId: true
  }
}>

type Category = Prisma.CategoryGetPayload<{
  select: {
    id: true
    name: true
    img: true
    ingredients: true
  }
}>

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true
    name: true
    img: true
    desc: true
    ingredients: true
    price: true
    step: true
  }
}>

type Order = Prisma.OrderGetPayload<{
  select: {
    id: true
    foodId: true
    food: {
      select: {
        name: true
      }
    }
    userId: true
    user: {
      select: {
        name: true
      }
    }
    totalPrice: true
    isPaid: true
  }
}>

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function AdminDashboard() {
  const router = useRouter()

  // Data fetching hooks
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [orders, setOrders] = useState<Order[] | null>(null)

  const sortedIngredients = ingredients?.slice(0).sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  // Navigation hooks
  const [activeTab, setActiveTab] = useState<number>(1)
  const handleTabChange = (tabNo: number) => {
    setActiveTab(tabNo)
  }

  // Ingredient add modal
  const [isIngredientAddOpen, setIsIngredientAddOpen] = useState(false)

  const handleIngredientAddModal = () => {
    setIsIngredientAddOpen(!isIngredientAddOpen)
  }

  // Recipe add modal
  const [isRecipeAddOpen, setIsRecipeAddOpen] = useState(false)

  const handleRecipeAddModal = () => {
    setIsRecipeAddOpen(!isRecipeAddOpen)
  }

  // Page load
  const [isLoading, setIsLoading] = useState(false)

  // CRUD hooks
  // Ingredient CRUD
  const [newIngredient, setNewIngredient] = useState({
    id: 0,
    name: '',
    categoryId: 1,
  })

  const addIngredient: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    await axios
      .post('/api/ingredient', {
        id: newIngredient.id,
        name: newIngredient.name,
        categoryId: newIngredient.categoryId,
      })
      .then(() => toast.success('Ingredient Add Success'))
      .catch(() => toast.error('Something went wrong!'))

    setIsLoading(false)

    setNewIngredient({
      id: 0,
      name: '',
      categoryId: 1,
    })

    router.refresh

    setIsIngredientAddOpen(false)
  }

  // Recipe CRUD
  const [newRecipe, setNewRecipe] = useState({
    id: 0,
    name: '',
    desc: '',
    price: 1,
    step: [''],
    ingredients: [{ ingredientId: 1, amount: 1, measurement: '' }],
  })

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string | number,
    removeIngredient?: boolean,
  ) => {
    if (removeIngredient) {
      const updatedIngredients = [...newRecipe.ingredients]
      updatedIngredients.splice(index, 1)
      setNewRecipe({
        ...newRecipe,
        ingredients: updatedIngredients,
      })
    } else {
      const updatedIngredients = [...newRecipe.ingredients]
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      }
      setNewRecipe({
        ...newRecipe,
        ingredients: updatedIngredients,
      })
    }
  }

  const addRecipe: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    await axios
      .post('/api/recipe', {
        id: newRecipe.id,
        name: newRecipe.name,
        desc: newRecipe.desc,
        price: newRecipe.price,
        step: newRecipe.step,
        ingredients: newRecipe.ingredients,
      })
      .then(() => toast.success('Recipe Add Success'))
      .catch(() => toast.error('Something went wrong!'))

    setIsLoading(false)

    setNewRecipe({
      id: 0,
      name: '',
      desc: '',
      price: 1,
      step: [''],
      ingredients: [{ ingredientId: 1, amount: 1, measurement: '' }],
    })

    setIsRecipeAddOpen(false)

    router.refresh()
  }

  const removeStep = (index: number) => {
    const updatedStep = [...newRecipe.step]
    updatedStep.splice(index, 1)
    setNewRecipe({
      ...newRecipe,
      step: updatedStep,
    })
  }

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          ingredientResponse,
          categoryResponse,
          recipeResponse,
          orderResponse,
        ] = await Promise.all([
          fetcher('/api/ingredient'),
          fetcher('/api/category'),
          fetcher('/api/recipe'),
          fetcher('/api/adminOrder'),
        ])
        setIngredients(ingredientResponse)
        setCategories(categoryResponse)
        setRecipes(recipeResponse)
        setOrders(orderResponse)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [ingredients, categories, recipes, orders])

  // Loader
  if (!ingredients || !categories || !recipes || !orders) {
    // Handle loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex mx-auto">
        {/* Mobile Nav */}
        <nav className="h-20 fixed bottom-0 left-0 z-10 flex justify-around w-full p-4 bg-white shadow lg:hidden">
          <button
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => handleTabChange(1)}
          >
            <Carrot />
            <span className="text-xs mt-1">Ingredient</span>
          </button>
          <button
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => handleTabChange(2)}
          >
            <Soup />
            <span className="text-xs mt-1">Recipe</span>
          </button>
          <button
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => handleTabChange(3)}
          >
            <Receipt />
            <span className="text-xs mt-1">Order</span>
          </button>
          <button
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut />
            <span className="text-xs mt-1">Sign out</span>
          </button>
        </nav>
        {/* <!-- Side Bar --> */}
        <div className="flex w-72 h-screen bg-rose-600 text-rose-300 max-lg:hidden">
          <div className="flex flex-col p-8 text-2xl gap-6 w-full">
            <div
              onClick={() => handleTabChange(1)}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === 1 ? 'text-white' : 'text-rose-300'
              }`}
            >
              <Carrot />
              <p>Ingredient</p>
            </div>
            <div
              onClick={() => handleTabChange(2)}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === 2 ? 'text-white' : ''
              }`}
            >
              <Soup />
              <p>Recipe</p>
            </div>
            <div
              onClick={() => handleTabChange(3)}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === 3 ? 'text-white' : ''
              }`}
            >
              <Receipt />
              <p>Order</p>
            </div>
            <div>
              <button onClick={() => signOut({ callbackUrl: '/login' })}>
                <LogOut size={36}></LogOut>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Main Content --> */}
        <div className="w-full p-8 pb-0">
          {activeTab === 1 && (
            <>
              {/* Ingredient Add Modal */}
              <div
                className={isIngredientAddOpen ? 'modal modal-open' : 'modal'}
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Add New Ingredient</h3>
                  <form onSubmit={addIngredient}>
                    <div className="form-control w-full">
                      <label className="label font-bold">Ingredient Name</label>
                      <input
                        type="text"
                        value={newIngredient.name}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            name: e.target.value,
                          })
                        }
                        className="input input-bordered"
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="form-control w-full">
                      <label className="label font-bold">Category</label>
                      <select
                        value={newIngredient.categoryId}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            categoryId: Number(e.target.value),
                          })
                        }
                        className="select select-bordered"
                      >
                        <option value="" disabled>
                          Select a Brand
                        </option>
                        {categories.map((e) => (
                          <option value={e.id} key={e.id}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="modal-action">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleIngredientAddModal}
                      >
                        Close
                      </button>
                      {!isLoading ? (
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      ) : (
                        <button type="button" className="btn loading">
                          Saving...
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              {/* Ingredient list table */}
              <div className="flex justify-between py-8">
                <p className="text-4xl lg:text-6xl font-bold">Ingredients</p>
                <button
                  className="px-2 lg:p-4 border-rose-600 rounded-xl bg-rose-600"
                  onClick={handleIngredientAddModal}
                >
                  <Plus className="text-white" />
                </button>
              </div>
              <div className="max-h-[80vh] w-full overflow-scroll hide-scrollbar pb-20 lg:pb-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-2">No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredients.map((e, i) => (
                      <TableRow key={i} className="max-lg:text-xs">
                        <TableCell className="font-medium px-2">
                          {i + 1}
                        </TableCell>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>{e.category.name}</TableCell>
                        <TableCell className="flex gap-2 lg:gap-8">
                          <Updateingredient
                            ingredient={e}
                            categories={categories}
                          />
                          <Deleteingredient ingredient={e} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              {/* Recipe Add Modal */}
              <div className={isRecipeAddOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Add New Recipe</h3>
                  <form onSubmit={addRecipe} className="gap-2 flex-col flex">
                    {/* Name */}
                    <div className="form-control w-full">
                      <label className="label font-bold">Recipe Name</label>
                      <input
                        type="text"
                        value={newRecipe.name}
                        onChange={(e) =>
                          setNewRecipe({
                            ...newRecipe,
                            name: e.target.value,
                          })
                        }
                        className="input input-bordered"
                        placeholder="Recipe name"
                      />
                    </div>
                    {/* Desc */}
                    <div className="form-control w-full">
                      <label className="label font-bold">Description</label>
                      <input
                        type="text"
                        value={newRecipe.desc}
                        onChange={(e) =>
                          setNewRecipe({
                            ...newRecipe,
                            desc: e.target.value,
                          })
                        }
                        className="input input-bordered"
                        placeholder="Description"
                      />
                    </div>
                    {/* Ingredients */}
                    <div className="form-control w-full">
                      <label className="label font-bold">Ingredients</label>
                      {newRecipe.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="flex gap-2 pl-2 mb-2 border-l-2 justify-between"
                        >
                          <div className="form-control flex-1 w-1/3">
                            <select
                              value={ingredient.ingredientId}
                              onChange={(e) =>
                                handleIngredientChange(
                                  index,
                                  'ingredientId',
                                  Number(e.target.value),
                                )
                              }
                              className="select select-bordered"
                            >
                              <option value="" disabled>
                                Select an Ingredient
                              </option>
                              {sortedIngredients?.map((ingredient) => (
                                <option
                                  key={ingredient.id}
                                  value={ingredient.id}
                                >
                                  {ingredient.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-control flex-1 w-1/12">
                            <input
                              type="number"
                              value={ingredient.amount}
                              step={0.1}
                              onChange={(e) =>
                                handleIngredientChange(
                                  index,
                                  'amount',
                                  Number(e.target.value),
                                )
                              }
                              className="input input-bordered"
                            />
                          </div>
                          <div className="form-control flex-1 w-1/12">
                            <input
                              type="text"
                              value={ingredient.measurement}
                              onChange={(e) =>
                                handleIngredientChange(
                                  index,
                                  'measurement',
                                  e.target.value,
                                )
                              }
                              className="input input-bordered"
                              placeholder="Cup"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-error mt-auto"
                            onClick={() =>
                              handleIngredientChange(index, '', '', true)
                            }
                          >
                            <X className="text-white" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-primary ml-2"
                        onClick={() => {
                          setNewRecipe({
                            ...newRecipe,
                            ingredients: [
                              ...newRecipe.ingredients,
                              { ingredientId: 0, amount: 0, measurement: '' },
                            ],
                          })
                        }}
                      >
                        Add Ingredient
                      </button>
                    </div>
                    {/* Price */}
                    <div className="form-control w-full">
                      <label className="label font-bold">Price</label>
                      <input
                        type="number"
                        value={newRecipe.price}
                        step={0.01}
                        onChange={(e) =>
                          setNewRecipe({
                            ...newRecipe,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="input input-bordered"
                      />
                    </div>
                    {/* Steps */}
                    <div className="form-control w-full">
                      <label className="label font-bold">Steps</label>
                      {newRecipe.step.map((e, i) => (
                        <div
                          className="flex justify-between items-center pl-2 mb-2 border-l-2"
                          key={i}
                        >
                          <input
                            type="text"
                            value={e}
                            onChange={(e) => {
                              const updatedStep = [...newRecipe.step]
                              updatedStep[i] = e.target.value
                              setNewRecipe({
                                ...newRecipe,
                                step: updatedStep,
                              })
                            }}
                            className="input input-bordered w-full"
                            placeholder={`Step ${i + 1}`}
                          />
                          <button
                            type="button"
                            className="btn btn-error ml-2"
                            onClick={() => removeStep(i)}
                          >
                            <X className="text-white" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-primary ml-2"
                        onClick={() => {
                          setNewRecipe({
                            ...newRecipe,
                            step: [...newRecipe.step, ''],
                          })
                        }}
                      >
                        Add Step
                      </button>
                    </div>
                    {/* Actions */}
                    <div className="modal-action">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleRecipeAddModal}
                      >
                        Close
                      </button>
                      {!isLoading ? (
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      ) : (
                        <button type="button" className="btn loading">
                          Saving...
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              {/* Recipe list table */}
              <div className="flex justify-between py-8">
                <p className="text-4xl lg:text-6xl font-bold">Recipes</p>
                <button
                  className="px-3 lg:p-4 border-rose-600 rounded-xl bg-rose-600"
                  onClick={handleRecipeAddModal}
                >
                  <Plus className="text-white" />
                </button>
              </div>
              <div className="max-h-[80vh] w-full overflow-scroll hide-scrollbar pb-20 lg:pb-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-2">No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="max-md:hidden">
                        Description
                      </TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="max-md:hidden">Steps</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipes.map((e, i) => (
                      <TableRow key={i} className="max-lg:text-xs">
                        <TableCell className="font-medium px-2">
                          {i + 1}
                        </TableCell>
                        <TableCell>{e.name}</TableCell>
                        <TableCell className="max-md:hidden">
                          {e.desc}
                        </TableCell>
                        <TableCell>${e.price}</TableCell>
                        <TableCell className="max-md:hidden">
                          {e.step.map((e, i) => (
                            <p key={i}>
                              {i + 1}. {e}
                            </p>
                          ))}
                        </TableCell>
                        <TableCell className="flex gap-2 lg:gap-8">
                          <UpdateRecipe recipes={e} />
                          <DeleteRecipe recipes={e} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {activeTab === 3 && (
            <>
              <div className="py-8">
                <p className="text-4xl lg:text-6xl font-bold">Orders</p>
              </div>
              <div className="max-h-[80vh] w-full overflow-scroll hide-scrollbar pb-20 lg:pb-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-2">No</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Food</TableHead>
                      <TableHead className="max-md:hidden">Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((e, i) => (
                      <TableRow key={i} className="max-lg:text-xs">
                        <TableCell className="font-medium px-2">
                          {i + 1}
                        </TableCell>
                        <TableCell>{e.user.name}</TableCell>
                        <TableCell>{e.food.name}</TableCell>
                        <TableCell className="max-md:hidden">
                          ${e.totalPrice}
                        </TableCell>
                        <TableCell>
                          {e.isPaid ? 'Success' : 'Cancelled'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
