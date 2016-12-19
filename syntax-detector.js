var SyntaxDetector = function() {
  this.data = {};
};


/*Excises variable names, since they do not contribute to the statistical significance of the 
sample a majority of the time and can potentially confuse the detector*/

SyntaxDetector.prototype.exciseVariableNames = function(str) {
  let match;
  while (match = /(\b\w+)(=(?!=)|( =(?!=)))/g.exec(str)) {
    let variable = new RegExp("\[\^A-Za-z\]" + match[1] + "\[\^A-Za-z\]", "g");
    str = str.replace(match[0],'').replace(variable,'')
  }
  return str;
};

//Refines the input further (we are aiming to have mostly language keywords, 
//which are most statistically significant)

SyntaxDetector.prototype.words = function(str) {
  return this.exciseVariableNames(str)
             .replace(/\"[^(\")]+\"|\'[^(\')]+\'/g,'')  // filters strings,
             .split(/[^a-zA-Z]+/)
             .filter(s=>!{}[s] && s.length); // filters words that refer to properties on the 
                                             //Javascript object prototype e.g. 'hasOwnProperty'. 
                                             //This is necessary to avoid potential bugs.
};

/*This trains your SyntaxDetector instance to draw stronger and stronger correlations 
between the input code samples and languages that you identify for each of them. 
Every instance MUST be trained before it can achieve any degree of accuracy.*/

SyntaxDetector.prototype.train = function(code,lang) {
  const words = this.words(code);
  this.data[lang] = this.data[lang] || {};
  words.forEach(w=>this.data[lang][w] = this.data[lang][w] + 1 || 1);
};

/*After the SyntaxDetector has been trained, you can now feed it code samples without indicating 
what language it is and it will automatically identify the language, provided it has been familiarized 
with the language through training.*/

SyntaxDetector.prototype.detect = function(code) {
  const words = this.words(code);
  let correlation = lang => words.map(w=>Math.log(this.data[lang][w] || 1)).reduce((a,b)=>a+b);
  return Object.keys(this.data).sort((a,b)=>correlation(b)-correlation(a))[0];
};