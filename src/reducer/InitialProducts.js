import { getitems } from "../utils/peticiones"

export async function loadInitialProducts() {
  return await getitems();
}
