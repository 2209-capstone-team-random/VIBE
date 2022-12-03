import React,{useState} from 'react'

const CatCard = () => {

  const color = ['bg-red-700', 'bg-green-700', 'bg-blue-800', 'bg-yellow-800', 'bg-pink-600', 'bg-gray-600 ', 'bg-gray-800','bg-orange-800']
  const categories = ['ROCK', 'POP', 'EDM', 'HIP HOP', 'LATIN', 'INDIE', 'COUNTRY', 'R&B']
  // const image =[]
  const cat = categories.map((el, idx) =>
    <div key = {`cat${idx}`} className={`hover:shadow delay-50 duration-100 ${color[idx]} p-5 rounded-lg w-40 group`} href="">
  <img src="https://picsum.photos/250/250" className="w-full rounded shadow" />
      <h3 className="text-gray-200 font-bold mt-5">{ el }</h3>
    </div>)

const [catePicked,setCatePicked] = useState(0)
console.log(catePicked)

const clickHandler = ()=>{
 if(catePicked<3){
  setCatePicked(catePicked+1)
 }
}

  return (
    <div className="flex items-center justify-center absolute space-x-4 space-4 flex-wrap " onClick = {()=>clickHandler()}>
      {cat}
</div>
  )
}

export default CatCard