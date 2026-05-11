import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ApplicationRepository {
  static async findApplicationById(applicationId: number) {
    return prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        position: true,
        interviewStep: true,
      },
    });
  }

  static async findInterviewStepById(interviewStepId: number) {
    return prisma.interviewStep.findUnique({
      where: { id: interviewStepId },
    });
  }

  static async updateApplicationStage(applicationId: number, interviewStepId: number) {
    return prisma.application.update({
      where: { id: applicationId },
      data: { currentInterviewStep: interviewStepId },
      include: {
        interviewStep: true,
      },
    });
  }
}

