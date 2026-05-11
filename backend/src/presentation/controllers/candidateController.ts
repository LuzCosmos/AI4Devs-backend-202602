import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';
import { changeCandidateStage } from '../../application/services/candidateStageService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { addCandidate };

export const changeCandidateStageController = async (req: Request, res: Response) => {
    try {
        const applicationId = parseInt(req.params.id);
        if (isNaN(applicationId)) {
            return res.status(400).json({ error: 'Invalid ID format. ID must be an integer.' });
        }

        const { interviewStepId } = req.body ?? {};
        if (!Number.isInteger(interviewStepId)) {
            return res.status(400).json({ error: 'Invalid body. interviewStepId must be an integer.' });
        }

        const result = await changeCandidateStage(applicationId, { interviewStepId });
        return res.status(200).json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Application not found') {
                return res.status(404).json({ message: 'Application not found' });
            }
            if (error.message === 'InterviewStep not found') {
                return res.status(404).json({ message: 'InterviewStep not found' });
            }
            if (error.message === 'InterviewStep does not belong to flow') {
                return res.status(422).json({ message: 'InterviewStep does not belong to flow' });
            }
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
};