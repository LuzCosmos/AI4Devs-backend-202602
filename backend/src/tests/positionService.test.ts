import { getCandidatesForPosition } from '../application/services/positionService';
import { PositionRepository } from '../infrastructure/PositionRepository';

jest.mock('../infrastructure/PositionRepository', () => ({
  PositionRepository: {
    findPositionById: jest.fn(),
    getCandidatesByPositionId: jest.fn(),
  },
}));

const mockedRepo = PositionRepository as jest.Mocked<typeof PositionRepository>;

describe('getCandidatesForPosition (unit)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('lanza error si la posición no existe', async () => {
    mockedRepo.findPositionById.mockResolvedValue(null as any);

    await expect(getCandidatesForPosition(999)).rejects.toThrow('Position not found');
    expect(mockedRepo.getCandidatesByPositionId).not.toHaveBeenCalled();
  });

  it('mapea fullName y averageScore correctamente', async () => {
    mockedRepo.findPositionById.mockResolvedValue({ id: 1 } as any);
    mockedRepo.getCandidatesByPositionId.mockResolvedValue([
      {
        id: 12,
        candidate: { id: 105, firstName: 'Albert', lastName: 'Saelices' },
        interviewStep: { id: 3, name: 'Technical Interview', orderIndex: 2 },
        interviews: [{ score: 10 }, { score: null }, { score: 5 }],
      },
    ] as any);

    const result = await getCandidatesForPosition(1);

    expect(result).toEqual([
      {
        applicationId: 12,
        candidate: { id: 105, fullName: 'Albert Saelices' },
        currentInterviewStep: { id: 3, name: 'Technical Interview', orderIndex: 2 },
        averageScore: 7.5,
      },
    ]);
  });

  it('devuelve averageScore null si no hay scores válidos', async () => {
    mockedRepo.findPositionById.mockResolvedValue({ id: 1 } as any);
    mockedRepo.getCandidatesByPositionId.mockResolvedValue([
      {
        id: 12,
        candidate: { id: 105, firstName: 'A', lastName: 'B' },
        interviewStep: null,
        interviews: [{ score: null }, { score: null }],
      },
    ] as any);

    const result = await getCandidatesForPosition(1);

    expect(result[0].averageScore).toBeNull();
    expect(result[0].currentInterviewStep).toBeNull();
  });
});

