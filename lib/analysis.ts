import {questionnaires,applicable,answered,special,specialLabels,profiles,type Question,type Profile} from './questionnaire';
import type {SurveyResponse} from './types';
export type Distribution={question:Question;counts:{label:string;count:number;percent:number}[];base:number;total:number;blank:number;illegible:number;notasked:number;unsaved:number;mean:number|null};
export function distribution(question:Question,records:SurveyResponse[]):Distribution {
 let blank=0,illegible=0,notasked=0,unsaved=0;const values:(string|number)[]=[];let base=0;
 for(const r of records){const v=r.answers[question.id];if(applicable(question,r.answers)===false&&!answered(v)){notasked++;continue;}if(v==='__blank'){blank++;continue;}if(v==='__illegible'){illegible++;continue;}if(v==='__notasked'){notasked++;continue;}if(!answered(v)){unsaved++;continue;}base++;if(Array.isArray(v))values.push(...v);else values.push(v as string|number);}
 const labels=question.options||[...new Set(values.map(String))].sort((a,b)=>Number(a)-Number(b));
 const counts=labels.map(label=>{const count=values.filter(v=>String(v)===label).length;return {label,count,percent:base?count/base*100:0};});
 const numeric=question.type==='number'||(question.options?.join(',')==='1,2,3,4,5');
 return {question,counts,base,total:records.length,blank,illegible,notasked,unsaved,mean:numeric&&values.length?values.reduce<number>((s,v)=>s+Number(v),0)/values.length:null};
}
export const colors=['#267c69','#6e9e8c','#dc9b48','#bb6861','#84919a','#b0a080','#6a78ae','#a57798'];
const escape=(s:unknown)=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[x]!));
const lineWrap=(text:string,max:number)=>{const words=text.split(/\s+/);const lines:string[]=[];let line='';for(const word of words){if((line+' '+word).trim().length>max&&line){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);return lines;};
export function chartSVG(data:Distribution[],title:string,percent=true):string {
 if (data.length === 1) {
   const {question, counts, base} = data[0];
   const width = 1440;
   const ceiling = percent ? 100 : Math.max(5, Math.ceil(Math.max(0, ...counts.map(c => c.count)) / 5) * 5);
   const titleLines = lineWrap(title, 88);
   const questionLines = lineWrap(question.id + ' · ' + question.label, 115);
   const titleY = 46;
   const questionY = titleY + titleLines.length * 30 + 12;
   const baseY = questionY + questionLines.length * 23 + 14;
   const rowsY = baseY + 30;
   const rows = counts.map(c => ({...c, lines: lineWrap(c.label, 45)}));
   const rowHeight = (lines: string[]) => Math.max(42, lines.length * 20 + 14);
   const height = rowsY + rows.reduce((sum, row) => sum + rowHeight(row.lines), 0) + 72;
   let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}"><rect width="100%" height="100%" fill="white"/><style>text{font-family:Arial,sans-serif;fill:#263831}</style>`;
   titleLines.forEach((line, i) => { svg += `<text x="40" y="${titleY + i * 30}" font-size="25" font-weight="bold">${escape(line)}</text>`; });
   questionLines.forEach((line, i) => { svg += `<text x="40" y="${questionY + i * 23}" font-size="17">${escape(line)}</text>`; });
   svg += `<text x="40" y="${baseY}" font-size="16">Base : ${base} réponses exploitables · ${percent ? 'Pourcentages' : 'Effectifs'}</text>`;
   let y = rowsY;
   rows.forEach(({lines, count, percent: share}, i) => {
     const value = percent ? share : count;
     const barWidth = value / ceiling * 820;
     lines.forEach((line, j) => { svg += `<text x="440" y="${y + 17 + j * 20}" font-size="16" text-anchor="end">${escape(line)}</text>`; });
     svg += `<rect x="460" y="${y}" width="820" height="24" fill="#edf2ed"/><rect x="460" y="${y}" width="${barWidth}" height="24" fill="${colors[i % colors.length]}"/><text x="${475 + barWidth}" y="${y + 17}" font-size="15">${value.toLocaleString('fr-FR', {maximumFractionDigits:1})}${percent ? ' %' : ''}</text>`;
     y += rowHeight(lines);
   });
   const multiple = question.type === 'multi' ? ' Choix multiples : le total peut dépasser 100 %.' : '';
   return svg + `<text x="40" y="${height - 35}" font-size="14">Fiches finalisées. Sans avis inclus ; absences, illisibles et non-applicables exclus.${multiple}</text></svg>`;
 }
 const grouped=data.length>1;const width=1440;const left=85,right=45;const labels=grouped?data.map(d=>d.question.id+' · '+d.question.label):data[0]?.counts.map(c=>c.label)||[];
 const groups=labels.length;const series=grouped?data[0]?.counts.map(c=>c.label)||[]:[percent?'Réponses (%)':'Réponses (effectifs)'];
 const labelLines=labels.map(t=>lineWrap(t,Math.max(11,Math.floor(160/Math.max(groups,1)))));const maxLines=Math.max(1,...labelLines.map(x=>x.length));
 const plotH=370;const top=135;const labelY=top+plotH+30;const legendY=labelY+maxLines*19+40;const legendHeight=Math.ceil(series.length/3)*32;const height=legendY+legendHeight+75;
 const vals=grouped?data.flatMap(d=>d.counts.map(c=>percent?c.percent:c.count)):data[0]?.counts.map(c=>percent?c.percent:c.count)||[];
 const ceiling=percent?100:Math.max(5,Math.ceil(Math.max(0,...vals)/5)*5);const slot=(width-left-right)/Math.max(groups,1);const bw=Math.min(64,(slot-24)/Math.max(series.length,1));
 let xml=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}"><rect width="100%" height="100%" fill="white"/><style>text{font-family:Arial,sans-serif;fill:#263831}.muted{fill:#617168}</style><text x="50" y="49" font-size="25" font-weight="bold">${escape(title)}</text><text x="50" y="83" font-size="16" class="muted">${percent?'Répartition en % des réponses exploitables':'Nombre de réponses'} · Questionnaires finalisés uniquement</text>`;
 for(let i=0;i<=5;i++){const y=top+plotH-i*plotH/5;xml+=`<line x1="${left}" y1="${y}" x2="${width-right}" y2="${y}" stroke="#e2e8e3"/><text x="${left-14}" y="${y+5}" text-anchor="end" font-size="15">${Math.round(ceiling*i/5)}${percent?' %':''}</text>`;}
 labels.forEach((label,g)=>{const counts=grouped?data[g].counts:[data[0].counts[g]];const start=left+slot*g+(slot-bw*counts.length)/2;counts.forEach((c,s)=>{const v=percent?c.percent:c.count;const h=v/ceiling*plotH;const x=start+s*bw;xml+=`<rect x="${x}" y="${top+plotH-h}" width="${Math.max(2,bw-4)}" height="${h}" fill="${colors[(grouped?s:g)%colors.length]}"/><text x="${x+(bw-4)/2}" y="${top+plotH-h-9}" text-anchor="middle" font-size="13">${percent?v.toLocaleString('fr-FR',{maximumFractionDigits:1})+' %':v}</text>`;});labelLines[g].forEach((line,i)=>{xml+=`<text x="${left+slot*(g+.5)}" y="${labelY+i*19}" text-anchor="middle" font-size="14">${escape(line)}</text>`;});if(grouped)xml+=`<text x="${left+slot*(g+.5)}" y="${labelY+labelLines[g].length*19+5}" text-anchor="middle" font-size="13" class="muted">n = ${data[g].base}</text>`;});
 if(grouped)series.forEach((s,i)=>{const x=65+(i%3)*460,y=legendY+Math.floor(i/3)*32;xml+=`<rect x="${x}" y="${y-12}" width="14" height="14" fill="${colors[i%colors.length]}"/><text x="${x+24}" y="${y}" font-size="15">${escape(s)}</text>`;});
 xml+=`<text x="50" y="${height-38}" font-size="14" class="muted">${grouped?'Bases propres à chaque question.':'Base : '+(data[0]?.base||0)+' réponses exploitables.'} Sans avis inclus ; absences, illisibles et non-applicables exclus. ${data.some(d=>d.question.type==='multi')?'Choix multiples : le total peut dépasser 100 %.':''}</text></svg>`;return xml;
}
