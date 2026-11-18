const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

test('knowledge result starts collapsed, with a keyboard-accessible summary',()=>{
  const source=read('ldd-test-skills.js');
  const elements=[];
  const document={
    createElement(tag){
      const node={
        tagName:tag.toUpperCase(),children:[],attributes:{},textContent:'',
        appendChild(child){this.children.push(child);return child;},
        setAttribute(k,v){this.attributes[k]=v}
      };
      elements.push(node);return node;
    }
  };
  const window={};
  vm.runInNewContext(source,{document,window},{timeout:1000});
  const report=window.LDDTestSkills.report([
    {skill:{category:'Ngữ pháp',topic:'Thì hiện tại đơn'},total:2,correct:1,label:'Câu 2'}
  ],'Kết quả theo điểm kiến thức');
  assert.equal(report.tagName,'DETAILS');
  assert.equal(report.children[0].tagName,'SUMMARY');
  assert.equal(report.children[0].textContent,'Kết quả theo điểm kiến thức');
  assert.equal(report.attributes.open,undefined);
  assert.equal(report.children.filter(x=>x.tagName==='DETAILS').length,1);
});

test('re-entry quiz requires 10 questions, 6 correct answers, and >72h inactivity',()=>{
  const sql=read('reentry_revision_gate_setup.sql');
  assert.match(sql,/inactivity_hours integer not null default 72/);
  assert.match(sql,/question_count integer not null default 10/);
  assert.match(sql,/pass_count integer not null default 6/);
  assert.match(sql,/last_learning_at >= now\(\)-make_interval/);
  assert.match(sql,/if jsonb_array_length\(v_questions\)<>p_count then[\s\S]*return null/);
  assert.match(sql,/when v_score>=v_pass then 'passed' else 'failed'/);
  assert.match(sql,/gate_status='locked'/);
});

test('answer key never granted to student through the Data API',()=>{
  const sql=read('reentry_revision_gate_setup.sql');
  assert.match(sql,/revoke all on public\.ldd_reentry_settings,public\.ldd_reentry_students,public\.ldd_reentry_attempts from anon,authenticated/);
  assert.match(sql,/alter table public\.ldd_reentry_attempts enable row level security/);
  assert.match(sql,/select jsonb_agg\(jsonb_build_object\(\s*'id',q->>'id','prompt',q->>'prompt','options',q->'options','skill',q->'skill'/);
  assert.match(sql,/lower\(coalesce\(auth\.jwt\(\)->>'email',''\)\)<>'lddbaiu@gmail\.com'/);
  assert.match(sql,/grade_level=v_grade/);
  assert.match(sql,/s\.status='submitted'/);
  assert.match(sql,/q->>'type'='mcq'/);
});

test('lock screen is recoverable by teacher, without a learner-side unlock shortcut',()=>{
  const client=read('ldd-reentry-gate.js');
  assert.doesNotThrow(()=>new vm.Script(client));
  assert.match(client,/rpc\('ldd_reentry_submit'/);
  assert.match(client,/rpc\('ldd_reentry_admin_unlock'/);
  assert.match(client,/ldd-reentry-signout/);
  assert.match(client,/renderLocked\(result\.correct,result\.total\)/);
  assert.match(client,/lastEnabled=await rpc\('ldd_reentry_admin_set_enabled'/);
});

test('Auth ban and teacher unban require verified identity and server-side locked state',()=>{
  const edge=read('supabase/functions/reentry-auth-lock/index.ts');
  assert.match(edge,/scoped\.auth\.getUser\(jwt\)/);
  assert.match(edge,/scoped\.rpc\('ldd_reentry_status'\)/);
  assert.match(edge,/state\?\.mode !== 'locked'/);
  assert.match(edge,/ban_duration: '876000h'/);
  assert.match(edge,/ban_duration: 'none'/);
  assert.match(edge,/ldd_reentry_admin_can_unlock/);
  assert.doesNotMatch(read('ldd-reentry-gate.js'),/SERVICE_ROLE_KEY/);
});

test('staged deployment does not auto-enable the gate',()=>{
  const sql=read('reentry_revision_gate_setup.sql');
  assert.match(sql,/enabled boolean not null default false/);
  const html=read('index.html');
  assert.match(html,/ldd-reentry-gate\.js\?v=/);
  assert.match(html,/ldd-reentry-gate\.css\?v=/);
});
