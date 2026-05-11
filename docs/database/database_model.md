# Documentación del Modelo de Datos

Esta documentación describe la estructura de la base de datos para el Sistema de Seguimiento de Talento (LTI), generada a partir del esquema de Prisma.

## Diagrama Entidad-Relación (ER)

```mermaid
erDiagram
    Candidate {
        Int id PK
        String firstName
        String lastName
        String email UK
        String phone
        String address
    }
    
    Education {
        Int id PK
        String institution
        String title
        DateTime startDate
        DateTime endDate
        Int candidateId FK
    }
    
    WorkExperience {
        Int id PK
        String company
        String position
        String description
        DateTime startDate
        DateTime endDate
        Int candidateId FK
    }
    
    Resume {
        Int id PK
        String filePath
        String fileType
        DateTime uploadDate
        Int candidateId FK
    }
    
    Company {
        Int id PK
        String name UK
    }
    
    Employee {
        Int id PK
        String name
        String email UK
        String role
        Boolean isActive
        Int companyId FK
    }
    
    Position {
        Int id PK
        String title
        String description
        String status
        Boolean isVisible
        String location
        String jobDescription
        String requirements
        String responsibilities
        Float salaryMin
        Float salaryMax
        String employmentType
        String benefits
        String companyDescription
        DateTime applicationDeadline
        String contactInfo
        Int companyId FK
        Int interviewFlowId FK
    }
    
    InterviewFlow {
        Int id PK
        String description
    }
    
    InterviewType {
        Int id PK
        String name
        String description
    }
    
    InterviewStep {
        Int id PK
        String name
        Int orderIndex
        Int interviewFlowId FK
        Int interviewTypeId FK
    }
    
    Application {
        Int id PK
        DateTime applicationDate
        String notes
        Int positionId FK
        Int candidateId FK
        Int currentInterviewStep FK
    }
    
    Interview {
        Int id PK
        DateTime interviewDate
        String result
        Int score
        String notes
        Int applicationId FK
        Int interviewStepId FK
        Int employeeId FK
    }

    Candidate ||--o{ Education : "has"
    Candidate ||--o{ WorkExperience : "has"
    Candidate ||--o{ Resume : "has"
    Candidate ||--o{ Application : "makes"
    
    Company ||--o{ Employee : "employs"
    Company ||--o{ Position : "offers"
    
    Position }o--|| Company : "belongs to"
    Position }o--|| InterviewFlow : "uses"
    Position ||--o{ Application : "receives"
    
    Application }o--|| Position : "for"
    Application }o--|| Candidate : "by"
    Application }o--|| InterviewStep : "is at"
    Application ||--o{ Interview : "has"
    
    Employee }o--|| Company : "works for"
    Employee ||--o{ Interview : "conducts"
    
    InterviewType ||--o{ InterviewStep : "defines"
    
    InterviewFlow ||--o{ InterviewStep : "includes"
    InterviewFlow ||--o{ Position : "assigned to"
    
    InterviewStep }o--|| InterviewFlow : "part of"
    InterviewStep }o--|| InterviewType : "type"
    InterviewStep ||--o{ Application : "status of"
    InterviewStep ||--o{ Interview : "instance of"
    
    Interview }o--|| Application : "part of"
    Interview }o--|| InterviewStep : "stage"
    Interview }o--|| Employee : "conducted by"
```

## Diccionario de Datos

El sistema se compone de los siguientes modelos principales agrupados en tres dominios clave: Candidatos, Empresas y el Flujo de Reclutamiento.

### 1. Dominio de Candidatos

#### `Candidate` (Candidato)
Representa a un aplicante o postulante en el sistema.
- **Campos:**
  - `id`: Identificador único autoincremental (PK).
  - `firstName` / `lastName`: Nombres y apellidos.
  - `email`: Correo electrónico (debe ser único).
  - `phone` / `address`: Información de contacto opcional.
- **Relaciones:**
  - `educations`: Un candidato puede tener múltiple historial educativo (1:N).
  - `workExperiences`: Un candidato puede tener múltiples experiencias de trabajo (1:N).
  - `resumes`: Un candidato puede haber subido múltiples currículums (1:N).
  - `applications`: Un candidato puede aplicar a múltiples posiciones (1:N).

#### `Education` (Educación)
Registra el historial de educación de un candidato.
- **Campos Clave:** `institution`, `title`, `startDate`, `endDate`.
- **Relaciones:** Pertenece a un único candidato (`candidateId`).

#### `WorkExperience` (Experiencia Laboral)
Registra los trabajos anteriores del candidato.
- **Campos Clave:** `company`, `position`, `description`, `startDate`, `endDate`.
- **Relaciones:** Pertenece a un único candidato (`candidateId`).

#### `Resume` (Currículum)
Maneja los archivos adjuntos subidos por el candidato.
- **Campos Clave:** `filePath` (ruta en el servidor o S3), `fileType`, `uploadDate`.
- **Relaciones:** Pertenece a un único candidato (`candidateId`).

---

### 2. Dominio de Empresas (Company)

#### `Company` (Empresa)
Entidad que representa a la organización o empleador.
- **Campos:** `id` (PK), `name` (Único).
- **Relaciones:** Tiene múltiples empleados (1:N) y posiciones (1:N).

#### `Employee` (Empleado)
Usuario o trabajador de una empresa (usualmente reclutadores o entrevistadores).
- **Campos Clave:** `name`, `email` (único), `role`, `isActive`.
- **Relaciones:** Pertenece a una empresa (`companyId`) y puede llevar a cabo múltiples entrevistas (`interviews`).

#### `Position` (Posición / Vacante)
Vacante laboral ofrecida por una empresa.
- **Campos Clave:** `title`, `description`, `status` (ej. Draft), `salaryMin` / `salaryMax`, `employmentType`, `applicationDeadline`.
- **Relaciones:** Pertenece a una empresa (`companyId`) y está ligada a un flujo de entrevistas (`interviewFlowId`). Puede recibir múltiples aplicaciones (`applications`).

---

### 3. Dominio de Reclutamiento (Flujo y Entrevistas)

#### `InterviewFlow` (Flujo de Entrevista)
Define la serie de pasos o etapas para el proceso de contratación.
- **Campos:** `id` (PK), `description`.
- **Relaciones:** Está asociado a múltiples posiciones y contiene múltiples pasos (`InterviewStep`).

#### `InterviewType` (Tipo de Entrevista)
Catálogo para clasificar las entrevistas (ej. RRHH, Técnica, Fit Cultural).
- **Campos:** `id` (PK), `name`, `description`.

#### `InterviewStep` (Paso de Entrevista)
Representa una etapa individual dentro del proceso general del flujo.
- **Campos Clave:** `name`, `orderIndex` (Define la secuencia del paso).
- **Relaciones:** Pertenece a un flujo (`interviewFlowId`) y es de un tipo determinado (`interviewTypeId`). Sirve como estado actual de las aplicaciones.

#### `Application` (Aplicación)
La postulación formal de un candidato a una posición específica.
- **Campos Clave:** `applicationDate`, `notes`.
- **Relaciones:** Conecta a un candidato (`candidateId`) con una posición (`positionId`). Controla el estado del proceso en base al paso en el que se encuentra (`currentInterviewStep`).

#### `Interview` (Entrevista)
El registro de un evento de entrevista particular programado y evaluado.
- **Campos Clave:** `interviewDate`, `result`, `score`, `notes`.
- **Relaciones:** 
  - Realizada como parte de una postulación (`applicationId`).
  - Corresponde a una etapa particular del flujo (`interviewStepId`).
  - Llevada a cabo por un empleado o reclutador de la empresa (`employeeId`).
