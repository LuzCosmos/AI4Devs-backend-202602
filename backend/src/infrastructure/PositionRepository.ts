import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PositionRepository {
    static async findPositionById(id: number) {
        return prisma.position.findUnique({
            where: { id }
        });
    }

    static async getCandidatesByPositionId(positionId: number) {
        return prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviewStep: true,
                interviews: true
            }
        });
    }
}
