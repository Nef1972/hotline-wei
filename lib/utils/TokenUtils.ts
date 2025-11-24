export type ClerkJwt = {
  first_name: string;
  last_name: string;
  email: string;
};

export const decodeToken = (token: string): ClerkJwt =>
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("utf-8"));
