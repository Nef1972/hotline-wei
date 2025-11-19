export const decodeToken = (token: string): string =>
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("utf-8"));
