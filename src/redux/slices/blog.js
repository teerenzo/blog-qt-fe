import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blog: {},
  loading: false,
  error: null,
  myBlogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlogsRequest: (state) => {
      state.loading = true;
    },
    fetchBlogsSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    fetchBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBlogRequest: (state) => {
      state.loading = true;
    },
    fetchBlogSuccess: (state, action) => {
      state.loading = false;
      state.blog = action.payload;
    },
    fetchBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetMyBlogsRequest: (state) => {
      state.loading = true;
    },
    fetchMyBlogsSuccess: (state, action) => {
      state.loading = false;
      state.myBlogs = action.payload;
    },
    fetchMyBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBlogsRequest,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  fetchBlogRequest,
  fetchBlogSuccess,
  fetchBlogFailure,
  fetMyBlogsRequest,
  fetchMyBlogsSuccess,
  fetchMyBlogsFailure,
} = blogSlice.actions;

export default blogSlice.reducer;
