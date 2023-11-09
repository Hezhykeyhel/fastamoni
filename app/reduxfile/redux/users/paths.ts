export default {
  getusers: (id: any) => `users?page=${id}`,
  updateProfile: (id: any) => `users/${id}`,
};
