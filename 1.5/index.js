module.exports = {

    subrs: [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler){
        if(this.subrs.indexOf(subscriber) == -1){
            this.subrs.push(subscriber);
        }

        if(!subscriber.hasOwnProperty(event)){
            subscriber[event] = [];
        }
        subscriber[event].push(handler);

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if(this.subrs.indexOf(subscriber) != -1 && subscriber.hasOwnProperty(event)) {
            delete subscriber[event];
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        this.subrs.forEach(function(sub_obj){
            if(sub_obj.hasOwnProperty(event)){
                sub_obj[event].forEach(function(handler){ 
                    handler.apply(sub_obj);
                });
            }
        });
        return this;
    }
};