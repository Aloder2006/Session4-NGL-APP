import { z } from "zod";
import { AppError } from "../error/error.js";

export function validateBody(dto, body) {
    const result = z.safeParse(dto, body);
    if (result.success === false) {
        const errorMessages = result.error.issues.map(
            (issus) => `${issus.path[0] ?? "Error"}: ${issus.message}`,
        );
        throw new AppError(errorMessages.join(", "), 400);
    }
    return result.data;
}
