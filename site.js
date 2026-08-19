(()=>{
  const press=document.getElementById('pressModal');
  const classified=document.getElementById('classifiedModal');
  const open=(el)=>{el.classList.add('open');el.setAttribute('aria-hidden','false')};
  const close=(el)=>{el.classList.remove('open');el.setAttribute('aria-hidden','true')};
  document.getElementById('doNotPress').addEventListener('click',()=>open(press));
  document.getElementById('classifiedBtn').addEventListener('click',()=>open(classified));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(document.getElementById(b.dataset.close))));
  [press,classified].forEach(m=>m.addEventListener('click',e=>{if(e.target===m)close(m)}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close(press);close(classified);const cm=document.getElementById('comicModal');if(cm)close(cm)}});
  const form=document.getElementById('codeForm'), input=document.getElementById('codeInput'), gate=document.getElementById('codeGate'), content=document.getElementById('classifiedContent'), err=document.getElementById('codeError');
  form.addEventListener('submit',e=>{e.preventDefault();if(input.value.trim()==='211'){gate.hidden=true;content.hidden=false;err.textContent=''}else{err.textContent='ACCESS DENIED.';input.select()}});

  const comics={
    'Emergency command':{
      caseNo:'CASE FILE 01', subtitle:'Emergency Command — Origin Evidence',
      panels:[
        ['🚨','ROOM GOES SIDEWAYS','A bad room gets loud all at once. Monitors yell. People freeze.','Somebody get Angela.'],
        ['⚡','THE CHARGE ARRIVES','Angela walks in wearing navy blue scrubs and the facial expression of a woman who has already solved this.','You two, airway. You, line. Call respiratory. Move.'],
        ['🩺','CHAOS ACQUIRES JOB ASSIGNMENTS','Six people suddenly have tasks. Nobody remembers volunteering. Everybody is somehow grateful.','Why are we still standing here?'],
        ['✅','INCIDENT RESOLVED','The room settles. The patient stabilizes. Angela leaves before anyone can congratulate her.','Good. Now who forgot to chart it?']
      ]
    },
    'Maternal radar':{
      caseNo:'CASE FILE 02', subtitle:'Maternal Radar — Range Test',
      panels:[
        ['📡','SIGNAL DETECTED','At an undisclosed distance, Angela suddenly stops mid-sentence.','One of my children is making a questionable decision.'],
        ['🛰️','NO DEVICE REQUIRED','Scientists search for antennas, satellites, trackers, or any plausible explanation. They find none.','I do not need Life360. I have a mother.'],
        ['📚','TARGET ACQUIRED','Somewhere else, unfinished homework and a weak excuse become aware they have been detected.','I was literally about to do it.'],
        ['⚡','CASE CLOSED','Angela sends one text containing four words. Homework is completed within minutes.','That is what I thought.']
      ]
    },
    'Weather intimidation':{
      caseNo:'CASE FILE 03', subtitle:'Weather Intimidation — Atmospheric Compliance Event',
      panels:[
        ['🌪️','SEVERE SYSTEM APPROACHES','A violent storm enters Rockingham County with extremely poor timing.','This is going to be a long night.'],
        ['📋','SCHEDULE CHECK','The storm learns Angela is working. Radar technicians report an unexplained pause in atmospheric confidence.','Oh. She is there tonight?'],
        ['👉','DIRECT INTERVENTION','Angela walks outside, points toward another county, and addresses the atmosphere like a difficult coworker.','Not tonight. Go around.'],
        ['🌤️','WEATHER RECONSIDERS','The storm turns east, weakens, and is later classified as partly cloudy with visible embarrassment.','O-okay. Sorry.']
      ]
    },
    'Structural negotiation':{
      caseNo:'CASE FILE 04', subtitle:'Structural Negotiation — Load Limit Dispute',
      panels:[
        ['🌉','BRIDGE BEGINS COLLAPSING','Engineers announce catastrophic structural failure. Traffic panics. Gravity gets ambitious.','We have approximately twelve seconds.'],
        ['⚡','ANGELA OBJECTS','The Charge reaches the bridge before the collapse finishes becoming a problem.','Hold on a damn minute.'],
        ['✋','STRUCTURE COMPLIES','The bridge stops moving in midair. Gravity files an objection and is ignored.','Did... did the bridge just listen to her?'],
        ['📐','ENGINEERING REVISION','Repairs are completed. A new provisional load category enters the manual.','Design load: vehicles, wind, seismic, Angela said wait.']
      ]
    },
    'Nonsense detection':{
      caseNo:'CASE FILE 05', subtitle:'Nonsense Detection — Pre-Impact Recognition',
      panels:[
        ['💬','A SENTENCE BEGINS','A person approaches Angela with the phrase most associated with preventable trouble.','Hey, quick question...'],
        ['⚠️','ALARM BEFORE CONTENT','Her internal detector triggers before the actual nonsense has technically been spoken.','No. Start over and make better choices.'],
        ['🧪','SCIENTIFIC TESTING','Researchers attempt to hide nonsense inside increasingly reasonable language. Detection remains perfect.','You put bullshit in the third paragraph.'],
        ['🏆','RESULTS PUBLISHED','Median recognition time: 0.3 seconds. The control group requests reassignment.','Peer review declined out of fear.']
      ]
    },
    'Power ceiling':{
      caseNo:'CASE FILE 06', subtitle:'Power Ceiling — Measurement Failure',
      panels:[
        ['📊','TESTING BEGINS','Researchers build a machine designed to measure the maximum possible human power output.','This should be more than enough.'],
        ['∞','INSTRUMENT LOSES COMPOSURE','Angela steps onto the platform. The display passes 100%, 1,000%, and then simply shows infinity.','Is it supposed to smell like that?'],
        ['💥','WARRANTY VOID','The machine shuts itself down and prints a single diagnostic message: OBNOXIOUSLY OVERPOWERED.','Well. That seems conclusive.'],
        ['✝️','THEOLOGY INTERVENES','A final ranking is issued with one non-negotiable boundary.','Jesus first. Huge gap. Angela gets the human bracket. Everybody relax.']
      ]
    }
  };

  const comicModal=document.createElement('div');
  comicModal.className='modal comic-modal';
  comicModal.id='comicModal';
  comicModal.setAttribute('aria-hidden','true');
  comicModal.innerHTML='<div class="modal-card comic-card"><button class="close comic-close" type="button" aria-label="Close comic">×</button><p class="section-tag" id="comicCase"></p><h2 id="comicTitle"></h2><div class="comic-strip" id="comicStrip"></div></div>';
  document.body.appendChild(comicModal);
  const comicCase=document.getElementById('comicCase'),comicTitle=document.getElementById('comicTitle'),comicStrip=document.getElementById('comicStrip');
  comicModal.querySelector('.comic-close').addEventListener('click',()=>close(comicModal));
  comicModal.addEventListener('click',e=>{if(e.target===comicModal)close(comicModal)});

  function chargeFigure(){return '<span class="mini-charge" aria-hidden="true"><span class="mini-hair"></span><span class="mini-face"></span><span class="mini-body">⚡</span></span>'}
  function showComic(title){
    const data=comics[title]; if(!data)return;
    comicCase.textContent=data.caseNo;
    comicTitle.textContent=data.subtitle;
    comicStrip.innerHTML=data.panels.map((p,i)=>`<article class="comic-panel"><div class="panel-no">${i+1}</div><div class="comic-art"><span class="scene-icon" aria-hidden="true">${p[0]}</span>${chargeFigure()}</div><h3>${p[1]}</h3><p>${p[2]}</p><blockquote>${p[3]}</blockquote></article>`).join('');
    open(comicModal);
  }

  document.querySelectorAll('.cap-grid article').forEach(card=>{
    const title=card.querySelector('h3')?.textContent.trim();
    if(!comics[title])return;
    card.classList.add('cap-clickable');
    card.tabIndex=0;
    card.setAttribute('role','button');
    card.setAttribute('aria-label',`Open comic case file for ${title}`);
    const hint=document.createElement('span');
    hint.className='comic-hint';
    hint.textContent='OPEN COMIC CASE FILE →';
    card.appendChild(hint);
    card.addEventListener('click',()=>showComic(title));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showComic(title)}});
  });
})();