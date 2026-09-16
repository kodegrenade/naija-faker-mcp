import { z } from "zod";

export const languageSchema = z.enum(["hausa", "igbo", "yoruba"]);
export const genderSchema = z.enum(["male", "female"]);
export const networkSchema = z.enum(["mtn", "glo", "airtel", "9mobile"]);
export const salaryLevelSchema = z.enum([
  "entry",
  "mid",
  "executive",
  "senior",
]);
export const countSchema = z.number().int().min(1);
export const ageSchema = z.number().int().min(0);

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
  education: z.object({
    university: z.string(),
    abbreviation: z.string(),
    degree: z.string(),
    course: z.string(),
    graduationYear: z.number(),
  }),
  work: z.object({
    company: z.string(),
    position: z.string(),
    industry: z.string(),
    startYear: z.number(),
  }),
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
