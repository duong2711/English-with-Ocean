/* Uses the application's existing authenticated client. No new auth client or polling. */
window.initLDDWritingAPI = function (sb) {
 'use strict';
 const checked=async query=>{const {data,error}=await query;if(error)throw error;return data;};
 const session=async()=>{const {data,error}=await sb.auth.getSession();if(error)throw error;return data.session?.user||null;};
 const owner=async expected=>{const u=await session();if(!u||expected&&u.id!==expected)throw new Error('Phiên đăng nhập đã thay đổi. Vui lòng mở lại bài.');return u.id;};
 window.LDDWritingAPI={
  session,
  async draft(key){const id=await owner();return checked(sb.from('thcs_writing_drafts').select('draft,updated_at').eq('user_id',id).eq('task_key',key).maybeSingle());},
  async saveDraft(key,draft,expected){const id=await owner(expected);return checked(sb.from('thcs_writing_drafts').upsert({user_id:id,task_key:key,draft,updated_at:new Date().toISOString()},{onConflict:'user_id,task_key'}));},
  async submit(row,expected){const id=await owner(expected);return checked(sb.from('thcs_writing_submissions').insert({...row,user_id:id}).select('id,created_at').single());},
  async history(grade,teacher=false,offset=0){const id=await owner();let q=sb.from('thcs_writing_submissions').select('id,user_id,grade,unit,task_key,prompt,body,support,ai_feedback,created_at,thcs_writing_reviews(score,comment,updated_at)').eq('grade',grade);if(!teacher)q=q.eq('user_id',id);return checked(q.order('created_at',{ascending:false}).range(offset,offset+19));},
  async review(id,score,comment){await owner();return checked(sb.from('thcs_writing_reviews').upsert({submission_id:id,score,comment,updated_at:new Date().toISOString()}));},
  async students(){await owner();return checked(sb.from('student_grade_assignments').select('user_id,email,display_name,grade_level').not('user_id','is',null).order('email').limit(200));},
  async assignments(){const id=await owner();return checked(sb.from('thcs_writing_assignments').select('id,task_key,note,created_at').eq('user_id',id).order('created_at',{ascending:false}).limit(100));},
  async assign(user_id,task_key,note){await owner();return checked(sb.from('thcs_writing_assignments').upsert({user_id,task_key,note},{onConflict:'user_id,task_key'}));}
 };
 sb.auth.onAuthStateChange((event,session)=>{if(['SIGNED_IN','SIGNED_OUT','INITIAL_SESSION'].includes(event))setTimeout(()=>window.dispatchEvent(new CustomEvent('ldd:writing-auth',{detail:session?.user||null})),0);});
};
