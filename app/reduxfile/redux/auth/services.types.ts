export type AuthRequest = {
  email: string;
  password: string;
};
export type AuthResponse = {
  access_token: string;
  user: {
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    first_timer: boolean;
    balance: string;
    account_number: string;
  };
};
export type RefreshTokenResponse = {
  access_token: string;
};
export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type RegisterResponse = {
  message: string;
  user: {
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    balance: string;
    account_number: string;
  };
};

export type SetPinResponse = {
  message: string;
};

export type SetPinRequest = {
  customer_id: string;
  pin1: string;
  pin2: string;
};
