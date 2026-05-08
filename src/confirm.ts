import { addAlert } from "./confirm_store";
import type { ConfirmInput } from "./types";

export async function confirm(input: string | ConfirmInput): Promise<boolean | null> {

  if (typeof input === 'string') {
    const result = await addAlert({
      message: input
    });
    return result;
  }

  const result = await addAlert({
    ...input
  });
  return result;
}