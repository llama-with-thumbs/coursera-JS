/**
 * @param {String} date
 * @returns {Object}
 */
function addZero(param){
    return param.toString().length < 2 ? '0' + param : param;
}

module.exports = function (date) {
    var localTime = new Date();
    var year = date.replace(/[:-]/g, ' ').split(' ')[0];
    var month = date.replace(/[:-]/g, ' ').split(' ')[1] - 1; // month starts with "0"
    var day = date.replace(/[:-]/g, ' ').split(' ')[2];
    var hour = date.replace(/[:-]/g, ' ').split(' ')[3];
    var minute = date.replace(/[:-]/g, ' ').split(' ')[4];
    
    var time = {
        currentDateValue: new Date(year, month, day, hour, minute),
        possibleMeasures: [
            'years',
            'months',
            'days',
            'hours',
            'minutes'
        ],
        add: function(shift, measure){
            this.checks(shift, measure);
            this.shifter(shift, measure);
            return this;
        },
        subtract: function(shift, measure){
            this.checks(shift, measure);
            this.shifter(-shift, measure); // '-' negative
            return this;
        },
        shifter: function(shift, measure){
            if(measure == 'years'){
                this.currentDateValue.setFullYear(this.currentDateValue.getFullYear() + shift);
            } else if(measure == 'months'){
                this.currentDateValue.setMonth(this.currentDateValue.getMonth() + shift);
            } else if(measure == 'days'){
                this.currentDateValue.setDate(this.currentDateValue.getDate() + shift);
            } else if(measure == 'hours'){
                this.currentDateValue.setHours(this.currentDateValue.getHours() + shift);
            } else if(measure == 'minutes'){
                this.currentDateValue.setMinutes(this.currentDateValue.getMinutes() + shift);
            }
        },
        checks: function(shift, measure){
            if(shift < 0 || this.possibleMeasures.indexOf(measure) == -1){
                throw new TypeError('measure is not in the list, or negative shifting value');
            }
            return this;
        }
    }
    Object.defineProperty(time, 'value', {
        get: function(){
            var formatedDate = this.currentDateValue.getFullYear() 
                                + '-' + addZero(this.currentDateValue.getMonth() + 1) // month starts with "0"
                                + '-' + addZero(this.currentDateValue.getDate())
                                + ' ' + addZero(this.currentDateValue.getHours())
                                + ':' + addZero(this.currentDateValue.getMinutes());
            return formatedDate;
        },
        set: function(new_value){
            this.currentDateValue = new_value;
        }
    })
    return time;
};
