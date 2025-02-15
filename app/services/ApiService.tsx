import axios from "axios";

interface ApiData {
    title: string;
    description: string;
    author: string;
    url: string;
    urlToImage: string;
}

interface Notices {
    articles: ApiData[];
}

// const API_KEY = "d487ca852784417ea7b0015ee95859d8";
const API_KEY = "00f74d4a561f474f897a0cd68807de99";

export const fetchNews = async (category: string): Promise<ApiData[]> => {
    try {
        const response = await axios.get<Notices>('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us', 
                category: category, 
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (err: any) {
        console.error('Error al obtener las noticias:', err);
        throw new Error('Error al obtener las noticias');
    }
};
