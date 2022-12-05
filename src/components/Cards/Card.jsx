import React from "react";

const Card = ({ categories }) => {
  return (
    <>
      {categories.map((el, idx) => (
        <div
          key={el.id}
          className={` transition ease-in-out delay-0 ${el.color} hover:-translate-y-5 duration-300 p-5 rounded-lg w-40 group `}
          href=""
          value={`${el.id}`
          }
        >
          <img
            src="https://picsum.photos/250/250"
            className="w-full rounded shadow"
          />
          <h3 id="name" className="text-gray-200 font-bold mt-5">
            {el.cat}
          </h3>
        </div>
      ))}
    </>
  );
};

export default Card;
