import Image from 'next/image'
import Link from 'next/link'
import team from '@/public/team.webp'

const AboutUs = () => {
  return (
    <>
      <section className="pt-16">
        <div className="container mx-auto flex flex-col lg:grid lg:grid-rows-4 lg:grid-cols-2 items-center px-6">
          <div className="text-4xl min-[424px]:text-5xl md:text-6xl font-bold lg:row-start-1 lg:col-start-2 lg:row-span-1 lg:col-span-3 lg:bottom-0 lg:left-0 lg:flex lg:self-end">
            <p>Who are we?</p>
          </div>
          <div className="w-full lg:w-1/2 flex lg\:grid justify-center lg:row-start-1 lg:col-start-1 lg:row-span-4 lg:col-span-2">
            <Image src={team} alt="team picture" className="w-full"></Image>
          </div>
          <div className="max-lg:max-w-xl text-center lg:text-left items-center lg:row-start-2 lg:col-start-2 lg:row-span-3 lg:col-span-3 opacity-90">
            <p className=" mb-4">
              Here at Pantry Pilot, we believe that cooking delicious, healthy
              meals at home should be easy and stress-free.
            </p>
            <p className="mb-4">
              That&apos;s why we&apos;ve created a platform that helps you make
              the most of the ingredients you have in your pantry, fridge, and
              freezer. With our innovative recipe generator, you can quickly and
              easily find recipes that match your dietary preferences and
              available ingredients.
            </p>
            <p className=" mb-8">
              Our mission is to make home cooking more accessible and enjoyable
              for everyone, regardless of their cooking skills or experience.
            </p>
            <Link href="/login">
              <button className="px-4 py-2 font-semibold text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                Join Us Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs
