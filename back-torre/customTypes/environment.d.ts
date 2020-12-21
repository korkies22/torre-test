// custom_typings/express/index.d.ts
export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string
      BACK_URL: string
      NODE_ENV: 'development' | 'production'
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_SECRET: string
    }
  }
  namespace Express {
    interface Request {
      user?: string // Used when auth
      file: Multer.File // Used with multer
    }
  }
  interface AuthUser {
    user: string
  }
}

// custom_typings/express/index.d.ts
declare namespace Express {
  interface Request {
    user?: AuthUser
  }
}

// place-to-extend-enum.ts
declare module 'express-joi-validation' {
  export enum ContainerTypes {
    User = 'user',
  }
}
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
