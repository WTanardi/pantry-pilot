'use client'
import { SyntheticEvent, useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import axios from 'axios'
import { Prisma } from '@prisma/client'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { fetchData } from 'next-auth/client/_utils'

type Order = Prisma.OrderGetPayload<{}>

const AddOrder = ({
  price,
  name,
  foodId,
}: {
  price: number
  name: string
  foodId: number
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orders, setOrders] = useState<Order | null>(null)

  const fetcher = (url: string) => axios.get(url).then((res) => res.data)

  const { data: session } = useSession()

  const [newOrder, setNewOrder] = useState({
    userId: session?.user.id,
    foodId: foodId,
    totalPrice: Number(price),
    isPaid: false,
  })

  const [paid, setPaid] = useState(false)

  const createOrder = async () => {
    await axios
      .post('/api/order', {
        userId: newOrder.userId,
        foodId: newOrder.foodId,
        totalPrice: newOrder.totalPrice,
        isPaid: newOrder.isPaid,
      })
      .then(() => toast.success('Creating order...'))
      .catch(() => toast.error('Something went wrong!'))

    setIsOpen(!isOpen)

    const fetchData = async () => {
      try {
        const [orderResponse] = await Promise.all([fetcher('/api/order')])
        setOrders(orderResponse)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }

  const updatePayment = async (e: SyntheticEvent) => {
    e.preventDefault()

    !paid
      ? toast.error('Payment incomplete')
      : await axios
          .patch(`/api/order/${orders?.id}`, { isPaid: true })
          .then(() => toast.success('Order success'))
          .then(() => setIsOpen(!isOpen))
  }

  const deleteOrder = async () => {
    await axios
      .delete(`/api/order/${orders?.id}`)
      .then(() => toast.error('Order cancelled'))
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={createOrder} className="btn btn-primary">
        Order Now
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box ">
          <div className="text-black">
            <p className="text-2xl pb-4">Buy {name}</p>
            <div className="flex flex-row justify-between">
              <p className="text-lg">
                Make payment of ${price.toFixed(2)} to 082111442634
              </p>
              <button onClick={() => setPaid(!paid)}>
                <CheckCircle2 color={!paid ? 'red' : 'green'} />
              </button>
            </div>
          </div>
          <div className="modal-action">
            <div className="btn" onClick={deleteOrder}>
              Cancel
            </div>
            <div className="btn btn-primary" onClick={updatePayment}>
              Confirm
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOrder
