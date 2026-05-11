import { ApplicationRepository } from '../../infrastructure/ApplicationRepository';
import {
  ChangeCandidateStageRequestDTO,
  ChangeCandidateStageResponseDTO,
} from '../../domain/dtos/ChangeCandidateStageDTO';

export async function changeCandidateStage(
  applicationId: number,
  payload: ChangeCandidateStageRequestDTO
): Promise<ChangeCandidateStageResponseDTO> {
  const application = await ApplicationRepository.findApplicationById(applicationId);
  if (!application) {
    throw new Error('Application not found');
  }

  const { interviewStepId } = payload;
  const interviewStep = await ApplicationRepository.findInterviewStepById(interviewStepId);
  if (!interviewStep) {
    throw new Error('InterviewStep not found');
  }

  if (interviewStep.interviewFlowId !== application.position.interviewFlowId) {
    throw new Error('InterviewStep does not belong to flow');
  }

  // Idempotencia: si ya está en la misma etapa, devolvemos representación actual sin update.
  if (application.currentInterviewStep === interviewStepId) {
    const current = application.interviewStep;
    return {
      applicationId: application.id,
      currentInterviewStep: {
        id: current.id,
        name: current.name,
        orderIndex: current.orderIndex,
      },
    };
  }

  const updated = await ApplicationRepository.updateApplicationStage(applicationId, interviewStepId);

  return {
    applicationId: updated.id,
    currentInterviewStep: {
      id: updated.interviewStep.id,
      name: updated.interviewStep.name,
      orderIndex: updated.interviewStep.orderIndex,
    },
  };
}

