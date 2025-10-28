import 'dotenv/config';
import { z } from 'zod';

class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvError';
  }
}

const zStrVar = z.string().min(1);
const zNumVar = z.preprocess((val) => {
  if (typeof val === 'string') {
    const parsed = Number(val);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return val;
}, z.number());

const zEnv = z.object({
  ADMIN_NAME: zStrVar,
  ADMIN_PASSWORD: zStrVar,
  SECRET_KEY: zStrVar,
  EXPIRATION_TIME: zNumVar,
  DATABASE_HOST: zStrVar,
  DATABASE_PORT: zNumVar,
  DATABASE_USER: zStrVar,
  DATABASE_PASSWORD: zStrVar,
  DATABASE_NAME: zStrVar,
});

try {
  zEnv.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    throw new EnvError(
      `env type is invalid\n${err.issues.map((v) => `${v.message}: env.${String(v.path[0])}`).join('\n')}`
    );
  }
  throw err;
}

declare module 'bun' {
  interface Env extends z.infer<typeof zEnv> {}
}
