import { PrismaClient } from '@prisma/client';
import { LoggerService } from 'src/modules/commons/logger-service';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let prisma: PrismaClient;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
    prisma = new PrismaClient();
    repository = new UsersRepository(prisma, loggerService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  describe('create', () => {
    it('creates a new user', async () => {
      const data: User = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
        id: 0,
      };

      const user = await repository.create(data);

      expect(user).toEqual(
        expect.objectContaining({
          name: data.name,
          email: data.email,
        }),
      );
    });
  });

  describe('update', () => {
    it('updates an existing user', async () => {

      //primero lo vamos a buscar

      const data: User = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        id: 2,
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
      };

      const updatedUser = await repository.update(data);

      expect(updatedUser).toEqual(
        expect.objectContaining({
          id: data.id,
          name: data.name,
          email: data.email,
        }),
      );
    });

    it('throws an error if the user is not found', async () => {
      const data: User = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        id: 999,
        created_at: undefined,
        updated_at: undefined,
        userRoles: [],
      };

      await expect(repository.update(data)).rejects.toThrow(
        `User 999 not found`,
      );
    });
  });

  describe('delete', () => {
    it('deletes a user by ID', async () => {
      await repository.delete(1);
    });

    it('throws an error if the user with the provided ID was not found', async () => {
      await expect(repository.delete(999)).rejects.toThrow(
        `User with ID 999 was not found`,
      );
    });
  });

  describe('findAll', () => {
    it('returns an array of users', async () => {
      const users = await repository.findAll();

      expect(Array.isArray(users)).toBe(true);
    });
  });
});
