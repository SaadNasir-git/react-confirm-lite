import { addAlert } from "./confirm_store";
import type { ConfirmInput } from "./types";

export async function confirm(input: ConfirmInput): Promise<boolean | null> {
  const result = await addAlert(input);
  return result;
}