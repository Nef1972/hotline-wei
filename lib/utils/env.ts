const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  databaseUrl: process.env.DATABASE_URL!,
  tokenTemplate: process.env.CLERK_JWT_TEMPLATE_NAME!,
  r2: {
    endpoint: process.env.R2_ENDPOINT!,
    publicUrl: `https://${process.env.R2_PUBLIC_PATH}`,
    publicPath: process.env.R2_PUBLIC_PATH!,
    bucket: process.env.R2_BUCKET!,
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    sizeLimit: Number(process.env.R2_SIZE_LIMIT!),
  },
} as const;

export default env;
