import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  head: String,
  intro: String,
  end: String,
  image: String,
  content: [
    {
      title: String,
      paragraph: String,
    },
  ],
});

export const BlogCollection = mongoose.model("blogs", BlogSchema);
