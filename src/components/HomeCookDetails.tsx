import Image from 'next/image';

interface HomeCook {
  id: string;
  name: string;
  image?: string;
  cuisine?: string;
  experience?: string;
  bio?: string;
}

interface HomeCookDetailsProps {
  homeCook: HomeCook;
}

const DEFAULT_IMAGE = '/default-home-cook-image.webp';
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 200;

export function HomeCookDetails({ homeCook }: HomeCookDetailsProps) {
  const homeCookImage = homeCook.image ?? DEFAULT_IMAGE;
  const homeCookName = homeCook.name ?? 'Unknown Home Cook';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{homeCookName}</h1>
      <Image
        src={homeCookImage}
        alt={homeCookName}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="rounded-lg"
        loading="lazy"
        priority={false}
      />
      {homeCook.cuisine && (
        <p className="text-gray-600 mt-2">Cuisine: {homeCook.cuisine}</p>
      )}
      {homeCook.experience && (
        <p className="text-gray-600">Experience: {homeCook.experience}</p>
      )}
      {homeCook.bio && (
        <p className="text-gray-700 mt-4">{homeCook.bio}</p>
      )}
    </div>
  );
}
