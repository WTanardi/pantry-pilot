import { FC } from 'react'
import Image from 'next/image'

interface TestimonialCardProps {
  content: string
  name: string
  location: string
  isWoman: boolean
  id: number
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  content,
  name,
  location,
  isWoman,
  id,
}) => {
  return (
    <>
      <div className="md:w-1/4">
        <div className="shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-4 py-4">
            <p className=" mb-4">&quot;{content}&quot;</p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500">
                <Image
                  src={`https://source.unsplash.com/featured/400x400/?${
                    isWoman === true ? 'woman' : 'man'
                  },face&${id + 1}`}
                  alt="testimonial author"
                  height={30}
                  width={30}
                  className="h-full w-full object-cover"
                ></Image>
              </div>
              <div className="ml-4">
                <p className="opacity-80 text-sm font-semibold">{name}</p>
                <p className="opacity-60 text-sm">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Testimonials = () => {
  const reviews = [
    {
      name: 'Jane Doe',
      isWoman: true,
      location: 'Los Angeles, CA',
      content:
        "I have tried many recipe websites but none of them are as easy to use and accurate as Pantry Pilot. I'm always able to find a great recipe based on what I have in my fridge.",
    },
    {
      name: 'Mike',
      isWoman: false,
      location: 'Houston, TX',
      content:
        "As someone who's not the most confident cook, I love how easy these recipes are to follow. They've helped me step up my cooking game and impress my friends and family!",
    },
    {
      name: 'Sofia',
      isWoman: true,
      location: 'New York City, NY',
      content:
        "I've tried a ton of different recipe websites, but this one is by far the best. The recipes are delicious and unique, and the fact that I can order food directly from the site is great!",
    },
    {
      name: 'Rachel',
      isWoman: true,
      location: 'Chicago, IL',
      content:
        'This tool has saved me so much time and money on meal planning. I no longer have to guess what to make for dinner or run to the grocery store for a single ingredient.',
    },
    {
      name: 'Jessica',
      isWoman: true,
      location: 'Miami, FL',
      content:
        "This website is a lifesaver! I'm always looking for new recipes, and the fact that I can customize them based on what's in my pantry is amazing. Highly recommend!",
    },
  ]

  return (
    <>
      <section className="py-16">
        <p className="max-md:max-w-xs text-4xl min-[424px]:text-5xl md:text-6xl font-bold mb-8 md:mb-12 text-center mx-auto">
          What our customers say
        </p>
        <div className="flex flex-wrap mx-8 gap-6 lg:gap-12 justify-center">
          {reviews.map((review, index) => (
            <TestimonialCard
              key={index}
              id={index}
              isWoman={review.isWoman}
              name={review.name}
              location={review.location}
              content={review.content}
            ></TestimonialCard>
          ))}
        </div>
      </section>
    </>
  )
}

export default Testimonials
