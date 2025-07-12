import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useCountries() {
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            return response.data;
        } catch (error) {
            console.error(error, "network error");
            throw error;
        }
    };

    const { data: countries, isError: isErrorCountries } = useQuery({
        queryKey: ["countries"],
        queryFn: fetchCountries,
        select: (countries) => 
            countries.map(country => country.name.common ),
        staleTime: 1000 * 60 * 5,
    });

    return { countries, isErrorCountries };
}

export default useCountries;
