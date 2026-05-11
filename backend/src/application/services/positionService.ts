import { PositionRepository } from '../../infrastructure/PositionRepository';
import { PositionCandidateResponseDTO } from '../../domain/dtos/PositionCandidatesDTO';

export const getCandidatesForPosition = async (positionId: number): Promise<PositionCandidateResponseDTO[]> => {
    const position = await PositionRepository.findPositionById(positionId);
    
    if (!position) {
        throw new Error('Position not found');
    }

    const applications = await PositionRepository.getCandidatesByPositionId(positionId);

    return applications.map((app: any) => {
        const candidate = app.candidate;
        const fullName = `${candidate.firstName} ${candidate.lastName}`.trim();
        
        let averageScore: number | null = null;
        
        if (app.interviews && app.interviews.length > 0) {
            const scoredInterviews = app.interviews.filter((interview: any) => interview.score !== null);
            if (scoredInterviews.length > 0) {
                const totalScore = scoredInterviews.reduce((sum: number, interview: any) => sum + (interview.score || 0), 0);
                averageScore = totalScore / scoredInterviews.length;
            }
        }

        return {
            applicationId: app.id,
            candidate: {
                id: candidate.id,
                fullName
            },
            currentInterviewStep: app.interviewStep ? {
                id: app.interviewStep.id,
                name: app.interviewStep.name,
                orderIndex: app.interviewStep.orderIndex
            } : null,
            averageScore
        };
    });
};
