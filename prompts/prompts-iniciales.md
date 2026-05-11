# Prompts para enteder el contexto del proyecto

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

# Prompts primer Endpoint

5. eres un Senior experto en Express + Prisma en backend.
   Crea y enriquee la siguiente historia de usuario:
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

7. Enriquece la historia ./backend/docs/user_histories/US-get-position-candidates.md, la aplicación no cuenta con sistema de autenticación, por lo que esto no se debe tener en cuenta en la historia de usuario.

8. Revisa que los siguientes criterios se cumplen en la historia @backend/docs/user_histories/US-get-position-candidates.md que se incluya, Los cambios de rutas, controladores, etc. en la carpeta ./backend

9. ejecuta la historia @backend/docs/user_histories/US-get-position-candidates.md para el endpoint en backend

10. Continue avance en el archivo @backend/docs/user_histories/US-get-position-candidates.md

11. actualiza la historia de usuario @backend/docs/user_histories/US-get-position-candidates.md con los cambios realizados. Agrega en el @README.md una sección de cómo correr los tests y cómo se accede al swagger

12. en la historia quedan sin completar la sección ## Criterios de Aceptación (TDD / BDD)

13. no se ven aplicadas las ### Reglas de Dominio: @backend/docs/user_histories/US-get-position-candidates.md

# Prompts segundo endpoint

14. eres un Senior experto en Express + Prisma en backend. Crea y enriquece la siguiente historia de usuario: crear un nuevo endpoint en una interfaz tipo kanban.
    PUT /candidates/:id/stage
    Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

- Historia con criterios de aceptación que incluyan TDD y DDD

Enriquece la historia de usuario y guardala en un archivo .md en ./backend/docs/user_histories

- crea el diagrama de secuencia del feature en formato mermaid

- haz un diagrama UML de casos de uso usando flowchart de Mermaid, NO sequenceDiagram.
- En el archivo de la historia de usuario pon checks para tener claro que se ha ejecutado y qué falta
- Tener en cuenta que la aplicación no cuenta con sistema de autenticación, por lo que esto no se debe tener en cuenta en la historia de usuario.
- En la historia que se incluya, Los cambios de rutas, controladores, etc. en la carpeta ./backend
- la base de datos está descrita aquí: @docs/database/database_model.md
- explora @backend/src para entener la estructura y creación de los Endpoints para tenerlo en cuenta

15. enriquece la siguiente historia de usuario @backend/docs/user_histories/US-put-candidate-stage.md

16. ejecuta la historia @backend/docs/user_histories/US-put-candidate-stage.md del endpoint backend, a medida que implementes los puntos allí descritos, actualiza el archivo de la historia
