const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  databaseUrl: process.env.DATABASE_URL!,
  tokenTemplate: process.env.CLERK_JWT_TEMPLATE_NAME!,
} as const;

export default env;
