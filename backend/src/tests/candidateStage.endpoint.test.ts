import request from 'supertest';
import { app } from '../index';
import { ApplicationRepository } from '../infrastructure/ApplicationRepository';

jest.mock('../infrastructure/ApplicationRepository', () => ({
  ApplicationRepository: {
    findApplicationById: jest.fn(),
    findInterviewStepById: jest.fn(),
    updateApplicationStage: jest.fn(),
  },
}));

const mockedRepo = ApplicationRepository as jest.Mocked<typeof ApplicationRepository>;

describe('PUT /candidates/:id/stage (integration-ish)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('400 si el id no es entero', async () => {
    const res = await request(app).put('/candidates/invalid/stage').send({ interviewStepId: 3 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid ID format. ID must be an integer.' });
  });

  it('400 si falta interviewStepId', async () => {
    const res = await request(app).put('/candidates/12/stage').send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid body. interviewStepId must be an integer.' });
  });

  it('404 si la application no existe', async () => {
    mockedRepo.findApplicationById.mockResolvedValue(null as any);

    const res = await request(app).put('/candidates/9999/stage').send({ interviewStepId: 3 });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Application not found' });
  });

  it('404 si el interviewStep no existe', async () => {
    mockedRepo.findApplicationById.mockResolvedValue({
      id: 12,
      currentInterviewStep: 2,
      interviewStep: { id: 2, name: 'Phone', orderIndex: 1 },
      position: { interviewFlowId: 10 },
    } as any);
    mockedRepo.findInterviewStepById.mockResolvedValue(null as any);

    const res = await request(app).put('/candidates/12/stage').send({ interviewStepId: 999 });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'InterviewStep not found' });
  });

  it('422 si el interviewStep no pertenece al flow', async () => {
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

    const res = await request(app).put('/candidates/12/stage').send({ interviewStepId: 7 });

    expect(res.status).toBe(422);
    expect(res.body).toEqual({ message: 'InterviewStep does not belong to flow' });
  });

  it('200 si actualiza correctamente', async () => {
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

    const res = await request(app).put('/candidates/12/stage').send({ interviewStepId: 3 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      applicationId: 12,
      currentInterviewStep: { id: 3, name: 'Tech', orderIndex: 2 },
    });
  });
});

