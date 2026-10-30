import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";
export const supabase = createClient("https://lyynaepphjrszkpcytgl.supabase.co", "sb_publishable_2DA0GRjPsS36TcShJuve8A_txGFGO35");
export async function submitIntake(payload) {
  const { data, error } = await supabase.functions.invoke("public-intake", { body: payload });
  if (error) throw new Error(error.message || "Erreur de connexion.");
  if (!data?.success) throw new Error(data?.error || "La demande n'a pas été enregistrée.");
  return data;
}
