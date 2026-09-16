import faker from "@codegrenade/naija-faker";

type Language = "yoruba" | "igbo" | "hausa";
type Gender = "male" | "female";

export function generatePerson(language?: Language, gender?: Gender) {
  return faker.person(language, gender);
}

export function generatePeople(count?: number) {
  return faker.people(count);
}

export function generateDetailedPerson(language?: Language, gender?: Gender) {
  return faker.detailedPerson(language, gender);
}

export function generateDetailedPeople(
  count: number,
  language?: Language,
  gender?: Gender,
) {
  return faker.detailedPeople(count, language, gender);
}

export function generateConsistentPerson(language?: Language, gender?: Gender) {
  return faker.consistentPerson(language, gender);
}

export function generateConsistentPeople(
  count: number | undefined,
  language?: Language,
  gender?: Gender,
) {
  return faker.consistentPeople(count, language, gender);
}
