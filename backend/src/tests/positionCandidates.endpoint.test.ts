import request from 'supertest';
import { app } from '../index';
import { PositionRepository } from '../infrastructure/PositionRepository';

jest.mock('../infrastructure/PositionRepository', () => ({
  PositionRepository: {
    findPositionById: jest.fn(),
    getCandidatesByPositionId: jest.fn(),
  },
}));

const mockedRepo = PositionRepository as jest.Mocked<typeof PositionRepository>;

describe('GET /positions/:id/candidates (integration-ish)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('400 si el id no es entero', async () => {
    const res = await request(app).get('/positions/invalid/candidates');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Invalid ID format. ID must be an integer.',
    });
  });

  it('404 si la posición no existe', async () => {
    mockedRepo.findPositionById.mockResolvedValue(null as any);

    const res = await request(app).get('/positions/999/candidates');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Position not found' });
  });

  it('200 y [] si la posición existe pero no hay postulaciones', async () => {
    mockedRepo.findPositionById.mockResolvedValue({ id: 2 } as any);
    mockedRepo.getCandidatesByPositionId.mockResolvedValue([] as any);

    const res = await request(app).get('/positions/2/candidates');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('200 con promedio y fullName según contrato', async () => {
    mockedRepo.findPositionById.mockResolvedValue({ id: 1 } as any);
    mockedRepo.getCandidatesByPositionId.mockResolvedValue([
      {
        id: 12,
        candidate: { id: 105, firstName: 'Albert', lastName: 'Saelices' },
        interviewStep: { id: 3, name: 'Technical Interview', orderIndex: 2 },
        interviews: [{ score: 9 }, { score: 8 }, { score: null }],
      },
    ] as any);

    const res = await request(app).get('/positions/1/candidates');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        applicationId: 12,
        candidate: { id: 105, fullName: 'Albert Saelices' },
        currentInterviewStep: { id: 3, name: 'Technical Interview', orderIndex: 2 },
        averageScore: 8.5,
      },
    ]);
  });
});

