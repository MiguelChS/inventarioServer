/**
 * Created by mc185249 on 2/21/2017.
 */

function formatUtcIni(moment,offsetMin){
    moment.startOf("hours");
    if(offsetMin){
        moment.add(offsetMin,'minutes');
    }
    return moment;
}

function formatUtcFin(moment,offsetMin){
    moment.hours(23).minutes(59).seconds(59);
    if(offsetMin){
        moment.add(offsetMin,'minutes');
    }
    return moment;
}

module.exports = {
    formatIni: formatUtcIni,
    formatFin: formatUtcFin
};