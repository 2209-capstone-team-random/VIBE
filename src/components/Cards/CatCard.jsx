import React, { useState } from "react";
import Card from "./Card";
const CatCard = () => {
  const [catePicked, setCatePicked] = useState(0);
  const [selectedId, setSelectedId] = useState(null)

  const categories = [
    { id: 1, cat: "ROCK" ,  color:"bg-red-700"},
    { id: 2, cat: "POP" , color:"bg-gray-800"},
    { id: 3, cat: "EDM",  color: "bg-green-700" },
    { id: 4, cat: "HIP HOP", color:   "bg-blue-800"},
    { id: 5, cat: "LATIN", color: "bg-yellow-800"},
    { id: 6, cat: "INDIE", color:"bg-pink-600" },
    { id: 7, cat: "COUNTRY" , color: "bg-gray-600 "},
    { id: 8, cat: "R&B" , color: "bg-orange-800"},
  ];
  const pickThreeCate = (event) => {
    console.log("event", event);
  };

  return (
    <div className="transition ease-in-out delay-150 flex items-center justify-center absolute space-x-4 space-4 flex-wrap " onClick={pickThreeCate }>
      <Card categories={categories} />
      </div>
  );
};

export default CatCard;
