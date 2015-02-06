//Dan Kerrigan
//First created in 2013
window.onload = function(){
  var running = false; // is the timer running?
  var interval;// timing interval
  var decimal = 0;
  var sec = 0;//seconds
  var min = 0;//minutes
  var cs = 0;//centiseconds
  var decimalOut = document.getElementById("decimal");// decimal output
  var secOut = document.getElementById("sec");// second output
  var minOut = document.getElementById("min");// minute output
  var colon = document.getElementById("colon");// :
  var timesOut = document.getElementById("timeOut");// time output
  var timesList = document.getElementById("timeList");// list of times
  var clearAll = document.getElementById("clear"); // clear timer
  var timesDisplay = new Array();// array of the times formatted as minutes, seconds, centiseconds
  var csTimes = new Array();// array of the times in centiseconds
  var avAll = 0;// average solve time
  var avAllOut = document.getElementById("overallAv");// average solve time output
  var best = Number.MAX_VALUE; // best solve time, starts at max integer value
  var bestOut = document.getElementById("fastest");// best solve time output
  var numSolves = 0; // number of solves completed
  var total = 0;
  var numSolvesOut = document.getElementById("solveNum");//number of solves output
  generateScramble();// generates a 25 move scramble
  function timer(){
    decimal++;
    cs++; //counts time in centiseconds
    decimalOut.innerHTML = decimal;// updates the numbers after the decimal point to = decimal
    if(decimal>=100){// if decimal >= 100, that means 1 second has passed.
      decimal = 0;
      sec++;
      if(sec>59){// if sec > 59, then 1 minute has passed
        sec = 0;
        min++;
        colon.innerHTML = ":";
        minOut.innerHTML = min;
      }
      if(sec<=9 && min>0){
        sec = "0"+sec;
      }
      secOut.innerHTML = sec;
    }

    if(decimal<=9){
      decimal = '0'+decimal;
      decimalOut.innerHTML = decimal;
    }

  }
  // onkeyup, either start or stop the timer.
  window.onkeyup = run;
  function run(){
    // if the timer is not running, then start it
    if(!running){
      decimal = 0, sec = 0, min = 0, cs = 0;
      secOut.innerHTML = "0";
      minOut.innerHTML = "";
      colon.innerHTML = "";
      running = true;
      scramble = "";
      generateScramble();
      interval = setInterval(timer,10);// call the function timer every 10 miliseconds
    }
    // if the timer is running, then stop the timer, record the time, and calculate the new stats.
    else if(running){
      running = false;
      clearInterval(interval);
      timesDisplay.push(" "+timesOut.innerHTML);
      csTimes.push(cs);
      timesList.innerHTML = timesDisplay;
      calculateStats();
    }
  }
  // generates a random 25 move scramble
  function generateScramble(){
    var move;//includes face to turn and how to turn it. Ex. 2F
    var face;//Face to turn. Either R, L, F, B, U, or D
    var faceNum;//1-6, corresponds to face R-D
    var lastFaceNum = 10;//The face of the previous turn
    var turn;//How to turn a face. Either ', 2, or nothing.
    var scramble = "";//inlucdes 25 moves
    var output = document.getElementById("scram");
    for(var x = 0; x<25; x++)
    {
      do{
        faceNum = Math.floor(Math.random()*6)+1;
      }while(faceNum === lastFaceNum);//the same face can't appear in consecutive moves.
      lastFaceNum = faceNum;
      if(faceNum === 1) {face = "R";}
      if(faceNum === 2) {face = "L";}
      if(faceNum === 3) {face = "U";}
      if(faceNum === 4) {face = "D";}
      if(faceNum === 5) {face = "F";}
      if(faceNum === 6) {face = "B";}
      turn = Math.floor(Math.random()*3)+1;
      if(turn === 1){move = face;}
      if(turn === 2){move = face+"2";}
      if(turn === 3){move = face+"'";}

      scramble += move+" ";
    }
    output.innerHTML = scramble;
  }
  clearAll.onclicked = clearTimes;
  clearAll.addEventListener('click', function() {
          clearTimes();
  });
  // resets the timer and statistics
  function clearTimes(){
    numSolves = 0;
    numSolvesOut.innerHTML = "Solves: "+numSolves;
    best = Number.MAX_VALUE;
    console.log(best);
    bestOut.innerHTML = "Best: ";
    avAll = 0;
    total = 0;
    secOut.innerHTML = "0";
    decimalOut.innerHTML = "00";
    avAllOut.innerHTML = "Average: ";
    timesDisplay = [];
    csTimes = [];
    timesList.innerHTML = timesDisplay;
  }
  function calculateStats(){
    numSolves++;
    total = 0;
    numSolvesOut.innerHTML = "Solves: "+numSolves;
    for(var x = 0; x<csTimes.length; x++){
      if(csTimes[x]<best){
        best = csTimes[x];
      }
      total += csTimes[x];
    }
    avAll = total/numSolves;
    avAllOut.innerHTML = "Average: "+formatTime(avAll);
    bestOut.innerHTML = "Best: "+formatTime(best);
  }
  // formats the time from centiseconds to minutes, seconds, centiseconds
  function formatTime(t){
    //m = minute, s = second, c = centisecond
    var m = 0, s = 0, c = 0, out = "";
    m = Math.floor(t/6000);
    t = t%6000;
    s = Math.floor(t/100);
    t = t%100;
    c = Math.floor(t);
    if(m<1){
      m="";
    }
    else{
      m = m+":";
      if(s<10){
        s = "0"+s;
      }
    }
    if(c<10){
      c = "0"+c;
    }

    out = ""+m+s+"."+c;
    return out;
  }
}
