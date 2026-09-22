# AI Atelier — 한국경제 AI 교육 포트폴리오

`dist` 폴더 전체가 완성된 웹사이트입니다. `article.html`을 브라우저로 열면 됩니다. `index.html`은 같은 기사 첫 화면입니다.

- `introduce.html`: Z-studio 자기소개와 작업 방식
- `article.html`: 대표 기사, 최근 기사 목록, 본문 팝업
- `image.html`: 액자형 이미지 갤러리, 확대 보기
- `video.html`: 대표 콘셉트 이미지와 3개 장면의 스토리보드
- `final.html`: 최종 프로젝트 소개, 제작 과정, 관련 페이지
- `style.css`: 공통 디자인과 모바일 반응형 스타일
- `script.js`: 기사 본문과 이미지 확대 기능
- `assets`: AI 생성 예시 이미지 3개

배경음악은 Luigi Boccherini의 *La Musica Notturna delle Strade di Madrid* 중 `Passacalle`입니다. 연주는 cello1753이며 [Internet Archive](https://archive.org/details/Boccherini-Passacalle)의 CC BY-ND 3.0 음원을 원본 그대로 사용했습니다.

모든 기사와 프로젝트 설명은 임시 예시입니다. 영상 파일은 포함되어 있지 않습니다. 실제 영상을 추가할 때 video.html의 screen 영역을 `<video controls playsinline poster="assets/architecture.png"><source src="assets/my-video.mp4" type="video/mp4"></video>`로 교체할 수 있습니다.

현재는 정적 포트폴리오로, 서버에 자료를 업로드하는 관리자 기능은 포함되지 않습니다. 내용을 수정한 HTML과 자료 파일을 함께 배포하는 방식입니다. 네 HTML을 직접 편집할 수 있습니다. build-pages.cjs를 다시 실행하면 HTML 직접 편집 내용은 덮어써지므로 둘 중 한 방식으로 관리하세요. article.html을 수정한 경우 index.html에도 동일한 내용을 반영하세요.

Google Fonts를 사용하며 인터넷 연결이 없으면 시스템 기본 서체로 표시됩니다. 첨부한 참고 이미지 자체는 사이트에 재게시하지 않았습니다.
