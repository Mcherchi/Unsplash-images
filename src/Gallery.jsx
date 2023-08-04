import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}`;
const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error</h4>
      </section>
    );
  }
  const results = data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            className="img"
            key={item.id}
            src={url}
            alt={item.alt_description}
          />
        );
      })}
    </section>
  );
};

export default Gallery;
