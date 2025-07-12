import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useProductStore } from '../store/store';
import { useShallow } from 'zustand/shallow';

const fetchProducts = async () => {
    try {
        const response = await axios.get('/api-json/all-products.json');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};

function useProductData() {
    const {setProducts, setBestSeller, setNewProducts, setChairs, setSofas, setTables, setArmchairs} = useProductStore(
        useShallow(state=>({
            setProducts: state.setProducts,
            setBestSeller: state.setBestSeller,
            setNewProducts: state.setNewProducts,
            setChairs: state.setChairs,
            setSofas: state.setSofas,
            setTables: state.setTables,
            setArmchairs: state.setArmchairs
        }))
    )

    const { data:products, isError, isLoading } = useQuery({
        queryKey:["products"],
        queryFn: fetchProducts,
        staleTime: 1000*60*5,
    })
    // on success
    useEffect(()=>{
      if(products?.length>0) {
        setProducts(products);
        setBestSeller(products.filter(p=>p.bestSeller));
        setNewProducts(products.filter(p=>p.isNew))
    }
    },[products, setProducts,setBestSeller,setNewProducts])
    // on error
    if (isError) {
        console.error("Error fetching products");
        return { products: [], isError, isLoading };
    }
    // console.log(products)

    return {products, isError, isLoading}
}

export default useProductData;