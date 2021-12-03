function reverseStr(str) {
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    var rev = reverseStr(str);
    return rev === str;
}

function convertDateToStr(date){
    var dateStr = {
        day:'',
        month:'',
        year:''
    }
   if(date.day < 10){
       dateStr.day = '0' + date.day ;
   }else {
       dateStr.day = date.day.toString();
   } if(date.month < 10){
       dateStr.month = '0' + date.month;
   }else {
       dateStr.month = date.month.toString();
   }
  dateStr.year =  date.year.toString();
  return dateStr;
}

function getAllDateFormat(date){
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year ;
    var mmddyyyy =  dateStr.month + dateStr.day + dateStr.year  ;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day ;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2) ;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2) ;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day ;
   
    return [ ddmmyyyy , mmddyyyy, yyyymmdd , ddmmyy , mmddyy , yymmdd ];
}
var date = {
    day: 5,
    month : 9,
    year : 2020
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormat(date);

    var flag = false;

    for( var i=0; i<listOfPalindromes.length ; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    } 
    return flag;
}

function isLeapYear(year) {
    if( year%400 === 0){
        return true;
    }
    if (year%100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    day = date.day +1;
    month = date.month;
    year = date.year;

    var listOfALLDays = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31 ];

    if(month ===2){
        if(isLeapYear(year)){
            if( day > 29){
                day = 1;
                month++;
            }

        } else {
            if(day > 28){
                day = 1;
                month++;
            }
        }

    } else {
        if( day > listOfALLDays[month-1] ){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function getNextPalindromeDate(date){
        var ctr = 0;
        var nextDate = getNextDate(date);

        while(1){
            ctr++;
            var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
            if(isPalindrome){
                break;
            }
            nextDate = getNextDate(nextDate);
        }
        return [ctr, nextDate];
}

var inputDate = document.querySelector("#input-date");
var clickbutton = document.querySelector("#btn-click");
var displayMsg = document.querySelector("#msg-show");

clickbutton.addEventListener("click", clickHandler);

function clickHandler(e){
    var bdayStr = inputDate.value ;

    if( bdayStr !== ''){
        var listOfDate = bdayStr.split('-');

        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };
        
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            displayMsg.innerText = "Hey, Your birthday is a palindrome";
        } else {
            var nextBdayPalindrome =  getNextPalindromeDate(date);
            var date = nextBdayPalindrome[1];
            var daysRemaining = nextBdayPalindrome[0];
            displayMsg.innerText = `Next palindrome date is ${date.day}-${date.month}-${date.year} and you missed it by ${daysRemaining} days`;

        }

        
    }
}