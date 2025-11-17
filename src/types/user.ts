export type UserDataType = {
  majorId?: number;
  year?: number;
};

export type CookieUserDataType = {
  state: {
    user: UserDataType;
  };
};
