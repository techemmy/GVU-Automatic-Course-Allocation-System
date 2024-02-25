import { Specialization } from "src/specialization/schemas/specialization.schema";

export function formatDate(dateObj: Date): string {
  return dateObj.toLocaleDateString();
}

export function formatSpecializations(specializations: Specialization[]) {
  return specializations.map((s) => `<b>${s.name}</b>`).join(', ');
}
