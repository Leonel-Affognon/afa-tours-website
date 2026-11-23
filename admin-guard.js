// Garde-fou des écritures de l'espace admin.
// Supabase ne signale pas d'erreur quand une modification ou une suppression ne touche aucune ligne
// (par exemple si la session n'a pas la double authentification, ou si les droits ne suffisent pas).
// Ce module fait échouer ces opérations explicitement, pour que l'admin affiche une erreur au lieu de
// croire que la modification est enregistrée.
import { supabase } from "./backend.js";

const NOT_SAVED = "Modification NON enregistrée dans la base : aucune ligne n’a été changée. Reconnectez-vous, validez la double authentification, puis réessayez.";

const origFrom = supabase.from.bind(supabase);

supabase.from = (table) => {
  const query = origFrom(table);
  for (const method of ["update", "delete"]) {
    const original = query[method].bind(query);
    query[method] = (...args) => {
      // .select() renvoie les lignes réellement modifiées : une liste vide signifie que rien n'a été enregistré.
      const builder = original(...args).select();
      const originalThen = builder.then.bind(builder);
      builder.then = (onOk, onErr) => originalThen((result) => {
        if (!result.error && Array.isArray(result.data) && result.data.length === 0) {
          return { ...result, data: null, error: { message: NOT_SAVED } };
        }
        return result;
      }).then(onOk, onErr);
      return builder;
    };
  }
  return query;
};
