import { Request, Response } from 'express';
import { getCandidatesForPosition } from '../../application/services/positionService';

export const getPositionCandidatesController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format. ID must be an integer.' });
        }
        
        const candidates = await getCandidatesForPosition(id);
        res.status(200).json(candidates);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Position not found') {
                return res.status(404).json({ message: 'Position not found' });
            }
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
};
