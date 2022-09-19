import joi from "joi";

export const testSchema = joi.object({
  name: joi.string().trim().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required(),
});
