import { Router } from 'express';
import { addCandidate, changeCandidateStageController, getCandidateById } from '../presentation/controllers/candidateController';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // console.log(req.body); //Just in case you want to inspect the request body
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

router.get('/:id', getCandidateById);

/**
 * @openapi
 * /candidates/{id}/stage:
 *   put:
 *     summary: Actualizar etapa de un candidato (Kanban)
 *     description: Actualiza el InterviewStep actual de una Application (tarjeta del Kanban).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: applicationId (id de la postulación/tarjeta)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [interviewStepId]
 *             properties:
 *               interviewStepId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Etapa actualizada
 *       400:
 *         description: Parámetros inválidos
 *       404:
 *         description: Application o InterviewStep no encontrado
 *       422:
 *         description: InterviewStep no pertenece al flujo de la Position
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id/stage', changeCandidateStageController);

export default router;
