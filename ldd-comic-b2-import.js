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
 const MAX_BYTES=6*1024*1024;
 const ENDPOINT=ROOT+"/functions/v1/comics-b2-import";
 let authClient=null,initializing=null;
 let panel=null;
 function textNode(tag,content,cls){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=content;return el;}
 function gradeData(grade){
  switch(grade){
   case 6:return typeof GRADE6_UNITS!=="undefined"?GRADE6_UNITS:[];
   case 7:return typeof GRADE7_UNITS!=="undefined"?GRADE7_UNITS:[];
   default:return [];
  }
 }
 async function tryPublishEmptyGrade6Unit2(uploaded,client){
  const matches=uploaded.filter(item=>item?.name==="g06-u02-f01.webp"||item?.name==="g06-u02-f02.webp");
  if(matches.length!==2)return "Đã tải ảnh lên B2. Chưa liên kết Unit 2 vì thiếu ảnh phù hợp.";
  const source=gradeData(6).find(u=>u.id==="u2");
  if(!source||!Array.isArray(source.storyFrames)||source.storyFrames.length!==4)
   return "Đã tải ảnh lên B2. Dữ liệu Unit 2 chưa sẵn sàng để liên kết.";
  // If any teacher row exists, never update it or insert partial records.
  const {data:existing,error:readError}=await client.from("thcs_story_frames")
   .select("frame_index,image_url").eq("grade",6).eq("unit_id","u2");
  if(readError) return "Đã tải lên B2. Không đọc được dữ liệu Unit 2, nên chưa liên kết.";
  if(existing&&existing.length) return "Đã tải lên B2. Unit 2 đang có nội dung của giáo viên; không ghi đè.";
  // This exact mapping is deliberately explicit, never inferred from filename slicing.
  const byFrame={
   1:matches.find(x=>x.name==="g06-u02-f01.webp")?.url||"",
   2:matches.find(x=>x.name==="g06-u02-f02.webp")?.url||""
  };
  if(!byFrame[1]||!byFrame[2])return "Đã tải lên B2; thiếu URL công khai.";
  // Verify the two public URLs can actually render before writing the database.
  async function visible(url){
   return await new Promise(resolve=>{
    const image=new Image();
    const timer=setTimeout(()=>{image.src="";resolve(false);},9000);
    image.onload=()=>{clearTimeout(timer);resolve(true);};
    image.onerror=()=>{clearTimeout(timer);resolve(false);};
    image.src=url;
   });
  }
  const checks=await Promise.all([visible(byFrame[1]),visible(byFrame[2])]);
  if(checks.some(v=>!v))return "Ảnh đã lên B2 nhưng chưa tải được công khai; chưa liên kết website.";
  const {data:{user}}=await client.auth.getUser();
  const editor=user?.email||TEACHER;
  const rows=source.storyFrames.map((f,i)=>({
   grade:6,unit_id:"u2",frame_index:i+1,
   content_html:f.content_html||"",keywords:Array.isArray(f.keywords)?f.keywords:[],
   image_url:byFrame[i+1]||f.image_url||"",
   created_by:editor,updated_by:editor,updated_at:new Date().toISOString()
  }));
  // INSERT only. If another editor wrote anything meanwhile, the unique index
  // rejects the transaction, rather than overwriting the new teacher content.
  const {error:writeError}=await client.from("thcs_story_frames").insert(rows);
  if(writeError) return "Ảnh đã lên B2 nhưng Unit 2 chưa liên kết (dữ liệu thay đổi hoặc quyền không cho phép).";
  document.dispatchEvent(new Event("ldd:story-frames-updated"));
  return "Đã liên kết 2 ảnh phù hợp vào Lớp 6 – Unit 2; bảo toàn đủ 4 khung truyện và toàn bộ nội dung gốc. Các ảnh còn lại giữ ở B2 để duyệt.";
 }
 function mount(client){
  if(document.getElementById("ldd-ent-comic-upload-tool"))return;
  const comic=document.getElementById("ldd-ent-comics-panel");
  if(!comic)return;
  const tool=document.createElement("section");
  tool.id="ldd-ent-comic-upload-tool";
  tool.className="ldd-ent-b2-uploader";
  const title=textNode("h4","📤 Tải ảnh truyện lên Backblaze B2 (ZIP)");
  const desc=textNode("Bấm Chọn tệp → chọn ldd_dung_duong_b2_upload_pack.zip trong Tải xuống. Hệ thống upload 10 ảnh lên Backblaze B2, giữ nguyên ảnh cũ của giáo viên.","ldd-ent-b2-help");
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
    status.textContent="Gói ZIP không hợp lệ hoặc lớn hơn 6 MB.";input.value="";return;
   }
   input.disabled=true;
   status.textContent="Đang xác thực và tải 10 ảnh lên Backblaze B2…";
   results.replaceChildren();
   try{
    const {data:{session}}=await client.auth.getSession();
    if(!session?.access_token)throw Error("Phiên đăng nhập hết hạn");
    const response=await fetch(ENDPOINT,{method:"POST",
     headers:{"Authorization":"Bearer "+session.access_token,"apikey":ANON,"Content-Type":"application/zip"},
     body:file
    });
    const body=await response.json();
    if(!response.ok||!body.ok)throw Error(body.error||"Upload failed");
    status.textContent="Đã upload "+body.uploadedCount+"/10 ảnh. Đang kiểm tra khả năng liên kết…";
    const paragraph=textNode("p","Ảnh trên Backblaze B2:");
    results.append(paragraph);
    (body.uploaded||[]).forEach(item=>{
     if(!item.url||!item.name)return;
     const link=document.createElement("a");
     link.href=item.url;link.target="_blank";link.rel="noopener noreferrer";
     link.textContent=item.name;
     results.append(link);
    });
    status.textContent=await tryPublishEmptyGrade6Unit2(body.uploaded||[],client);
   }catch(error){
    status.textContent="Chưa hoàn tất upload: "+String(error.message||error).slice(0,150);
   }finally{input.disabled=false;input.value="";}
  });
 }
 function isTeacherSession(session) {
  return session?.user?.email?.toLowerCase() === TEACHER;
 }
 function removeUploader() {
  document.getElementById("ldd-ent-comic-upload-tool")?.remove();
 }
 async function check(){
  if(initializing)return initializing;
  initializing=(async()=>{
   if(!window.supabase?.createClient){
    console.warn("[LDD comics] Supabase client library unavailable");
    return;
   }
   if(!authClient)authClient=window.supabase.createClient(ROOT,ANON);
   // Use the same persisted session as the site's login. Calling getUser()
   // over the network here previously prevented the uploader from appearing
   // when the site UI had already restored an authenticated session.
   const {data:{session},error}=await authClient.auth.getSession();
   if(error)throw error;
   if(isTeacherSession(session))mount(authClient);
   else removeUploader();
  })();
  try{await initializing}
  catch(error){console.warn("[LDD comics] Cannot initialize teacher uploader",error);}
  finally{initializing=null}
 }
 function init(){
  const tab=document.getElementById("tab-giai-tri");
  if(!tab)return;
  // Mount immediately for a restored teacher login; don't make opening the
  // root comic card the only opportunity to attach the uploader.
  void check();
  tab.addEventListener("click",function(event){
   const target=event.target;
   if(target?.closest?.("#ldd-ent-comics-entry, #ldd-ent-comics-panel"))void check();
  },true);
  document.addEventListener("ldd:ent-comics-visible",function(){void check()});
  // Entertainment library panels can be created after this module loads.
  if(!document.getElementById("ldd-ent-comics-panel")){
   const observer=new MutationObserver(function(){
    if(document.getElementById("ldd-ent-comics-panel")){
     observer.disconnect();
     void check();
    }
   });
   observer.observe(tab,{childList:true,subtree:true});
  }
  // React to the auth client restoring/logging out without polling.
  if(window.supabase?.createClient){
   if(!authClient)authClient=window.supabase.createClient(ROOT,ANON);
   authClient.auth.onAuthStateChange(function(event,session){
    setTimeout(function(){
     if(event==="SIGNED_OUT" || !isTeacherSession(session))removeUploader();
     else mount(authClient);
    },0);
   });
  }
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
 else init();
})();