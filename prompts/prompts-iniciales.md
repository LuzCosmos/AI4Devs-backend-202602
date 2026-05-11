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
│ Deploying your app to serverless or edge functions? │
│ Try Prisma Accelerate for connection pooling and caching. │
│ https://pris.ly/cli/--accelerate │
└─────────────────────────────────────────────────────────────┘

🛑 Hardcoding URLs in your schema poses a security risk: https://pris.ly/d/datasource-env

3. Error al correr seed para la base de datos:
   prisma git:(develop) ✗ ts-node seed.ts
   zsh: command not found: ts-node

revisa la forma correcta en la que se debe ejecutar el archivo @backend/prisma/seed.ts

4. Eres un experto en bases de datos. Dame una documentación del modelo de datos que explique campos, relaciones y un diagrama en formato mermaid @contextScopeItemMention escribe el resultado en un archivo .md en ./docs/database

5. eres un Senior experto en Express + Prisma en backend.
   Crea y enriquese la siguiente historia de usuario:
   crear un nuevo endpoint en una interfaz tipo kanban.
   GET /positions/:id/candidates
   Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

Nombre completo del candidato (de la tabla candidate).

current_interview_step: en qué fase del proceso está el candidato (de la tabla application).

La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score

Historia con criterios de aceptación que incluyan TDD y DDD

incluye casos de uso en formato mermaid

Enriquece la historia de usuario y guardala en un archivo .md en ./backend/docs/user_histories

6. para la historia de usuario ten en cuenta la base de datos actual: ./docs/database/database_model.md

Además, los casos de uso que hiciste son en realidad casos de secuencia, puedes dejarlo como casos de secuenci y aparte incluye una sección para casos de uso: haz un diagrama UML de casos de uso usando flowchart de Mermaid, NO sequenceDiagram.
Además en el archivo de la historia de usuario pon checks para tener claro que se ha ejecutado y qué falta

7. Enriquese la historia ./backend/docs/user_histories/US-get-position-candidates.md, la aplicación no cuenta con sistema de autenticación, por lo que esto no se debe tener en cuenta en la historia de usuario.
