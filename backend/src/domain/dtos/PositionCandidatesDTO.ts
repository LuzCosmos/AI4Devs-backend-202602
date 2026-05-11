export interface PositionCandidateResponseDTO {
    applicationId: number;
    candidate: {
        id: number;
        fullName: string;
    };
    currentInterviewStep: {
        id: number;
        name: string;
        orderIndex: number;
    } | null;
    averageScore: number | null;
}
