const viewer=document.querySelector('#viewer');
const content=document.querySelector('#dialog-content');
const mainNav=document.querySelector('nav[aria-label="주 메뉴"]');
if(mainNav&&!mainNav.querySelector('a[href="service.html"]')){
  const serviceLink=document.createElement('a');
  serviceLink.href='service.html';
  serviceLink.textContent='서비스';
  mainNav.insertBefore(serviceLink,mainNav.querySelector('a[href="image.html"]'));
}
const collectionNumbers={image:'03',video:'04',final:'05'};
const pageName=[...document.body.classList].find(name=>name.startsWith('page-'))?.slice(5);
if(collectionNumbers[pageName]){
  const label=document.querySelector('.page-intro .eyebrow');
  if(label)label.textContent=`THE COLLECTION / ${collectionNumbers[pageName]}`;
}
const articles=[
["AI시대, 아주 편리하다","AI는 일상의 번거로운 일을 덜어 주는 도구로 자리 잡고 있다. 긴 글의 핵심을 정리하거나 낯선 외국어를 번역하고, 막막한 글쓰기의 첫 문장을 제안받는 일도 가능하다. 여러 자료를 오가며 시작점을 찾던 작업에서 AI와의 대화는 유용한 출발점이 된다.","배움의 과정에서도 편리함은 크다. 어려운 개념을 쉬운 예시로 다시 설명해 달라고 요청하고, 이해가 부족한 부분은 반복해서 질문할 수 있다. 기사 초안과 이미지 구상, 영상 구성안을 함께 살피면 혼자서는 떠올리지 못했던 표현을 발견하기도 한다. 중요한 것은 결과를 그대로 복사하기보다 자신의 목적에 맞게 고쳐 쓰는 과정이다.","물론 편리함이 정확함을 보장하지는 않는다. AI가 제시한 정보는 출처를 확인하고, 개인정보나 민감한 자료를 입력할 때도 주의해야 한다. 최종 판단과 책임은 사용하는 사람에게 있다. 반복 작업에 쓰던 시간을 줄이고 생각과 창작에 더 집중할 수 있다면, AI는 우리의 가능성을 넓히는 든든한 도구가 될 것이다."],
['그럴듯한 답변을 넘어, 팩트를 확인하는 습관','AI 답변을 읽을 때 문장이 자연스럽다는 이유만으로 내용을 신뢰하기 쉽습니다. 이번 실습은 답변을 검증 가능한 주장으로 나누는 데서 출발했습니다.','숫자가 등장하면 집계 기간과 단위를, 인용이 등장하면 발언의 원문을 확인합니다. 링크가 실제 자료로 연결되는지 살피고, 다른 시점의 통계를 직접 비교하고 있지는 않은지도 점검합니다.','확인하지 못한 사실은 확정적으로 쓰지 않습니다. 사실과 해석을 구분해 표시하는 습관이 글의 신뢰도를 높이는 출발점이 됩니다.'],
['한 줄의 질문이 달라지면, 결과도 달라질까?','같은 주제를 자유롭게 설명해 달라는 질문, 특정 독자에게 설명해 달라는 질문, 출처와 한계를 함께 정리해 달라는 질문으로 나누어 보았습니다.','질문마다 결과의 길이와 용어 선택, 구조가 달라졌습니다. 독자의 배경과 글의 목적을 지정하면 결과를 비교하고 수정하기가 쉬워졌습니다.','프롬프트를 한 번에 완성하려 하기보다 초안을 읽고 부족한 조건을 보완하는 과정이 필요했습니다. 결과물과 함께 질문을 수정한 이유도 기록해 두기로 했습니다.'],
['데이터에서 사람의 이야기를 발견하기','데이터를 기사로 옮길 때는 큰 숫자를 먼저 보여 주기보다, 그 변화가 누구의 일상과 연결되는지 살펴보았습니다.','평균값 하나가 모든 사람의 경험을 설명하지는 않습니다. 집단별 차이와 조사 범위를 확인한 뒤, 자료가 말해 주는 내용과 말해 주지 않는 내용을 나누어 정리했습니다.','이번 기획에서는 독자가 자신의 일상에 연결해 볼 수 있는 질문을 도입부에 배치했습니다. 수치는 그 질문을 설명하는 근거로 사용하고, 과도한 일반화는 피하는 방향으로 초안을 구성했습니다.']];
const articleCharts=[
  {src:'assets/chart-ai-convenience.svg',alt:'정보 정리, 초안 작성, 아이디어 확장, 반복 작업의 AI 체감 편의성을 비교한 막대그래프',title:'AI 활용 장면별 체감 편의성',labels:['정보 정리','초안 작성','아이디어 확장','반복 작업'],values:[84,71,63,58]},
  {src:'assets/chart-fact-check.svg',alt:'출처 확인, 기간과 단위 확인, 교차 검증, 불확실성 표시의 중요도를 나타낸 단계형 그래프',title:'신뢰도를 높이는 네 단계',labels:['출처 확인','기간·단위 확인','교차 검증','불확실성 표시'],values:[92,78,65,54]},
  {src:'assets/chart-prompt-quality.svg',alt:'자유 질문, 독자 지정, 출처와 한계 포함 질문의 결과 품질을 비교한 막대그래프',title:'질문 방식에 따른 결과 품질',labels:['출처·한계 포함','독자 지정','자유 질문','조건 없음'],values:[91,79,57,42]},
  {src:'assets/chart-data-story.svg',alt:'전체 평균과 세 집단의 분기별 변화를 비교한 선그래프',title:'평균 뒤에 숨은 서로 다른 경험',labels:['A 그룹','전체 평균','B 그룹','C 그룹'],values:[80,64,52,36]}
];
function chartFallback(chart){const colors=['#33438a','#444837','#9b7d49','#74765e'];const rows=chart.labels.map((label,i)=>`<text x="45" y="${132+i*60}" fill="#4c4d42" font-family="sans-serif" font-size="14">${label}</text><rect x="175" y="${111+i*60}" width="455" height="26" rx="13" fill="#e5decd"/><rect x="175" y="${111+i*60}" width="${Math.round(4.55*chart.values[i])}" height="26" rx="13" fill="${colors[i]}"/><text x="${190+Math.round(4.55*chart.values[i])}" y="${131+i*60}" fill="${colors[i]}" font-family="serif" font-size="17" font-weight="700">${chart.values[i]}</text>`).join('');const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430"><rect width="760" height="430" rx="24" fill="#f8f4e9"/><rect x="12" y="12" width="736" height="406" rx="17" fill="none" stroke="#c6b894"/><text x="45" y="57" fill="#303127" font-family="serif" font-size="27">${chart.title}</text><text x="45" y="84" fill="#9b7d49" font-family="sans-serif" font-size="11" letter-spacing="2">EDITORIAL CHART · SAMPLE DATA</text>${rows}<path d="M45 374H715" stroke="#c6b894"/><text x="45" y="403" fill="#777568" font-family="sans-serif" font-size="12">기사 이해를 돕기 위한 학습용 예시 지수</text></svg>`;return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
function openDialog(){viewer.showModal();document.body.style.overflow='hidden'}
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>document.body.style.overflow='');
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});
document.querySelectorAll('[data-article]').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.article);const [title,...paras]=articles[index];const chart=articleCharts[index];content.replaceChildren();const section=document.createElement('article');section.className='dialog-body';const h=document.createElement('h2');h.className='dialog-title';h.id='dialog-title';h.textContent=title;section.append(h);const label=document.createElement('small');label.textContent=index===0?'한국경제 AI 교육 · AI와 일상':'한국경제 AI 교육 · 포트폴리오용 예시 기사';section.append(label);paras.forEach((text,paragraphIndex)=>{const p=document.createElement('p');p.textContent=text;section.append(p);if(paragraphIndex===0&&chart){const figure=document.createElement('figure');figure.className='article-chart';const img=document.createElement('img');img.src=chart.src;img.alt=chart.alt;img.width=760;img.height=430;img.addEventListener('error',()=>{if(!img.dataset.fallback){img.dataset.fallback='true';img.src=chartFallback(chart)}});const caption=document.createElement('figcaption');const strong=document.createElement('strong');strong.textContent=chart.title;const note=document.createElement('span');note.textContent='학습용 예시 데이터 · 실제 조사 결과가 아닙니다.';caption.append(strong,note);figure.append(img,caption);section.append(figure)}});content.append(section);viewer.setAttribute('aria-labelledby','dialog-title');openDialog()}));
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{content.replaceChildren();const img=document.createElement('img');img.src=button.dataset.image;img.alt=button.dataset.title;img.className='dialog-image';const h=document.createElement('h2');h.id='dialog-title';h.className='dialog-title';h.textContent=button.dataset.title;content.append(img,h);viewer.setAttribute('aria-labelledby','dialog-title');openDialog()}));

const siteMusic=document.querySelector('#site-music');
const musicToggle=document.querySelector('#music-toggle');
if(siteMusic&&musicToggle){
  const musicIcon=musicToggle.querySelector('.music-icon');
  const musicState=musicToggle.querySelector('.music-state');
  const updateMusicUI=playing=>{
    musicToggle.setAttribute('aria-pressed',String(playing));
    musicIcon.textContent=playing?'Ⅱ':'♪';
    musicState.textContent=playing?'음악 끄기':'음악 켜기';
  };
  const restoreMusicTime=()=>{
    const saved=Number(sessionStorage.getItem('atelier-music-time'));
    if(Number.isFinite(saved)&&saved>0&&saved<siteMusic.duration)siteMusic.currentTime=saved;
  };
  const playMusic=async()=>{
    try{await siteMusic.play();updateMusicUI(true)}catch{updateMusicUI(false)}
  };
  siteMusic.volume=.22;
  siteMusic.addEventListener('loadedmetadata',restoreMusicTime,{once:true});
  if(localStorage.getItem('atelier-music')!=='off')playMusic();
  else updateMusicUI(false);
  musicToggle.addEventListener('click',async()=>{
    if(siteMusic.paused){localStorage.setItem('atelier-music','on');await playMusic()}
    else{siteMusic.pause();localStorage.setItem('atelier-music','off');updateMusicUI(false)}
  });
  window.addEventListener('pagehide',()=>sessionStorage.setItem('atelier-music-time',String(siteMusic.currentTime)));
}
