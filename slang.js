"use strict";function _classCallCheck(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}var _slicedToArray=function(){function r(r,e){var t=[],n=!0,i=!1,o=void 0;try{for(var u,a=r[Symbol.iterator]();!(n=(u=a.next()).done)&&(t.push(u.value),!e||t.length!==e);n=!0);}catch(s){i=!0,o=s}finally{try{!n&&a["return"]&&a["return"]()}finally{if(i)throw o}}return t}return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return r(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function r(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),ERROR={INVALID_LABEL:{code:1,msg:"THE LABEL PROVIDED FOR AN INSTRUCTION IS MALFORMED"},INVALID_VAR:{code:2,msg:"THE VARIABLE PROVIDED FOR AN INSTRUCTION IS MALFORMED"},INVALID_NUM:{code:3,msg:"THE NUMBER PROVIDED IS NOT ACTUALLY A NUMBER"},INVALID_STR:{code:4,msg:"THE STRING PROVIDED IS NOT ACTUALLY A STRING"},INVALID_OPER:{code:5,msg:"THERE IS NO COMMAND IN THE STRING"},INVALID_INSTRUCTION:{code:6,msg:"PARAMETERS PASSED ARE NOT AN INSTRUCTION"},INVALID_CODE:{code:7,msg:"THE CODE PROVIDED IS NOT A WELL FORMED CODE"}},Instruction=function(){function r(e,t,n){_classCallCheck(this,r),e=Number(e),t=Number(t),n=Number(n);var i=Number.isNaN(e)||Number.isNaN(t)||Number.isNaN(n);if(i||e<0||t<0||n<0)throw new Error(ERROR.INVALID_INSTRUCTION.msg);this.a=e,this.b=t,this.c=n}return _createClass(r,[{key:"getString",value:function(){var r="Y",e="",t=["X","Z"],n=[";","++;","--;","?"],i=["A","B","C","D","E"],o=function(r,e){return""+e[(r-1)%e.length]+Math.ceil(r/e.length)},u=this.c?o(this.c,t):r,a=this.a?"["+o(this.a,i)+"]":e,s=n.length-1,c=this.b<s?n[this.b]:n[s]+o(this.b-s+1,i)+";";return(a+" "+u+c).trim()}},{key:"toString",value:function(){return"<"+this.a+", <"+this.b+", "+this.c+">>"}},{key:"equals",value:function(e){if(e&&e instanceof r)return this.a===e.a&&this.b===e.b&&this.c===e.c}},{key:"getCode",value:function(){return Pairing.direct(this.a,Pairing.direct(this.b,this.c))}}],[{key:"fromCode",value:function(e){if(e=Number(e),0!==e&&!e)throw new Error(ERROR.INVALID_NUM.msg);var t=Pairing.inverse(e),n=Pairing.inverse(t.snd),i=t.fst,o=n.fst,u=n.snd;return new r(i,o,u)}},{key:"fromString",value:function(e){if(e){if("string"!=typeof e)throw new Error(ERROR.INVALID_STR.msg);var t=e.toLowerCase().split(" "),n=_slicedToArray(t,2),i=n[0],o=n[1];if(o=o?o:i,!o)throw new Error(ERROR.INVALID_OPER.msg);o===i&&(i=null);var u={};return u.a=InstructionParser.getLabelValue(i),u.b=InstructionParser.getOperationValue(o),u.c=InstructionParser.getVariableValue(o),new r(u.a,u.b,u.c)}}}]),r}(),InstructionParser=function(){function r(){_classCallCheck(this,r)}return _createClass(r,null,[{key:"getLabelValue",value:function(r){if(!r)return 0;var e=r.match(/[a-e]/)[0],t=Number(r.match(/[0-9]+/)[0])-1,n=e.charCodeAt(0)-"a".charCodeAt(0)+1;if(n<=0||Number.isNaN(t))throw new Error(ERROR.INVALID_LABEL.msg);return n+5*t}},{key:"getOperationValue",value:function(r){if(!r)throw new Error(ERROR.INVALID_OPER.msg);return r.includes("++")?1:r.includes("--")?2:r.includes("?")?2+this.getLabelValue(r.split("?")[1]):0}},{key:"getVariableValue",value:function(r){var e=r.match(/[1-9]+/);if(r.includes("y"))return 0;if(e=e?Number(e[0]):null,r.includes("z")&&e)return 2*e;if(r.includes("x")&&e)return 2*e-1;throw new Error(ERROR.INVALID_VAR)}}]),r}(),Pairing=function(){function r(){_classCallCheck(this,r)}return _createClass(r,null,[{key:"_findFactor",value:function(r,e){for(var t=0;r%e===0&&0!=r;)t++,r/=e;return t}},{key:"direct",value:function(r,e){if(!Number.isInteger(r)||!Number.isInteger(e)||r<0||e<0)throw new Error(ERROR.INVALID_NUM.msg);return Math.pow(2,r)*(2*e+1)-1}},{key:"inverse",value:function(r){if(!Number.isInteger(r)||r<0)throw new Error(ERROR.INVALID_NUM.msg);var e={fst:0,snd:0};return e.fst=this._findFactor(r+1,2),e.snd=((r+1)/Math.pow(2,e.fst)-1)/2,e}}]),r}(),Program=function(){function r(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];_classCallCheck(this,r),this.instructions=e}return _createClass(r,[{key:"getString",value:function(){return this.instructions.map(function(r){return r.getString()}).join("\n")}},{key:"getCode",value:function(){var e=arguments.length<=0||void 0===arguments[0]?r.codeModes.PRIMES:arguments[0],t="";switch(e){case r.codeModes.PRIMES:this.instructions.forEach(function(e,n){return t+=r.primes[n]+"^"+e.getCode()+" "});break;case r.codeModes.GODEL:t="[ ",this.instructions.forEach(function(r){return t+=r.getCode()+" "}),t+="] ";break;case r.codeModes.NUMBER:return t=0,this.instructions.forEach(function(e,n){return t+=Math.pow(r.primes[n],e.getCode())}),t-1;default:throw new Error(ERROR.INVALID_NUM.msg)}return t+="- 1"}},{key:"equals",value:function(e){if(e&&e instanceof r)return e.getCode()===this.getCode()}},{key:"toString",value:function(){return""+this.getCode(r.codeModes.NUMBER)}}],[{key:"fromCode",value:function(e){if(!e||"string"!=typeof e)throw new Error(ERROR.INVALID_STR.msg);e=e.toLowerCase().trim();var t={PRIMES:/^(\d+\^\d+ )+- ?1$/,GODEL:/^\[ (\d+ )+\] ?- ?1/};if(e.match(t.PRIMES))e=e.split(" ").map(function(r){return r.split("^")[1]}).filter(function(r){return r});else{if(!e.match(t.GODEL))throw new Error(ERROR.INVALID_CODE.msg);e=e.replace("[","").replace("]","").split(" ").filter(function(r){return r}),e.pop(),e.pop()}return new r(e.map(function(r){return Instruction.fromCode(r)}))}},{key:"fromString",value:function(e){var t=e.toLowerCase().split(";").map(function(r){return r.trim()}),n=t.map(function(r){return Instruction.fromString(r)}).filter(function(r){return r});return new r(n)}},{key:"codeModes",get:function(){return{GODEL:1,PRIMES:2,NUMBER:3}}},{key:"primes",get:function(){return[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907]}}]),r}();module.exports={Program:Program,Instruction:Instruction,Pairing:Pairing,ERROR:ERROR};