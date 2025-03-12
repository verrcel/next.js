import { RegisterUser } from "@/lib/auth/register";

// import { prisma } from "../prisma";

async function main() {
  try {
    await RegisterUser({
      email: "admin@admin.com",
      password: "admin",
      firstName: "Admin",
      lastName: "Admin",
    });
  } catch (error) {
    console.log(error);
  }
}

main();
