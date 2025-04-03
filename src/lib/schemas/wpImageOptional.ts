import { literal, string } from "zod";

export const wpImageOptional = string().url().or(literal(false));
