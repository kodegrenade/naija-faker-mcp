import { z } from "zod";

export const languageSchema = z.enum(["hausa", "igbo", "yoruba"]);
export const genderSchema = z.enum(["male", "female"]);
export const networkSchema = z.enum(["mtn", "glo", "airtel", "9mobile"]);
export const regionSchema = z.enum(["east", "west", "north", "south"]);
export const salaryLevelSchema = z.enum([
  "entry",
  "mid",
  "executive",
  "senior",
]);
export const countSchema = z.number().int().min(1);
export const ageSchema = z.number().int().min(0);
export const yearSchema = z.number().int();
export const seedSchema = z.number().int();

export const personOutputSchema = z.object({
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

export const consistentPersonOutputSchema = personOutputSchema.extend({
  state: z.string(),
  lga: z.string().nullable(),
  language: languageSchema,
  region: regionSchema,
});

export const educationRecordOutputSchema = z.object({
  university: z.string(),
  abbreviation: z.string(),
  degree: z.string(),
  discipline: z.string(),
  course: z.string(),
  graduationYear: z.number(),
});

export const workRecordOutputSchema = z.object({
  company: z.string(),
  position: z.string(),
  industry: z.string(),
  startYear: z.number(),
  yearsOfExperience: z.number(),
  level: salaryLevelSchema,
});

export const detailedPersonOutputSchema = consistentPersonOutputSchema.extend({
  dateOfBirth: z.object({ date: z.string(), age: z.number() }),
  maritalStatus: z.string(),
  bloodGroup: z.string(),
  genotype: z.string(),
  salary: z.object({
    amount: z.number(),
    currency: z.string(),
    level: z.string(),
    frequency: z.string(),
  }),
  nextOfKin: z.object({
    fullName: z.string(),
    relationship: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
  // null when the person is too young to have finished a qualification
  education: educationRecordOutputSchema.nullable(),
  work: workRecordOutputSchema,
  vehicle: z.object({
    licensePlate: z.string(),
    make: z.string(),
    model: z.string(),
    year: z.number(),
    color: z.string(),
  }),
});

export const personListOutputSchema = z.object({
  items: z.array(personOutputSchema),
});

export const consistentPersonListOutputSchema = z.object({
  items: z.array(consistentPersonOutputSchema),
});

export const detailedPersonListOutputSchema = z.object({
  items: z.array(detailedPersonOutputSchema),
});
