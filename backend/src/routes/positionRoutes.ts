import { Router } from 'express';
import { getPositionCandidatesController } from '../presentation/controllers/positionController';

const router = Router();

/**
 * @openapi
 * /positions/{id}/candidates:
 *   get:
 *     summary: Obtener candidatos por posición (Kanban)
 *     description: Retorna las aplicaciones (candidatos) de una posición, incluyendo el paso actual y el promedio de score.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la posición
 *     responses:
 *       200:
 *         description: Lista de candidatos (aplicaciones) de la posición
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   applicationId:
 *                     type: integer
 *                   candidate:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       fullName:
 *                         type: string
 *                   currentInterviewStep:
 *                     nullable: true
 *                     oneOf:
 *                       - type: "null"
 *                       - type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           orderIndex:
 *                             type: integer
 *                   averageScore:
 *                     nullable: true
 *                     oneOf:
 *                       - type: "null"
 *                       - type: number
 *       400:
 *         description: Parámetro inválido (id no entero)
 *       404:
 *         description: Posición no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/candidates', getPositionCandidatesController);

export default router;
