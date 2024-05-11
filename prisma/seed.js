const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  // Create permissions
  const createUsers = await prisma.permission.create({
    data: { name: "create_users" },
  });
  const manageRoles = await prisma.permission.create({
    data: { name: "manage_roles" },
  });
  const resolveIssues = await prisma.permission.create({
    data: { name: "resolve_issues" },
  });
  const accessDashboard = await prisma.permission.create({
    data: { name: "access_dashboard" },
  });

  // Create roles with permissions
  await prisma.role.create({
    data: {
      name: "Admin",
      permissions: {
        connect: [
          { id: createUsers.id },
          { id: manageRoles.id },
          { id: resolveIssues.id },
          { id: accessDashboard.id },
        ],
      },
    },
  });

  await prisma.role.create({
    data: {
      name: "Employee",
      permissions: {
        connect: [{ id: accessDashboard.id }],
      },
    },
  });

  await prisma.role.create({
    data: {
      name: "Resolver",
      permissions: {
        connect: [{ id: resolveIssues.id }],
      },
    },
  });

  console.log("Seeding finished.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
