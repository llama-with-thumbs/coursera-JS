function planJourney(documents){
    
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if (Math.random() > 0.3) {
                resolve(documents);
                console.log('processing...');
             }
             else reject('Error at the first state');
        }, 2000);
    });
}
function getVisa(visa){
    console.info('visa is obtaining..');
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            Math.random() > 0.3 ? resolve(visa) : reject('visa has been rejected');
        }, 1000)
    })
}
function bookHottel(booking){
    console.info('Hottel is booking..');
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            Math.random() > 0.3 ? resolve(booking) : reject('visa has been denied');
        }, 1000)
    })
}
function buyTickets(booking){
    console.info('booking:', booking);
    console.info('The thickets has been bought');
}

planJourney({})
    .then(getVisa)
    .then(bookHottel)
    .then(buyTickets)
    .catch(function(reason){console.error(reason);})