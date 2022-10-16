export interface ExtractedApiError {
  message: string;
  code?: string;
}

/**
 * Helper to extract error message (and code) from GraphQL errors.
 *
 * @param error The received error object
 * @param defaultMsg Optional default error message
 * @returns Extracted error message
 */
export const extractApiError = (
  error: unknown,
  defaultMsg: string = "An unexpected error has occurred."
): ExtractedApiError => {
  let extracted: ExtractedApiError = { message: defaultMsg };

  if (error instanceof Error) {
    if (typeof (error as unknown as any).response !== "undefined") {
      if (
        Array.isArray((error as unknown as any)?.response?.errors) &&
        typeof (error as unknown as any).response.errors[0]?.message === "string"
      ) {
        extracted.message = (error as unknown as any).response.errors[0]?.message;
        extracted.code =
          (error as unknown as any).response.errors[0]?.extensions?.response?.statusCode ??
          (error as unknown as any)?.response?.status;
      }
    }
  }

  return extracted;
};
