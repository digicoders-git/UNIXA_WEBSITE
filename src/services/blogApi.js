import api from './api';

// Get published blogs
export const getPublishedBlogs = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/blogs?page=${page}&limit=${limit}`);
  return data;
};

// Get single blog by slug or ID
export const getSingleBlog = async (slugOrId) => {
  const { data } = await api.get(`/blogs/${slugOrId}`);
  return data;
};

// Get featured blogs
export const getFeaturedBlogs = async () => {
  const { data } = await api.get('/blogs/featured');
  return data;
};

// Like a blog
export const likeBlog = async (slugOrId) => {
  const { data } = await api.post(`/blogs/${slugOrId}/like`);
  return data;
};

// Unlike a blog
export const unlikeBlog = async (slugOrId) => {
  const { data } = await api.post(`/blogs/${slugOrId}/unlike`);
  return data;
};

// Add comment
export const addComment = async (slugOrId, commentData) => {
  const { data } = await api.post(`/blogs/${slugOrId}/comments`, commentData);
  return data;
};

// Get comments
export const getComments = async (slugOrId) => {
  const { data } = await api.get(`/blogs/${slugOrId}/comments`);
  return data;
};

// Delete comment
export const deleteComment = async (commentId, email) => {
  const { data } = await api.delete(`/blogs/comments/${commentId}`, { data: { email } });
  return data;
};
