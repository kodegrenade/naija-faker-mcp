import faker from "@codegrenade/naija-faker";

type Language = "yoruba" | "igbo" | "hausa";

export function generateVehicleRecord(state?: string) {
  return faker.vehicleRecord(state);
}

export function generateLicensePlate(state?: string) {
  return faker.licensePlate(state);
}

export function generateCompany() {
  return faker.company();
}

export function generateUniversity() {
  return faker.university();
}

export function generateEducationRecord(language?: Language) {
  return faker.educationRecord(language);
}

export function generateWorkRecord() {
  return faker.workRecord();
}

export function generateStates() {
  return faker.states();
}

export function generateLgas() {
  return faker.lgas();
}
