import { createSlice } from "@reduxjs/toolkit";
import { BlogInterface } from "../interfaces/blog";

interface sliceStateInterface {
  blogs: BlogInterface[];
}
const initialState: sliceStateInterface = {
  blogs: [],
};

const BlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addToBlogsRedux(state, action) {
      state.blogs = action.payload;
    },
  },
});

export const { addToBlogsRedux } = BlogsSlice.actions;
export default BlogsSlice.reducer;
