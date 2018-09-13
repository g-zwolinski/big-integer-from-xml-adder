const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var bigInt = require("big-integer");
var fs = require('fs');

var logger = fs.createWriteStream('tests_results2.xml', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});
logger.write('<xml>');

var results = [];

function returnActionElement(val){
	return '<action><result>'+ val + '</result></action>';
}

function makeCalc(arr){
	for (var i = 0; i < arr.length; i++){
		results[i] = bigInt(arr[i].children[0].textContent).plus(bigInt(arr[i].children[1].textContent));
	}
	saveRes();
}

function saveRes(){
	for (var i = 0; i < results.length; i++){
		logger.write(returnActionElement(results[i].toString()));	
	}
	logger.write('</xml>');
}

JSDOM.fromFile("tests.xml", {}).then(dom => {
	makeCalc(dom.window.document.getElementsByTagName("action"));
});
