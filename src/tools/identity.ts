import faker from "@codegrenade/naija-faker";

type Language = "yoruba" | "igbo" | "hausa";
type Gender = "male" | "female";
type Network = "mtn" | "glo" | "airtel" | "9mobile";

export function generateTitle(gender?: Gender) {
  return faker.title(gender);
}

export function generateName(language?: Language, gender?: Gender) {
  return faker.name(language, gender);
}

export function generatePhoneNumber(network?: Network) {
  return faker.phoneNumber(network);
}

export function generateEmail(name?: string) {
  return faker.email(name);
}

export function generateAddress() {
  return faker.address();
}

export function generateBvn() {
  return faker.bvn();
}

export function generateNin() {
  return faker.nin();
}
