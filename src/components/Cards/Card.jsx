import React, { useState } from "react";
import edm from "../../assets/edm.jpeg"
import Nirvana from "../../assets/nirvana.jpeg"
import taylor from "../../assets/taylor.jpeg"
import snoop from "../../assets/snoop.jpeg"
import latin from "../../assets/latin.jpeg"
import starboy from "../../assets/starboy.jpeg"
import { getCount } from "../../redux/dbQueryThunks/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const categories = [
  { id: 1, cat: "ROCK", color: "bg-blue-500",img:Nirvana },
  { id: 2, cat: "POP", color: "bg-pink-400", img:taylor},
  { id: 3, cat: "EDM", color: "bg-green-500" ,img:edm},
  { id: 4, cat: "HIP HOP", color: "bg-blue-700", img:snoop},
  { id: 5, cat: "LATIN", color: "bg-orange-500",img:latin },
  { id: 6, cat: "COUNTRY", color: "bg-red-400 ", img: "https://picsum.photos/id/65/250/250" },
  { id: 7, cat: "R&B", color: "bg-red-500", img:starboy },
  { id: 8, cat: "INDIE", color: "bg-gray-500" ,img:"https://picsum.photos/id/334/250/250"},
];

const Card = () => {
  const [catePicked, setCatePicked] = useState(0);
  const [genre, setGenre] = useState([]);
  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(getCount(catePicked))
  }, [catePicked])
  
  

  const pickThreeCate = (event) => {
    if (catePicked < 3) {
      setCatePicked(catePicked + 1);
      setGenre([...genre, event.currentTarget.innerText]);
      if (genre.includes(event.currentTarget.innerText)) {
        setGenre(genre.filter((el) => el !== event.currentTarget.innerText));
        setCatePicked(catePicked - 1);
      }
    } else {
      if (genre.includes(event.currentTarget.innerText)) {
        setGenre(genre.filter((el) => el !== event.currentTarget.innerText));
        setCatePicked(catePicked - 1);
      }
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center absolute space-x-5 flex-wrap ">
        {categories.map((el, idx) => (
          <div
            key={el.id}
            className={
              genre.includes(el.cat)
                ? `scale-125 ${el.color} p-5 rounded-lg w-40 group `
                : `transition ease-in-out delay-0 ${el.color} hover:scale-105 duration-300 p-5 rounded-lg w-40 group `
            }
            onClick={pickThreeCate}
          >
            <img
              src= {el.img}
              className="w-full rounded shadow"
            />
            <h3 id="name" className="text-gray-200 font-bold mt-5">
              {el.cat}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
