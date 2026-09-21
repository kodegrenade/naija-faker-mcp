import faker from "@codegrenade/naija-faker";

type Language = "yoruba" | "igbo" | "hausa";
type Gender = "male" | "female";
type SalaryLevel = "entry" | "mid" | "executive" | "senior";

export function generateDateOfBirth(minAge: number, maxAge: number) {
  return faker.dateOfBirth({ minAge, maxAge });
}

export function generateMaritalStatus(age?: number) {
  return faker.maritalStatus(age);
}

export function generateBloodGroup() {
  return faker.bloodGroup();
}

export function generateGenotype() {
  return faker.genotype();
}

export function generateSalary(level?: SalaryLevel) {
  return faker.salary({ level });
}

export function generateNextOfKin(language?: Language, gender?: Gender) {
  return faker.nextOfKin(language, gender);
}

export function generateBankAccount(bankName?: string) {
  return faker.bankAccount(bankName);
}
