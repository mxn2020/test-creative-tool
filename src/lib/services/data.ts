import { PrismaClient } from '@prisma/client';
import prisma from '../plugins/prisma';

export interface DataService {
  // User operations
  findUserById(userId: string): Promise<any>;
  findUserByEmail(email: string): Promise<any>;
  updateUser(userId: string, data: any): Promise<any>;
  deleteUser(userId: string): Promise<any>;
  listUsers(options?: ListOptions): Promise<ListResult<any>>;
  
  // Generic CRUD operations
  create<T>(model: string, data: any): Promise<T>;
  findOne<T>(model: string, where: any): Promise<T | null>;
  findMany<T>(model: string, options?: FindManyOptions): Promise<T[]>;
  update<T>(model: string, where: any, data: any): Promise<T>;
  delete<T>(model: string, where: any): Promise<T>;
  count(model: string, where?: any): Promise<number>;
}

export interface ListOptions {
  page?: number;
  pageSize?: number;
  orderBy?: any;
  where?: any;
}

export interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FindManyOptions {
  where?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
  include?: any;
}

class DataServiceImpl implements DataService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  // User-specific operations
  async findUserById(userId: string) {
    // Note: Better Auth manages its own user table
    // This is for app-specific user data if needed
    return await this.prisma.userPreference.findUnique({
      where: { userId },
    });
  }

  async findUserByEmail(_email: string) {
    // Note: This would typically query Better Auth's user table
    // For now, returning null as Better Auth handles user queries
    console.warn('findUserByEmail: Use Better Auth methods for user queries');
    return null;
  }

  async updateUser(userId: string, data: any) {
    // Update app-specific user preferences
    return await this.prisma.userPreference.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }

  async deleteUser(userId: string) {
    // Delete app-specific user data
    // Note: Better Auth handles actual user deletion
    return await this.prisma.userPreference.delete({
      where: { userId },
    });
  }

  async listUsers(options: ListOptions = {}) {
    // Note: This lists app-specific user preferences
    // For actual users, use Better Auth methods
    const { page = 1, pageSize = 10, orderBy, where } = options;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.userPreference.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      this.prisma.userPreference.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // Generic CRUD operations
  async create<T>(model: string, data: any): Promise<T> {
    return await (this.prisma as any)[model].create({ data });
  }

  async findOne<T>(model: string, where: any): Promise<T | null> {
    return await (this.prisma as any)[model].findFirst({ where });
  }

  async findMany<T>(model: string, options: FindManyOptions = {}): Promise<T[]> {
    return await (this.prisma as any)[model].findMany(options);
  }

  async update<T>(model: string, where: any, data: any): Promise<T> {
    return await (this.prisma as any)[model].update({ where, data });
  }

  async delete<T>(model: string, where: any): Promise<T> {
    return await (this.prisma as any)[model].delete({ where });
  }

  async count(model: string, where?: any): Promise<number> {
    return await (this.prisma as any)[model].count({ where });
  }

  // Additional utility methods
  async transaction<T>(fn: (prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(fn);
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

// Export singleton instance
export const dataService = new DataServiceImpl();

// Export for testing or custom implementations
export { DataServiceImpl };