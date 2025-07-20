import { useMemo, useCallback } from 'react'
import { useProductStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const categories= [
  { "id": 0, "name": "Chairs", "image": "/images/chairs.webp" },
  { "id": 1, "name": "Tables", "image": "/images/tables.webp" },
  { "id": 2, "name": "Sofas", "image": "/images/sofas.webp"},
  { "id": 3, "name": "Armchairs", "image": "/images/armchairs.webp"},
  { "id": 4, "name": "Beds", "image": "/images/beds.webp"},
  { "id": 5, "name": "Storage", "image": "/images/storage.webp"},
  { "id": 6, "name": "Textiles", "image": "/images/textiles.webp"},
  { "id": 7, "name": "Lighting", "image": "/images/lighting.webp"},
  { "id": 8, "name": "Toys", "image": "/images/toys.webp"},
  { "id": 9, "name": "Decor", "image": "/images/decor.webp"}
];

function CategoriesSection() {
  const navigate = useNavigate();
  const products = useProductStore(state=>state.products);

  const categoryCounts = useMemo(() => {
  const countMap = {};
  categories.forEach(cat => {
    countMap[cat.name] = products?.filter(p => p.category === cat.name).length || 0;
  });
  return countMap;
}, [products]);

const goToCategory = useCallback((name) => {
  navigate(`/products/${name}`);
}, [navigate]);


  return (
    <div className='my-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6' >
      {categories.map(category=>(
        <div key={category.id} className='rounded-full overflow-hidden relative group cursor-pointer' onClick={() => goToCategory(category.name)}>

          <div className="scale-110 min-w-32 transition-all ease-in duration-300 group-hover:scale-100 custom-shadow" >
            <img src={category.image} alt={category.name} className='w-full h-full aspect-square '/>
          </div>

          <div className='absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group'>
            <h3 className='text-gray-800 bg-white rounded-2xl px-2 py-1'>{category.name}</h3>
            <span className='text-nowrap absolute left-1/2 top-full -translate-x-1/2 mt-2 text-white opacity-0 translate-y-6 transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0'>
              {categoryCounts[category.name]} products
            </span>          
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoriesSection;