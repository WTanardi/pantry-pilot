import Image from 'next/image'
import rendang from '@/public/product/rendang.webp'
import spaghetti from '@/public/product/spaghetti.webp'
import foodBox from '@/public/product/foodbox.webp'

const ProductsServices = () => {
  const products = [
    {
      path: rendang,
      title: 'Local Recipes',
      content:
        'Experience the unique and delicious flavors of your with our collection of local recipes! Discover easy-to-follow recipes that will make mealtime a memorable experience for you and your loved ones.',
    },
    {
      path: foodBox,
      title: 'Food Order',
      content:
        'Try out new flavors from your favorite restaurants before cooking! Order from nearby restaurants and get delicious meals delivered straight to your door. Explore new cuisines with ease.',
    },
    {
      path: spaghetti,
      title: 'International Recipes',
      content:
        'Explore the world through your taste buds with our collection of international recipes! Discover new and exciting flavors that will take your taste buds on a culinary journey.',
    },
  ]

  return (
    <>
      <section className="flex flex-col pt-16">
        <div className="text-center text-4xl min-[424px]:text-5xl md:text-6xl font-bold md:pb-8">
          <p>What we offer</p>
        </div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap -mx-4 justify-evenly">
            {products.map((product, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4" key={index}>
                <div className="flex justify-center">
                  <Image
                    src={product.path}
                    alt={`Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-64"
                  ></Image>
                </div>
                <div className="text-center px-4 py-4">
                  <p className="opacity-90 font-bold text-3xl mb-4">
                    {product.title}
                  </p>
                  <p className="opacity-70 text-sm mb-4">{product.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsServices
