import { addAlert, getElement } from "./confirm_store";
import type { ConfirmInput } from "./types";

export async function confirm(input: string | ConfirmInput): Promise<boolean | null> {
  if (typeof input === 'string') {
    const containerId = await getElement();
    const result = await addAlert({ 
      message: input, 
      id: containerId 
    });
    return result;
  } 
  
  if (!input.id) {
    const containerId = await getElement();
    const result = await addAlert({ 
      ...input, 
      id: containerId 
    });
    return result;
  } 
  
  const result = await addAlert(input);
  return result;
}