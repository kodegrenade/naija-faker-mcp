import faker from "@codegrenade/naija-faker";

type Language = "yoruba" | "igbo" | "hausa";
type ExportType = "person" | "detailedPerson" | "consistentPerson";
type ExportFormat = "json" | "csv";

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

export function generateEducationRecord(language?: Language, age?: number) {
  return faker.educationRecord(language, age);
}

export function generateWorkRecord(age?: number, graduationYear?: number) {
  return faker.workRecord(age, graduationYear);
}

export function generateStates() {
  return faker.states();
}

export function generateLgas() {
  return faker.lgas();
}

export function generateExport(
  type?: ExportType,
  count?: number,
  format?: ExportFormat,
) {
  return faker.export(type, count, format);
}
