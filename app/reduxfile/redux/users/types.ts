export type UpdateProfileResponse = {
  updatedAt: string;
};

export type GetUserResponse = {
  page: any;
  per_page: any;
  total: any;
  total_pages: any;
  data: [
    {
      id: any;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    },
  ];
};
