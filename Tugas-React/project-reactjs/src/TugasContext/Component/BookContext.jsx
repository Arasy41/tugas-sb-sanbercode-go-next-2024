import axios from "axios";
import React, { createContext } from "react";

export const BookContext = createContext();

export const BookProvider = props => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_url: "",
        release_year: "",
        price: "",
        total_page: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const API_URL = import.meta.env.VITE_BASE_API_URL

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
        const response = await axios.get(`${API_URL}/books`);
        console.log('API Response:', response.data);
        setBooks(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    return (
        <BookContext.Provider value={{ books, setBooks, formData, setFormData, editIndex, setEditIndex }}>
            {props.children}
        </BookContext.Provider>
    )
}