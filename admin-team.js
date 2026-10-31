import { supabase } from "./backend.js";
const tabs=document.querySelector(".admin-tabs");
const button=document.createElement("button");button.type="button";button.dataset.teamTab="";button.textContent="Équipe";button.hidden=true;
const panel=document.createElement("section");panel.id="teamPanel";panel.className="admin-panel hidden";
tabs?.insertBefore(button,tabs.querySelector("#logoutButton"));
document.getElementById("dashboard")?.append(panel);
let owner=false;
async function refreshAccess(){
 const {data:{user}}=await supabase.auth.getUser();
 if(!user)return;
 const {data}=await supabase.from("admin_users").select("role").eq("user_id",user.id).maybeSingle();
 owner=data?.role==="owner";button.hidden=!owner;
}
async function call(action,values={}){
 const {data,error}=await supabase.functions.invoke("manage-team",{body:{action,...values}});
 if(error||!data?.success)throw new Error(data?.error||error?.message||"Opération impossible.");
 return data;
}
async function renderTeam(){
 panel.classList.remove("hidden");
 document.getElementById("adminContent").classList.add("hidden");
 panel.innerHTML='<h2>Gestion de l’équipe</h2><form id="inviteTeam" class="admin-grid"><label>Adresse e-mail<input name="email" type="email" required></label><label>Rôle<select name="role"><option value="admin">Administrateur</option><option value="editor">Éditeur</option></select></label><button class="button">Inviter le membre</button></form><p id="teamFeedback" class="admin-status" aria-live="polite"></p><div id="teamList">Chargement…</div>';
 document.getElementById("inviteTeam").addEventListener("submit",async e=>{
  e.preventDefault();const f=new FormData(e.currentTarget),feedback=document.getElementById("teamFeedback");
  try{await call("invite",{email:f.get("email"),role:f.get("role")});feedback.textContent="Invitation envoyée.";e.currentTarget.reset();await loadMembers();}
  catch(err){feedback.textContent=err.message;}
 });
 await loadMembers();
}
async function loadMembers(){
 const target=document.getElementById("teamList");if(!target)return;
 try{const {members}=await call("list");target.innerHTML=members.length?'<div style="overflow:auto"><table class="admin-table"><thead><tr><th>Email</th><th>Rôle</th><th>Ajouté le</th><th>Actions</th></tr></thead><tbody>'+members.map(m=>'<tr><td>'+esc(m.email)+'</td><td><select data-role="'+esc(m.user_id)+'"><option value="admin" '+(m.role==="admin"?"selected":"")+'>Administrateur</option><option value="editor" '+(m.role==="editor"?"selected":"")+'>Éditeur</option><option value="owner" disabled>Propriétaire</option></select></td><td>'+new Date(m.created_at).toLocaleDateString("fr-FR")+'</td><td><button data-update="'+esc(m.user_id)+'">Enregistrer</button><button data-remove="'+esc(m.user_id)+'">Retirer</button></td></tr>').join("")+'</tbody></table></div>':"<p>Aucun membre.</p>";
  target.querySelectorAll("[data-update]").forEach(b=>b.addEventListener("click",async()=>{try{await call("role",{user_id:b.dataset.update,role:target.querySelector('[data-role="'+b.dataset.update+'"]').value});await loadMembers();}catch(e){alert(e.message);}}));
  target.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm("Retirer les droits d’administration de ce membre ?"))return;try{await call("remove",{user_id:b.dataset.remove});await loadMembers();}catch(e){alert(e.message);}}));
 }catch(e){target.textContent=e.message;}
}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
button.addEventListener("click",async()=>{if(!owner)return;document.querySelectorAll("[data-tab]").forEach(x=>x.classList.remove("active"));button.classList.add("active");await renderTeam();});
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{panel.classList.add("hidden");document.getElementById("adminContent").classList.remove("hidden");button.classList.remove("active");}));
supabase.auth.onAuthStateChange(()=>{setTimeout(refreshAccess,0);});
refreshAccess();