import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useArticlesData() {
    const fetchArticles = async() =>{
        try {
            const res = await axios.get('/api-json/all-articles.json');
            return res.data;
        } catch (error) {
            console.error(error.message)
        }
    }
    const {data: articles,isError, isLoading} = useQuery({
        queryKey:["articles"],
        queryFn:fetchArticles,
        staleTime: 1000*60*5
    })

  return {articles, searchError:isError, searchLoading:isLoading}
}

export default useArticlesData;