const getValidator = function(msg, validator){
    return function(rule, value, callback){
        if(validator(value)){
            callback(new Error(msg))
        }else{
            callback();
        }
    }
}



