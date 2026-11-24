/* Attach original scanned TEST FOR UNIT pages (not OCR) to the verified
   interactive exercises. The source PDF scripts are loaded only when opened. */
(function(){
'use strict';
const bank=window.LDDGrade7BookTests;
if(!bank)return;
for(const test of bank.tests){
 if(test.unit<3||test.unit>12)continue;
 test.sourceFormat='scanned-original-plus-transcription';
 test.pdfAsset='assets/mlh7/u'+String(test.unit).padStart(2,'0')+'-test-pdf.js';
}
})();