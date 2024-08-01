import { Api } from "./api";

export const blogApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
    }),
    getBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
    }),
    getBlogsByUser: builder.query({
      query: () => `/blogs/user/my-blogs`,
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: (updatedBlog) => ({
        url: `/blogs/${updatedBlog.id}`,
        method: "PUT",
        body: updatedBlog.data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
    commentOnBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.id}/comment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCommentOnBlogMutation,
  useGetBlogsByUserQuery,
} = blogApi;
