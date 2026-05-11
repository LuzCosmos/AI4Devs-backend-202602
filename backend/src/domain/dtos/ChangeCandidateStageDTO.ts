export type ChangeCandidateStageRequestDTO = {
  interviewStepId: number;
};

export type ChangeCandidateStageResponseDTO = {
  applicationId: number;
  currentInterviewStep: {
    id: number;
    name: string;
    orderIndex: number;
  };
};

