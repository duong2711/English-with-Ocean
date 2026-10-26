/* Teacher-only browser ZIP importer for Dung & Duong comic images.
   Sends files directly to the authorized B2 Edge Function. No Supabase Storage. */
(function(){
 "use strict";
 if(window.__lddComicB2ImportV1) return;
 window.__lddComicB2ImportV1=true;
 const PROJECT="ywqbaksmmtvwbojcgsdd";
 const ROOT="https://"+PROJECT+".supabase.co";
 const ANON="sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_";
 const TEACHER="lddbaiu@gmail.com";
 const MAX_BYTES=20*1024*1024;
 const ENDPOINT=ROOT+"/functions/v1/comics-b2-import";
 let authClient=null,initializing=null;
 const SESSION_KEY="sb-"+PROJECT+"-auth-token";
 let panel=null;

 // Read the same persisted Supabase session used by the site's other
 // teacher-only controls. A separate auth client is an optional fallback.
 function storedSession(){
  try {
   const value=JSON.parse(localStorage.getItem(SESSION_KEY)||"null");
   if(value?.access_token)return value;
   if(value?.currentSession?.access_token)return value.currentSession;
   if(Array.isArray(value)&&value[0]?.access_token)return value[0];
  }catch(_){}
  return null;
 }
 function jwtEmail(token){
  try{
   const part=String(token||"").split(".")[1];
   if(!part)return "";
   const b64=part.replace(/-/g,"+").replace(/_/g,"/");
   const payload=JSON.parse(atob(b64.padEnd(Math.ceil(b64.length/4)*4,"=")));
   return String(payload.email||"").trim().toLowerCase();
  }catch(_){return "";}
 }
 function isTeacherSession(session){
  return !!(session?.access_token && String(session?.user?.email||jwtEmail(session.access_token)).trim().toLowerCase()===TEACHER);
 }
 function teacherSession(){
  const session=storedSession();
  return isTeacherSession(session)?session:null;
 }
 function clientIfReady(){
  if(!authClient&&window.supabase?.createClient)authClient=window.supabase.createClient(ROOT,ANON);
  return authClient;
 }
 function textNode(tag,content,cls){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=content;return el;}

 function gradeData(grade){
  switch(Number(grade)){
   case 6:return typeof GRADE6_UNITS!=="undefined"?GRADE6_UNITS:[];
   case 7:return typeof GRADE7_UNITS!=="undefined"?GRADE7_UNITS:[];
   case 8:return typeof GRADE8_UNITS!=="undefined"?GRADE8_UNITS:[];
   case 9:return typeof GRADE9_UNITS!=="undefined"?GRADE9_UNITS:[];
   case 10:return typeof GRADE10_UNITS!=="undefined"?GRADE10_UNITS:[];
   case 11:return typeof GRADE11_UNITS!=="undefined"?GRADE11_UNITS:[];
   case 12:return typeof GRADE12_UNITS!=="undefined"?GRADE12_UNITS:[];
   default:return [];
  }
 }
 async function publishImages(uploaded,client){
  if(!client)throw Error("Không thể kết nối cơ sở dữ liệu để xuất bản.");
  const {data:{user},error:authError}=await client.auth.getUser();
  if(authError||!user||user.email?.toLowerCase()!==TEACHER)throw Error("Phiên đăng nhập giáo viên đã hết hạn.");
  const groups=new Map();
  for(const item of uploaded){
   if(!item.url||!item.grade||!item.unit_id||!item.frame_index)continue;
   const key=item.grade+"-"+item.unit_id;
   if(!groups.has(key))groups.set(key,[]);
   groups.get(key).push(item);
  }
  let success=0;const errors=[];
  for(const [key,items] of groups){
   const grade=Number(items[0].grade),unitId=items[0].unit_id;
   const {data:existing,error:readError}=await client.from("thcs_story_frames")
     .select("id,frame_index,image_url,content_html,keywords").eq("grade",grade).eq("unit_id",unitId);
   if(readError){errors.push(key+": không đọc được nội dung");continue;}
   const unit=gradeData(grade).find(x=>x.id===unitId);
   const source=unit?.storyFrames||[];
   const patches=[];
   for(const image of items){
    const frame=Number(image.frame_index);
    const current=(existing||[]).find(x=>x.frame_index===frame);
    if(current){
     const {error}=await client.from("thcs_story_frames").update({
      image_url:image.url,updated_by:user.email,updated_at:new Date().toISOString()
     }).eq("id",current.id);
     if(error)errors.push(image.name+": "+error.message);
     else success++;
    }else if(source[frame-1]){
     patches.push({grade,unit_id:unitId,frame_index:frame,image_url:image.url,
       content_html:source[frame-1].content_html||"",keywords:source[frame-1].keywords||[],
       created_by:user.email,updated_by:user.email,updated_at:new Date().toISOString()});
    }else errors.push(image.name+": chưa có văn bản truyện gốc, không tạo khung rỗng");
   }
   if(patches.length){
    const {error}=await client.from("thcs_story_frames").insert(patches);
    if(error)errors.push(key+": "+error.message);
    else success+=patches.length;
   }
  }
  if(success)document.dispatchEvent(new Event("ldd:story-frames-updated"));
  return {success,errors};
 }
 function mount(client){
  if(document.getElementById("ldd-ent-comic-upload-tool"))return;
  const comic=document.getElementById("ldd-ent-comics-panel");
  if(!comic)return;
  const tool=document.createElement("section");
  tool.id="ldd-ent-comic-upload-tool";
  tool.className="ldd-ent-b2-uploader";
  const title=textNode("h4","📤 Tải ảnh truyện lên Backblaze B2 (ZIP)");
  const desc=textNode("Chọn ZIP chứa ảnh có tên g06-u01-f01.webp (lớp 6, Unit 1, khung 1). Hỗ trợ nhiều lớp/Unit trong một ZIP, JPG/PNG/WebP, tối đa 100 ảnh và 20 MB. Ảnh cũ chỉ thay đổi khi khung tương ứng được cập nhật.","ldd-ent-b2-help");
  const input=document.createElement("input");
  input.type="file";input.accept=".zip,application/zip";input.id="ldd-ent-b2-zip";input.setAttribute("aria-label","Chọn file ZIP ảnh Dung và Dương");
  const status=textNode("p","","ldd-ent-b2-status");status.setAttribute("role","status");status.setAttribute("aria-live","polite");
  const results=document.createElement("div");results.className="ldd-ent-b2-results";
  tool.append(title,desc,input,status,results);
  const body=comic.querySelector(".ldd-ent-comics-body");
  if(body)comic.insertBefore(tool,body);else comic.append(tool);
  panel=tool;
  input.addEventListener("change",async function(){
   const file=input.files?.[0];
   if(!file)return;
   if(!/\.zip$/i.test(file.name)||file.size<=0||file.size>MAX_BYTES){
    status.textContent="Gói ZIP không hợp lệ hoặc lớn hơn 20 MB.";input.value="";return;
   }
   input.disabled=true;
   status.textContent="Đang xác thực và tải ảnh lên Backblaze B2…";
   results.replaceChildren();
   try{
    const session=teacherSession()||(client?(await client.auth.getSession()).data?.session:null);
    if(!isTeacherSession(session))throw Error("Hãy đăng nhập tài khoản giáo viên để tải ảnh.");
    const response=await fetch(ENDPOINT,{method:"POST",
     headers:{"Authorization":"Bearer "+session.access_token,"apikey":ANON,"Content-Type":"application/zip"},
     body:file
    });
    const body=await response.json();
    if(!response.ok||!body.ok)throw Error(body.error||"Upload failed");

    status.textContent="Đã tải "+body.uploadedCount+" ảnh lên B2. Đang cập nhật từng khung truyện…";
    const published=await publishImages(body.uploaded||[],client);
    const paragraph=textNode("p","Ảnh đã tải lên B2:");results.append(paragraph);
    (body.uploaded||[]).forEach(item=>{
      if(!item.url||!item.name)return;
      const link=document.createElement("a");link.href=item.url;
      link.target="_blank";link.rel="noopener noreferrer";link.textContent=item.name;
      results.append(link);
    });
    status.textContent="Đã cập nhật "+published.success+"/"+body.uploadedCount+" ảnh lên website."
      +(published.errors.length?" Lỗi: "+published.errors.join(" | "):"");
   }catch(error){
    status.textContent="Chưa hoàn tất upload: "+String(error.message||error).slice(0,150);
   }finally{input.disabled=false;input.value="";}
  });
 }
 function removeUploader(){
  document.getElementById("ldd-ent-comic-upload-tool")?.remove();
  panel=null;
 }
 let latestCheck=0;
 async function check(){
  const request=++latestCheck;
  const client=clientIfReady();
  if(!client){removeUploader();return;}
  try{
   const {data,error}=await client.auth.getUser();
   if(request!==latestCheck)return;
   // Never create even a disabled ZIP field for student accounts.
   if(error||String(data?.user?.email||"").trim().toLowerCase()!==TEACHER){
    removeUploader();
    return;
   }
   mount(client);
  }catch(error){
   if(request===latestCheck)removeUploader();
  }
 }
 function init(){
  const tab=document.getElementById("tab-giai-tri");
  if(!tab)return;
  void check();
  // Recheck on entering comics, and when returning to the tab after login.
  tab.addEventListener("click",function(event){
   if(event.target?.closest?.("#ldd-ent-comics-entry, #ldd-ent-comics-panel"))void check();
  },true);
  document.addEventListener("ldd:ent-comics-visible",function(){void check();});
  document.addEventListener("visibilitychange",function(){if(!document.hidden)void check();});
  window.addEventListener("focus",function(){void check();});
  window.addEventListener("storage",function(event){
   if(event.key===SESSION_KEY)void check();
  });
  // The Entertainment module may still be creating its panel on first load.
  if(!document.getElementById("ldd-ent-comics-panel")){
   const observer=new MutationObserver(function(){
    if(document.getElementById("ldd-ent-comics-panel")){
     observer.disconnect();
     void check();
    }
   });
   observer.observe(tab,{childList:true,subtree:true});
  }
  const client=clientIfReady();
  if(client)client.auth.onAuthStateChange(function(){
   ++latestCheck;
   removeUploader();
   // Defer any network auth check until after the auth state change completes.
   setTimeout(function(){void check();},0);
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
 else init();
})();