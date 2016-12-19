I enjoy the site hastebin because it automatically detects the language of the code snippet you paste in.
However, it can be grossly inaccurate oftentimes, nullifying any benefit and even making it worse since now
your syntax is highlighted all wrong in another language. I wrote a kernel which strives to make this process
more accurate. I plan to incorporate this on a hastebin clone site.

### How it works:


##### 1) Instantiate a new instance:

```javascript
const detector = new SyntaxDetector();
```

#### 2) Train the instance by giving it codebases written in various programming languages, making sure to identify the language.

```javascript
var jsCodeSnippet = "function javascriptFunction(input1, input2) {return input1 + input2};"
var rubyCodeSnippet = "def ruby_method(input1, input2)\n input1+input2\n end"
detector.train(jsCodeSnippet, "Javascript");
detector.train(rubyCodeSnippet, "Ruby");
```

#### 3) Once it is sufficiently trained, it will identify the language without your explicitly specifiying it.

```
detector.detect(jsCodeSnippet) //returns "Javascript"
```
