import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../redux/books/bookSlice";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerms, setSearchTerms] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks({ searchTerms, startIndex }));
  }, [dispatch, searchTerms, startIndex]);

  const values = {
    searchTerms,
    setSearchTerms,
    startIndex,
    setStartIndex,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
