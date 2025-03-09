import React from "react";

import { Star } from "lucide-react";

import * as images from "@/assets/Fashion";

const imageNames = Object.keys(images);

 
const getRandomName = () => {
  const names = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomRating = () => (Math.random() * 5).toFixed(1);

const ImageCard = ({ image, name, rating }) => (
  <Card className="m-4 p-4 w-60 shadow-lg">
    <img
      src={`/images/${image}`}
      alt={name}
      className="w-full h-40 object-cover rounded-xl"
    />
    <CardContent className="mt-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="flex items-center mt-2">
        <Star className="text-yellow-500" size={20} />
        <span className="ml-2 text-lg">{rating} / 5</span>
      </div>
    </CardContent>
  </Card>
);

const ImageGallery = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {imageNames.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          name={getRandomName()}
          rating={getRandomRating()}
        />
      ))}
    </div>
  );
};


export default ImageGallery;

// Place your images in the "public/images" folder
// Use <ImageGallery /> in your main component to render the cards
