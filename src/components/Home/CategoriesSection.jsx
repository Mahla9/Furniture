import React from 'react'

const categories= [
  { "id": 0, "name": "Chairs", "amount-products": "16", "image": "/images/chairs.jpeg" },
  { "id": 1, "name": "Tables", "amount-products": "16", "image": "/images/tables.jpeg" },
  { "id": 2, "name": "Sofas", "amount-products": "16", "image": "/images/sofas.jpeg"},
  { "id": 3, "name": "Armchairs", "amount-products": "16", "image": "/images/armchairs.jpeg"},
  { "id": 4, "name": "Beds", "amount-products": "16", "image": "/images/beds.jpeg"},
  { "id": 5, "name": "Storage", "amount-products": "16", "image": "/images/storage.jpeg"},
  { "id": 6, "name": "Textiles", "amount-products": "16", "image": "/images/textiles.jpeg"},
  { "id": 7, "name": "Lighting", "amount-products": "16", "image": "/images/lighting.jpeg"},
  { "id": 8, "name": "Toys", "amount-products": "16", "image": "/images/toys.jpeg"},
  { "id": 9, "name": "Decor", "amount-products": "16", "image": "/images/decor.jpeg"}
]

function CategoriesSection() {
  return (
    <div className='my-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
      {categories.map(category=>(
        <div key={category.id} className='rounded-full overflow-hidden relative group'>

          <div className="scale-110 transition-all ease-in duration-300 group-hover:scale-100 custom-shadow" >
            <img src={category.image} alt={category.name} className='w-full h-full aspect-square '/>
          </div>

          <div className='absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group'>
            <h3 className='text-gray-800 bg-white rounded-2xl px-2 py-1'>{category.name}</h3>
            <span className='text-nowrap absolute left-1/2 top-full -translate-x-1/2 mt-2 text-white opacity-0 translate-y-6 transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0'>
              {category['amount-products']} products
            </span>          
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoriesSection;
