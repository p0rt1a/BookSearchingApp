import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ searchTerms, startIndex }) => {
    console.log("searchWords", searchTerms);
    console.log("startIndex", startIndex);

    var query =
      searchTerms === ""
        ? `${process.env.REACT_APP_BASE_ENDPOINT}?q=intitle=react&maxResults=10`
        : `${process.env.REACT_APP_BASE_ENDPOINT}?q=intitle=${searchTerms}&maxResults=10`;

    query += startIndex === 0 ? "" : `&startIndex=${startIndex}`;

    const { data } = await axios.get(query);

    return data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    isLoading: false,
    isHasMore: true,
  },
  reducers: {},
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.isLoading = false;

      console.log(action.payload.items);

      state.isHasMore = action.payload.items.length % 10 === 0 ? true : false;
    },
  },
});

export default booksSlice.reducer;
