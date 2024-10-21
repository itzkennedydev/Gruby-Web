import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { LocationMarkerIcon, HeartIcon } from '@heroicons/react/outline';
import { useCart } from '~/contexts/CartContext';
import { db } from '~/server/db';
import { chefs, dishes } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

interface Chef {
  id: string;
  name: string;
  image: string;
  chefImage: string;
  location: string;
  description: string;
  category: string;
  specialties: string[];
}

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const chef = await db.query.chefs.findFirst({
    where: eq(chefs.id, id),
    with: {
      dishes: true,
    },
  });

  if (!chef) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chef: JSON.parse(JSON.stringify(chef)),
    },
  };
}

interface DetailPageProps {
  chef: Chef & { dishes: Dish[] };
}

const DetailPage: React.FC<DetailPageProps> = ({ chef }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (dish: Dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
      image: dish.image,
    });
  };

  if (!chef) {
    return (
      <div className="container mx-auto py-12">
        <p className="text-center text-gray-600">Chef not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Banner and Profile Section */}
      <div className="relative mb-20">
        <div className="rounded-lg overflow-hidden">
          <div className="relative h-72 w-full">
            <Image
              src={chef.image}
              alt={chef.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={chef.chefImage}
              alt={chef.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Chef and Location Info */}
      <div className="mb-8 mt-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{chef.name}</h1>
        <div className="flex items-center text-gray-500 mb-2">
          <LocationMarkerIcon className="w-5 h-5 mr-1" />
          <p>{chef.location || 'Location not specified'}</p>
        </div>
        <p className="text-lg text-gray-700">{chef.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* About Chef Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">About the Chef</h2>
            <p className="text-gray-700 mb-4">
              {chef.name} is a renowned chef specializing in {chef.category} cuisine. With years of experience and a passion for creating delicious meals, {chef.name.split(' ')[0]} brings authentic flavors and innovative techniques to every dish.
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {chef.specialties?.map((specialty, index) => (
                  <span key={index} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Book Chef Section */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Book this Chef</h2>
            <button className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-900">
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Featured Dishes Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chef.dishes && chef.dishes.length > 0 ? (
            chef.dishes.map((dish) => (
              <div key={dish.id} className="bg-white rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white rounded-full p-2">
                      <HeartIcon className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">${dish.price.toFixed(2)}</p>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
                      onClick={() => handleAddToCart(dish)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No dishes available for this chef.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
