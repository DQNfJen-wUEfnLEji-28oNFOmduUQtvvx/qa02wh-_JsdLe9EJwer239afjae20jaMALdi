
var conf = {
    debug_mode: false
};

function load_async(path,callback){
    var head = document.getElementsByTagName("head")[0];
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.onload = callback;
    s.src = path;
    head.appendChild(s);
}

function load(path){
    load_async(path,function(){});
}

function main_eval(){
    var input = document.getElementById("input1");
    var output = document.getElementById("output1");
    try{
        var t = parser.ast(input.value);
        if(t!==null){
            t = cas.execute(t);
            t = cas.simplify_sf(2,t);
            var out = cas.output_form(t);
            output.innerHTML = "";
            if(conf.debug_mode){
                output.innerHTML += "<p><span class='mono'>"+JSON.stringify(out)+"</span>";
            }
            output.innerHTML += "<p>= "+htm_print.htm(out);
            // output.innerHTML += "<ul class='ast'><li>"+compiler.ast_tos(out)+"</ul>";
        }else{
            output.innerHTML="";
        }
    }catch(e){
        if(typeof e=="string"){
            output.innerHTML = "<p>"+e;
        }
        throw e;
    }
}

function diff(){
    var input = document.getElementById("input1");
    var output = document.getElementById("output1");
    try{
        var t = parser.ast(input.value);
        if(t!==null){
            t = cas.execute(["diff",t,"x"]);
            t = cas.simplify_sf(2,t);
            var out = cas.output_form(t);
            output.innerHTML = "<p>= "+htm_print.htm(out);
        }else{
            output.innerHTML = "";
        }
    }catch(e){
        if(typeof e=="string"){
            output.innerHTML = "<p>"+e;
        }
        throw e;
    }
}
function store() {
let result=document.getElementById("output1");
let value1=document.getElementById('value1');
let value2=document.getElementById('value2');
let value3=document.getElementById('value3');
let value4=document.getElementById('value4');
let value5=document.getElementById('value5');
let storage1=document.getElementById('storage1');
let storage2=document.getElementById('storage2');
let storage3=document.getElementById('storage3');
let storage4=document.getElementById('storage4');
let storage5=document.getElementById('storage5');
if(value1.innerHTML!=result.innerHTML.replace("=", "")){value5.innerHTML=value4.innerHTML;value4.innerHTML=value3.innerHTML;value3.innerHTML=value2.innerHTML;value2.innerHTML=value1.innerHTML}
value1.innerHTML=result.innerHTML.replace("=", "");
if(value1.innerHTML.length>1){storage1.style.opacity="1";value1.style.display="block"}
if(value2.innerHTML.length>1){storage2.style.opacity="1";value2.style.display="block"}
if(value3.innerHTML.length>1){storage3.style.opacity="1";value3.style.display="block"}
if(value4.innerHTML.length>1){storage4.style.opacity="1";value4.style.display="block"}
if(value5.innerHTML.length>1){storage5.style.opacity="1";value5.style.display="block"}
}
function expand(){
    var input = document.getElementById("input1");
    var output = document.getElementById("output1");
    try{
        var t = parser.ast(input.value);
        if(t!==null){
            t = cas.execute(["expand",t]);
            t = cas.simplify_sf(2,t);
            var out = cas.output_form(t);
            output.innerHTML = "<p>= "+htm_print.htm(out);
        }else{
            output.innerHTML = "";
        }
    }catch(e){
        if(typeof e=="string"){
            output.innerHTML = "<p>"+e;
        }
        throw e;
    }
}

var main = main_eval;

function handle_keys(event){
    if(event.keyCode==13){
        main();
    }
}

window.onload = function(){
    load("js/cas/syntax.js");
    load("js/cas/kernel.js");
    load("js/cas/print.js");
};
