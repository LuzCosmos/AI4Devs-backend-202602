1. lee este archivo para contexto de la aplicación: @backend/prisma/schema.prisma
2. Identifica la causa del error en consola y solucionalo
npx prisma generate
Environment variables loaded from ../.env
Prisma schema loaded from schema.prisma

✔ Generated Prisma Client (v5.14.0) to ./../node_modules/@prisma/client in 201ms

Start using Prisma Client in Node.js (See: https://pris.ly/d/client)
```
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```
or start using Prisma Client at the edge (See: https://pris.ly/d/accelerate)
```
import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()
```

See other ways of importing Prisma Client: http://pris.ly/d/importing-client

┌─────────────────────────────────────────────────────────────┐
│  Deploying your app to serverless or edge functions?        │
│  Try Prisma Accelerate for connection pooling and caching.  │
│  https://pris.ly/cli/--accelerate                           │
└─────────────────────────────────────────────────────────────┘

🛑 Hardcoding URLs in your schema poses a security risk: https://pris.ly/d/datasource-env

3. Error al correr seed para la base de datos:
prisma git:(develop) ✗ ts-node seed.ts
zsh: command not found: ts-node

revisa la forma correcta en la que se debe ejecutar el archivo @backend/prisma/seed.ts 

4. Eres un experto en bases de datos. Dame una documentación del modelo de datos que explique campos, relaciones y un diagrama en formato mermaid @contextScopeItemMention escribe el resultado en un archivo .md en ./docs/database

