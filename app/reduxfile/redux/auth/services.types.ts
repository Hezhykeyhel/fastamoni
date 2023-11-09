export type AuthRequest = {
  email: string;
  password: string;
};
export type AuthResponse = {
  token: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  token: string;
};

export type SetPinResponse = {
  message: string;
};

export type SetPinRequest = {
  customer_id: string;
  pin1: string;
  pin2: string;
};
