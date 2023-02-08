// seeds.js
import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();

  await generateAdmin(prisma);
}

async function generateAdmin(prisma: PrismaClient): Promise<void> {
  //create a new role admin
  const roleAdmin = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  //create a new user
  const user = await prisma.user.create({
    data: {
      name: 'QuorumIt',
      email: 'admin@quorumit.com',
      password: '$2b$10$bQjwbDpKOHau746cjLgyTOw8YAbAVhaGSuwUQctHI9AXajZQ8Z5Va', // it's Abc$12345$ hashed password
    },
  });

  // assing admin role to user
  await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: roleAdmin.id,
    },
  });

  // create admin permissions
  const permissions = [
    { name: 'Manage Roles' },
    { name: 'Manage Permissions' },
  ];
  for (const permission of permissions) {
    const target = await prisma.permission.create({
      data: {
        name: permission.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // assign permissions to role
    await prisma.rolePermission.create({
      data: {
        roleId: roleAdmin.id,
        permissionId: target.id,
      },
    });
  }
}

main().catch((e) => console.error(e));
