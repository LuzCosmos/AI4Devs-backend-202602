import { changeCandidateStage } from '../application/services/candidateStageService';
import { ApplicationRepository } from '../infrastructure/ApplicationRepository';

jest.mock('../infrastructure/ApplicationRepository', () => ({
  ApplicationRepository: {
    findApplicationById: jest.fn(),
    findInterviewStepById: jest.fn(),
    updateApplicationStage: jest.fn(),
  },
}));

const mockedRepo = ApplicationRepository as jest.Mocked<typeof ApplicationRepository>;

describe('changeCandidateStage (unit)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('lanza error si la application no existe', async () => {
    mockedRepo.findApplicationById.mockResolvedValue(null as any);

    await expect(changeCandidateStage(999, { interviewStepId: 1 })).rejects.toThrow(
      'Application not found'
    );
    expect(mockedRepo.findInterviewStepById).not.toHaveBeenCalled();
  });

  it('lanza error si el interviewStep no existe', async () => {
    mockedRepo.findApplicationById.mockResolvedValue({
      id: 12,
      currentInterviewStep: 2,
      interviewStep: { id: 2, name: 'Phone', orderIndex: 1 },
      position: { interviewFlowId: 10 },
    } as any);
    mockedRepo.findInterviewStepById.mockResolvedValue(null as any);

    await expect(changeCandidateStage(12, { interviewStepId: 999 })).rejects.toThrow(
      'InterviewStep not found'
    );
    expect(mockedRepo.updateApplicationStage).not.toHaveBeenCalled();
  });

  it('lanza error si el interviewStep no pertenece al flow', async () => {
    mockedRepo.findApplicationById.mockResolvedValue({
      id: 12,
      currentInterviewStep: 2,
      interviewStep: { id: 2, name: 'Phone', orderIndex: 1 },
      position: { interviewFlowId: 10 },
    } as any);
    mockedRepo.findInterviewStepById.mockResolvedValue({
      id: 7,
      name: 'Tech',
      orderIndex: 2,
      interviewFlowId: 99,
    } as any);

    await expect(changeCandidateStage(12, { interviewStepId: 7 })).rejects.toThrow(
      'InterviewStep does not belong to flow'
    );
    expect(mockedRepo.updateApplicationStage).not.toHaveBeenCalled();
  });

  it('es idempotente: no actualiza si ya está en el mismo interviewStep', async () => {
    mockedRepo.findApplicationById.mockResolvedValue({
      id: 12,
      currentInterviewStep: 3,
      interviewStep: { id: 3, name: 'Tech', orderIndex: 2 },
      position: { interviewFlowId: 10 },
    } as any);
    mockedRepo.findInterviewStepById.mockResolvedValue({
      id: 3,
      name: 'Tech',
      orderIndex: 2,
      interviewFlowId: 10,
    } as any);

    const result = await changeCandidateStage(12, { interviewStepId: 3 });

    expect(result).toEqual({
      applicationId: 12,
      currentInterviewStep: { id: 3, name: 'Tech', orderIndex: 2 },
    });
    expect(mockedRepo.updateApplicationStage).not.toHaveBeenCalled();
  });

  it('happy path: actualiza y retorna currentInterviewStep', async () => {
    mockedRepo.findApplicationById.mockResolvedValue({
      id: 12,
      currentInterviewStep: 2,
      interviewStep: { id: 2, name: 'Phone', orderIndex: 1 },
      position: { interviewFlowId: 10 },
    } as any);
    mockedRepo.findInterviewStepById.mockResolvedValue({
      id: 3,
      name: 'Tech',
      orderIndex: 2,
      interviewFlowId: 10,
    } as any);
    mockedRepo.updateApplicationStage.mockResolvedValue({
      id: 12,
      interviewStep: { id: 3, name: 'Tech', orderIndex: 2 },
    } as any);

    const result = await changeCandidateStage(12, { interviewStepId: 3 });

    expect(result).toEqual({
      applicationId: 12,
      currentInterviewStep: { id: 3, name: 'Tech', orderIndex: 2 },
    });
    expect(mockedRepo.updateApplicationStage).toHaveBeenCalledWith(12, 3);
  });
});

