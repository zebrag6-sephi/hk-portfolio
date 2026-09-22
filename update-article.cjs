const fs=require('fs');
const paragraphs=["AI는 일상의 번거로운 일을 덜어 주는 도구로 자리 잡고 있다. 긴 글의 핵심을 정리하거나 낯선 외국어를 번역하고, 막막한 글쓰기의 첫 문장을 제안받는 일도 가능하다. 여러 자료를 오가며 시작점을 찾던 작업에서 AI와의 대화는 유용한 출발점이 된다.","배움의 과정에서도 편리함은 크다. 어려운 개념을 쉬운 예시로 다시 설명해 달라고 요청하고, 이해가 부족한 부분은 반복해서 질문할 수 있다. 기사 초안과 이미지 구상, 영상 구성안을 함께 살피면 혼자서는 떠올리지 못했던 표현을 발견하기도 한다. 중요한 것은 결과를 그대로 복사하기보다 자신의 목적에 맞게 고쳐 쓰는 과정이다.","물론 편리함이 정확함을 보장하지는 않는다. AI가 제시한 정보는 출처를 확인하고, 개인정보나 민감한 자료를 입력할 때도 주의해야 한다. 최종 판단과 책임은 사용하는 사람에게 있다. 반복 작업에 쓰던 시간을 줄이고 생각과 창작에 더 집중할 수 있다면, AI는 우리의 가능성을 넓히는 든든한 도구가 될 것이다."];
for(const file of ['build-pages.cjs','dist/article.html','dist/index.html']){
let text=fs.readFileSync(file,'utf8');
text=text.replace('<h2>AI 시대에도,<br>좋은 기사는<br><em>좋은 질문에서.</em></h2>','<h2>AI시대,<br><em>아주 편리하다</em></h2>')
.replace('빠르게 답을 만드는 기술 앞에서, 우리는 어떤 질문을 남겨야 할까. 생성형 AI와 함께 기사를 쓰며 발견한 기록의 본질.','글쓰기부터 배움과 창작까지, 일상의 번거로움을 덜어 주는 AI. 편리함을 제대로 활용하기 위해 필요한 태도를 살펴봅니다.')
.replace('5분 읽기 · 예시 기사','2분 읽기 · AI와 일상');
fs.writeFileSync(file,text);
}
let script=fs.readFileSync('dist/script.js','utf8');
const start=script.indexOf("['AI 시대에도, 좋은 기사는 좋은 질문에서.'");
const end=script.indexOf('\n',start);
if(start<0||end<0)throw Error('기존 대표 기사를 찾지 못했습니다.');
script=script.slice(0,start)+JSON.stringify(['AI시대, 아주 편리하다',...paragraphs])+','+script.slice(end);
script=script.replace("label.textContent='한국경제 AI 교육 · 포트폴리오용 예시 기사'","label.textContent=Number(button.dataset.article)===0?'한국경제 AI 교육 · AI와 일상':'한국경제 AI 교육 · 포트폴리오용 예시 기사'");
fs.writeFileSync('dist/script.js',script);
console.log('대표 기사 반영 완료. 본문 '+paragraphs.join('\n\n').length+'자 (공백 및 문단 구분 포함).');
