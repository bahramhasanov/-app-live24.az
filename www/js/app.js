/**
 * Created by Design on 24.05.2016.
 */


var lang = {
    az: {
        home: 'Əsas səhifə',
        online_matches: 'Canlı',
        matches: 'Oyunlar',

        groups: 'Qruplar',
        loadmore: 'daha çox yüklə',

        notmatches: 'Axtarışa uyğun oyun tapılmadı',
        nostatistics: 'Statistika mövcud deyil',
        nolineup: 'Heyət mövcud deyil',
        nointernet: 'Zəhmət olmasa internet bağlantısını yoxladıqdan sonra cəhd edin',

        futurematches: 'Gələcək oyunlar',

        lineups: 'Komandalar',
        statistics: 'Statistika',
        others: 'Digər',


        BALLPOSSESSION: 'Topa sahib olma',
        CORNERS: 'Küncdən zərbə',
        FOULS: 'Qayda pozuntusu',
        FREEKICKS: 'Cərimə zərbəsi',
        GOALKICKS: 'Qapıdan zərbələr',
        OFFSIDES: 'Oyundankənar vəziyyət',
        SHOTSONGOAL: 'Dəqiq zərbələr',


        table_name: "Komanda",
        table_m: "O",
        table_p: "X",
        table_w: "Q",
        table_d: "H",
        table_l: "M",
        table_g: "Qol",


        m_ht: 'HT',
        m_we: 'WE',
        m_eht: 'EHT',
        m_wp: 'WP',
        m_pen: 'PEN',
        m_ft: 'FT',
        m_ppd: 'PPD',
        m_delay: 'delayed',
        m_cnsl: 'canceled',
        m_intr: 'interrupted',
        m_suspend: 'suspended',
        m_abandoned: 'abandoned',


        euro2016: 'Avro 2016'


    }, ru: {

        home: 'Главное',
        online_matches: 'Live',
        matches: 'Матчи',
        groups: 'Группы',
        loadmore: 'больше',

        notmatches: 'Игры не найдены',
        nostatistics: 'Нет статистических данных',
        nolineup: 'Состав не существует',
        nointernet: 'Пожалуйста, проверьте подключение к Интернету и повторите попытку',

        futurematches: 'Будущие матчи',

        lineups: 'Команды',
        statistics: 'Статистика',
        others: 'Другие',


        BALLPOSSESSION: 'Bладение мячом',
        CORNERS: 'Корнери',
        FOULS: 'Нарушения',
        FREEKICKS: 'Свободные удары',
        GOALKICKS: 'Удар от ворот',
        OFFSIDES: 'Офсайд',
        SHOTSONGOAL: 'Удар по воротам',


        table_name: "Команда",
        table_m: "М",
        table_p: "О",
        table_w: "В",
        table_d: "Н",
        table_l: "П",
        table_g: "Гол",


        m_ht: 'HT',
        m_we: 'WE',
        m_eht: 'EHT',
        m_wp: 'WP',
        m_pen: 'PEN',
        m_ft: 'FT',
        m_ppd: 'PPD',
        m_delay: 'delayed',
        m_cnsl: 'canceled',
        m_intr: 'interrupted',
        m_suspend: 'suspended',
        m_abandoned: 'abandoned',


        euro2016: 'Евро 2016'

    }, en: {

        home: 'Home',
        online_matches: 'Live',
        matches: 'Fixtures',
        groups: 'Groups',
        loadmore: 'load more',

        notmatches: 'no matches found',
        nostatistics: 'No statistics aviable',
        nolineup: 'Line up not provided',
        nointernet: 'Please check internet connection and try again',


        futurematches: 'Future matches',

        lineups: 'Line-ups',
        statistics: 'Statistics',
        others: 'Other',


        BALLPOSSESSION: 'Ball Possession',
        CORNERS: 'Corners',
        FOULS: 'Fouls',
        FREEKICKS: 'Free kicks',
        GOALKICKS: 'GOALKICKS',
        OFFSIDES: 'Offsides',
        SHOTSONGOAL: 'Shots on Target',


        table_name: "Team",
        table_m: "M",
        table_p: "P",
        table_w: "W",
        table_d: "D",
        table_l: "L",
        table_g: "Goals",


        m_ht: 'HT',
        m_we: 'WE',
        m_eht: 'EHT',
        m_wp: 'WP',
        m_pen: 'PEN',
        m_ft: 'FT',
        m_ppd: 'PPD',
        m_delay: 'delayed',
        m_cnsl: 'canceled',
        m_intr: 'interrupted',
        m_suspend: 'suspended',
        m_abandoned: 'abandoned',


        euro2016: 'Euro 2016'
    }
};


var language = localStorage.language || 'az';
var tournament_id = 0;
var back_url = 'http://live24.az/back/';
var currentMatch = 0;
var matchTime = '';

var matchesData = {};
var matchTimers = {};

function translate() {

    $('#header a.lang[data-lang=' + language + ']').hide();

    $('[translate]').each(function () {
        var tagName = $(this).prop("tagName").toLowerCase();

        var text = $(this).text();
            var title = $(this).attr('title');
            if (text != undefined && text != '') {
                if (lang[language][text]) {
                    $(this).text(lang[language][text]);
                } else {
                    console.warn(text + ' not  found - ' + lang[language][text]);
                    console.warn($(this).attr('id'));
                }
            }
            if (title != undefined && title != '') {
                if (lang[language][title]) {
                    $(this).attr('title', lang[language][title]);
                } else {
                    console.warn(title + ' not  found - ' + lang[language][title]);
                }
            }
    });
}


function sortTable() {

    $('.teamlist').each(function (i, table) {
        var items = $(table).find('.teamrow').get();
        items.sort(function (a, b) {
            var keyA = parseInt($(a).find('.team_point').text());
            var keyB = parseInt($(b).find('.team_point').text());

            if (keyA < keyB)
                return 1;
            if (keyA > keyB)
                return -1;
            return 0;
        });
        var ul = $(table);
        $.each(items, function (i, li) {
            ul.append(li);
        });
    })

}


function dateFormat(str) {
    var date = moment(str);
    return ("0" + date.date()).slice(-2) + '.' + ("0" + (date.month() + 1)).slice(-2) + '.' + date.year();
}

function dateTimeFormat(str) {
    var date = moment(str);
    var now = new Date();

    console.log(date.date());

    if (now.getDate() == date.date()) {
        return ("0" + date.hour()).slice(-2) + ":" + ("0" + date.minute()).slice(-2);
    } else {
        return ("0" + date.date()).slice(-2) + '.' + ("0" + (date.month() + 1)).slice(-2) + '.' + date.year() + ' ' + ("0" + date.hour()).slice(-2) + ":" + ("0" + date.minute()).slice(-2);
    }
}

function timeFormat(str) {
    var date = moment(str);
    var now = new Date();

    return ("0" + date.hour()).slice(-2) + ":" + ("0" + date.minute()).slice(-2);
}

function secToMinute(sec, add) {
    //convert seconds to minute:second

    var min = parseInt(sec /  60);

    return min + add + ':' + parseInt((sec - min * 60));

}


function dateToTimetamp(str) {
    var date;
    if (str == '') {
        date = moment();
    } else {
        date = moment(str);
    }

    return date.unix();

}


function matchCounter(place) {

    if (currentMatch > 0) {

        if (matchesData[currentMatch].matchtime != '' && typeof matchesData[currentMatch].matchtime != 'undefined') {

            var parts = matchesData[currentMatch]['matchtime'].split(':');

            var newmin = parseInt(parts[0]);
            var newsec = parseInt(parts[1]) + 1;
            if (newsec > 59) {
                newsec = 0;
                newmin += 1;
            }

            var newtext = (newmin < 9 ? '0' + (newmin+1) : (newmin+1)) + '’';

            place.text(newtext);

            matchesData[currentMatch].matchtime = (newmin < 10 ? '0' + newmin : newmin) +':'+(newsec < 10 ? '0' + newsec : newsec);

        }
        setTimeout(function () {
            matchCounter(place);
        }, 1000);
    }
}

function homeCounter(matchid) {

    if (matchesData[matchid].matchtime != '' && typeof matchesData[matchid].matchtime != 'undefined') {

        var parts = matchesData[matchid].matchtime.split(':');

        var newmin = parseInt(parts[0]);
        var newsec = parseInt(parts[1]) + 1;
        if (newsec > 59) {
            newsec = 0;
            newmin += 1;
        }

        var newtext =(newmin < 9 ? '0' + (newmin+1) : (newmin+1))+ '’';

        $('#main .matchlist').find('.match[data-id=' + matchid + '] .score .matchTime').text(newtext);

        matchesData[matchid].matchtime = newmin+':'+newsec;


    }
    if (matchTimers[matchid]) {
        clearTimeout(matchTimers[matchid]);
    }
    matchTimers[matchid] = setTimeout(function () {
        homeCounter(matchid);
    }, 1000);
}

function counter(time, place) {

    var parts = time.split(':');

    var newmin = parseInt(parts[0]);
    var newsec = parseInt(parts[1]) + 1;
    if (newsec > 59) {
        newsec = 0;
        newmin += 1;
    }

    var newtext = (newmin < 10 ? '0' + newmin : newmin) + ':' + ('0' + newsec).slice(-2);

    place.text(newtext);

    setTimeout(function () {
        counter(newtext, place);
    }, 1000);


}


function timeCounter(matchid, mstatus, starttime, periodstart, mT, location) {

    switch (parseInt(mstatus)) {

        case 0:
            matchesData[matchid].matchtime = '';
            if (location == 1) {
                mT.text(dateTimeFormat(starttime));
            } else {
                mT.text(timeFormat(starttime));
            }
            break;

        case 6:
        case 7:
        case 41:
        case 42:
            // show counter
            var period_started_seconds = dateToTimetamp('') - dateToTimetamp(periodstart);
            var period_started_minutes = parseInt(period_started_seconds / 60);
            var diff = 0;
            var isPlus = false;
            var plus_text = '0’';

            switch (parseInt(mstatus)) {
                case 6:
                case 20:
                    diff = 0;
                    if (period_started_minutes >= 45) {
                        isPlus = true;
                        plus_text = '45’+';
                    }
                    break;
                case 7:
                    diff = 45;
                    if (period_started_minutes >= 45) {
                        isPlus = true;
                        plus_text = '90’+';
                    }
                    break;
                case 41:
                    diff = 90;
                    if (period_started_minutes >= 15) {
                        isPlus = true;
                        plus_text = '105’+';
                    }
                    break;
                case 42:
                    diff = 105;
                    if (period_started_minutes >= 15) {
                        isPlus = true;
                        plus_text = '120’+';
                    }
                    break;
            }
            if (isPlus) {
                matchesData[matchid].matchtime = '';
                mT.text(plus_text);
            } else {
                var cTime = secToMinute(period_started_seconds, diff);
                matchesData[matchid].matchtime = cTime;
            }
            break;

        case 31:
            //halftime
            matchesData[matchid].matchtime = '';
            mT.text(lang[language].m_ht);
            break;

        case 32:
            // waiting extra
            matchesData[matchid].matchtime = '';
            mT.text(lang[language].m_we);
            break;

        case 33:
            // extra halftime
            matchesData[matchid].matchtime = '';
            mT.text(lang[language].m_eht);
            break;

        case 34:
            // waiting penalties
            matchesData[matchid].matchtime = '';
            mT.text(lang[language].m_wp);
            break;

        case 50:
            //penalties
            matchesData[matchid].matchtime = '';
            mT.text(lang[language].m_pen);
            break;


        case 100:
        case 110:
        case 120:
            // end of game
            mT.text(lang[language].m_ft);
            matchesData[matchid].matchtime = '';
            break;

        case 60:
            // postphoned
            mT.text(lang[language].m_ppd);
            matchesData[matchid].matchtime = '';
            break;

        case 61:
            // delayed
            mT.text(lang[language].m_delay);
            matchesData[matchid].matchtime = '';
            break;

        case 70:
            // canceled
            mT.text(lang[language].m_cnsl);
            matchesData[matchid].matchtime = '';
            break;

        case 80:
            // interrupted
            mT.text(lang[language].m_intr);
            matchesData[matchid].matchtime = '';
            break;

        case 81:
            // suspended
            mT.text(lang[language].m_suspend);
            matchesData[matchid].matchtime = '';
            break;

        case 90:
            // abandoned
            mT.text(lang[language].m_abandoned);
            matchesData[matchid].matchtime = '';
            break;


    }


}


function loadMatches(filter) {


    $('#loading').show();

    currentMatch = 0;
    //{type: 'all', id: tournament_id}
    //{type: 'team', id: team_id}

    var page = parseInt(filter.page) || (parseInt($('#main #loadmore').attr('data-page')) + 1 || 1);

    if (page == 1) {
        $('#main').html('');
        $('#main').append($('#temp #listPage').clone().removeAttr('id'));
    }

    filter.page = page;

    $('#main #loadmore').attr('data-page', page);
    $('#main #loadmore').attr('data-type', filter.type);
    $('#main #loadmore').attr('data-id', filter.id);

    $.ajax({
        url: back_url + 'matches.php',
        type: 'get',
        data: {
            page: page,
            type: filter.type,
            id: filter.id,
            l: language
        },
        contentType: 'json',

        success: function (res) {

            $('#loading').hide();

            if (typeof lang[language][res.text] != 'undefined') {
                $('#main .listName .name').text(lang[language][res.text]);
            } else {
                $('#main .listName .name').text(res.text);
            }

            if (res.matches.length < 1) {
                $('#main #loadmore').hide();
                if (page == 1) {
                    $('#main .matchtable').append($('<li class="error">' + lang[language].notmatches + '</li>'));
                }
            } else {

                if (res.matches.length < res.count) {
                    $('#main #loadmore').hide();
                }

                $.each(res.matches, function (i, match) {

                    if ($('#main .matchlist .match[data-id=' + match.id + ']').length > 0) {
                        console.log('match already exits');
                    } else {
                        if (!matchesData[match.id]) {
                            matchesData[match.id] = {};
                        }

                        var matchdate = dateFormat(match.starttime);

                        if ($('#main .matchtable').find('.date[data-date="' + matchdate + '"]').length < 1) {

                            $('#main .matchtable').append($('<li class="date" data-date="' + matchdate + '">' +
                                '<ul>' +
                                '   <li class="dateTitle">' + matchdate + '</li>' +
                                '   <li class="matches">' +
                                '       <ul class="matchlist">' +
                                '       </ul><!-- matchlist -->' +
                                '   </li>' +
                                '</ul>' +
                                '</li>'));


                        }
                        var m = $('#temp .match').clone();

                        m.attr('data-id', match.id);
                        m.find('.team1 span').text(match.team1);
                        m.find('.team2 span').text(match.team2);

                        match.mstatus = parseInt(match.mstatus);

                        if (match.score == null) {
                            if (match.mstatus == 0) {
                                m.find('.score .scoreTeam1').text('-');
                                m.find('.score .scoreTeam2').text('-');
                            } else if (match.mstatus == 70) {
                                // csnceled match
                                m.find('.score .scoreTeam1').text('-');
                                m.find('.score .scoreTeam2').text('-');
                            } else {
                                m.find('.score .scoreTeam1').text('0');
                                m.find('.score .scoreTeam2').text('0');
                            }
                        } else {
                            var scores = match.score.split('-');

                            m.find('.score .scoreTeam1').text(scores[0]);
                            m.find('.score .scoreTeam2').text(scores[1]);
                        }


                        if ([100, 110, 120, 0, 70].indexOf(match.mstatus) < 0) {
                            m.find('.score').addClass('online');
                        }
                        if ([100, 110, 120, 60, 70].indexOf(match.mstatus) >= 0) {
                            m.find('.score').removeClass('online').addClass('ended');
                        }

                        var mT = m.find('.matchTime');
                        timeCounter(match.id, match.mstatus, match.starttime, match.periodstart, mT, 0);


                        m.appendTo($('#main .matchtable').find('.date[data-date="' + matchdate + '"]')
                            .find('.matches .matchlist'));


                        matchesData[match.id].score = match.score;
                        matchesData[match.id].mstatus = match.mstatus;

                        homeCounter(match.id);
                    }

                })

            }

        }, error: function () {
            $('#loading').hide();
            alert('Can not load matches data');

        }


    })

}


function loadHome(t) {

    $('#loading').show();

    currentMatch = 0;

    $('#main').html('');
    $('#main').append($('#temp #homePage').clone().removeAttr('id'));

    $.ajax({
        url: back_url + 'home.php',
        type: 'get',
        data: {
            t: t,
            l: language
        },
        contentType: 'json',

        success: function (res) {

            $('#loading').hide();

            if (typeof lang[language][res.text] != 'undefined') {
                $('#main .listName .name').text(lang[language][res.text]);
            } else {
                $('#main .listName .name').text(res.text);
            }

            if (res.matches.length < 1) {

                $('#main .matchtable').append($('<li class="error">' + lang[language].notmatches + '</li>'));

            } else {

                $.each(res.matches, function (i, match) {

                    if ($('#main .matchlist .match[data-id=' + match.id + ']').length > 0) {
                        console.log('match already exits');
                    } else {
                        if (!matchesData[match.id]) {
                            matchesData[match.id] = {};
                        }

                        var matchdate = dateFormat(match.starttime);

                        if ($('#main .matchtable').find('.tournament[data-id="' + match.tournament_id + '"]').length < 1) {

                            $('#main .matchtable').append(
                                $('<li class="tournament" data-id="' + match.tournament_id + '">' +
                                    '   <ul>' +
                                    '       <li class="tournamentTitle">' +
                                    '       <a href="#tournament:' + match.tournament_id + '">' +
                                    '           <b>' + match.category_name + ':</b> ' +
                                    '           ' + match.tournament_name +
                                    '       </a>' +
                                    '   </li>' +
                                    '       <li class="dates">' +
                                    '           <ul class="datelist"></ul><!-- datelist -->' +
                                    '       </li>' +
                                    '   </ul>' +
                                    '</li><!-- tournament -->')
                            );

                        }


                        if ($('#main .matchtable').find('.tournament[data-id="' + match.tournament_id + '"] .dates .datelist .date[data-date="' + matchdate + '"]').length < 1) {

                            $('#main .matchtable').find('.tournament[data-id="' + match.tournament_id + '"] .dates .datelist').append(
                                $('<li class="date" data-date="' + matchdate + '">' +
                                    '<ul>' +
                                    '   <li class="dateTitle">' + matchdate + '</li>' +
                                    '   <li class="matches">' +
                                    '       <ul class="matchlist">' +
                                    '       </ul><!-- matchlist -->' +
                                    '   </li>' +
                                    '</ul>' +
                                    '</li>'));

                        }
                        var m = $('#temp .match').clone();

                        m.attr('data-id', match.id);
                        m.find('.team1 span').text(match.team1);
                        m.find('.team2 span').text(match.team2);

                        match.mstatus = parseInt(match.mstatus);

                        if (match.score == null) {
                            if (match.mstatus == 0) {
                                m.find('.score .scoreTeam1').text('-');
                                m.find('.score .scoreTeam2').text('-');
                            } else if (match.mstatus == 70) {
                                // csnceled match
                                m.find('.score .scoreTeam1').text('-');
                                m.find('.score .scoreTeam2').text('-');
                            } else {
                                m.find('.score .scoreTeam1').text('0');
                                m.find('.score .scoreTeam2').text('0');
                            }
                        } else {
                            var scores = match.score.split('-');

                            m.find('.score .scoreTeam1').text(scores[0]);
                            m.find('.score .scoreTeam2').text(scores[1]);
                        }


                        if ([100, 110, 120, 90, 0, 70].indexOf(match.mstatus) < 0) {
                            m.find('.score').addClass('online');
                        }
                        if ([100, 110, 120, 90, 60, 70].indexOf(match.mstatus) >= 0) {
                            m.find('.score').removeClass('online').addClass('ended');
                        }

                        var mT = m.find('.matchTime');
                        timeCounter(match.id, match.mstatus, match.starttime, match.periodstart, mT, 0);


                        m.appendTo($('#main .matchtable')
                                .find('.tournament[data-id=' + match.tournament_id + ']')
                                .find('.date[data-date="' + matchdate + '"]')
                                .find('.matches .matchlist')
                        );


                        matchesData[match.id].score = match.score;
                        matchesData[match.id].mstatus = match.mstatus;

                        homeCounter(match.id);
                    }

                })

            }

        }, error: function () {
            $('#loading').hide();
            alert('Can not load matches data');

        }


    })

}

function refreshMatches() {

    //{type: 'all', id: tournament_id, page: page}
    //{type: 'team', id: team_id}

    var matches = [];

    $('#main').find('.score').not('.ended').each(function (i, elem) {


        matches.push($(elem).closest('.match').attr('data-id'));

    })

    if (matches.length > 0) {

        $.ajax({
            url: back_url + 'matchesupdate.php',
            type: 'get',
            data: {
                id: matches,
                l: language
            },
            contentType: 'json',

            success: function (res) {

                if (res.matches.length < 1) {
                    // do mothing
                } else {

                    $.each(res.matches, function (i, match) {


                        var m = $('#main .matchlist .match[data-id=' + match.id + ']');

                        match.mstatus = parseInt(match.mstatus);

                        if (match.mstatus != matchesData[match.id].mstatus) {
                            playGoal('start');
                            matchesData[match.id].mstatus = match.mstatus;
                        }
                        if (match.score != matchesData[match.id].score) {
                            playGoal('goal');
                            matchesData[match.id].score = match.score;
                        }

                        if (match.score == null) {
                            if (match.mstatus == 0) {
                                m.find('.score .scoreTeam1').text('-');
                                m.find('.score .scoreTeam2').text('-');
                            } else if (match.mstatus == 70) {
                                // csnceled match
                                m.find('.score .scoreTeam1').text('-');
                                m.find('.score .scoreTeam2').text('-');
                            } else {
                                m.find('.score .scoreTeam1').text('0');
                                m.find('.score .scoreTeam2').text('0');
                            }
                        } else {
                            var scores = match.score.split('-');

                            m.find('.score .scoreTeam1').text(scores[0]);
                            m.find('.score .scoreTeam2').text(scores[1]);
                        }


                        if ([100, 110, 120, 90, 0, 70].indexOf(match.mstatus) < 0) {
                            m.find('.score').addClass('online');
                        }
                        if ([100, 110, 120, 90, 60].indexOf(match.mstatus) >= 0) {
                            m.find('.score').removeClass('online').addClass('ended');
                        }


                        var mT = m.find('.matchTime');

                        timeCounter(match.id, match.mstatus, match.starttime, match.periodstart, mT, 0);

                    })


                }

            }, error: function () {
                console.log('Can not update matchs data');
            }

        })


    }


}


function loadMatch(matchid) {

    if (matchid > 0) {

        $('#loading').show();

        currentMatch = matchid;
        $.ajax({

            url: back_url + 'match.php',
            type: 'get',
            data: {
                m: matchid,
                l: language
            },
            contentType: 'json',

            success: function (res) {

                $('#loading').hide();

                if (res == null) {

                    alert('Match not found');

                } else {

                    matchesData[res.id] = {
                        mstatus: res.mstatus,
                        score: res.score
                    }


                    $('#main').html('');
                    $('#temp .matchPage').clone().appendTo($('#main'));
                    var m = $('#main .matchPage');

                    m.find('.tournamentName').html('<span data-id="' + res.tournament_id + '"><b>' + res.category_name + '</b><br>' + res.tournament_name + '</span>');

                    m.find('.teams .nameTeam1 span').html('<span>' + res.team1 + '</span><span><img src="https://ls.sportradar.com/ls/crest/big/' + res.id_team1 + '.png"></span>').attr('data-id', res.id_team1);

                    m.find('.teams .nameTeam2 span').html('<span><img src="https://ls.sportradar.com/ls/crest/big/' + res.id_team2 + '.png"></span><span>' + res.team2 + '</span>').attr('data-id', res.id_team2);

                    if (res.score == null) {
                        if (res.mstatus == 0 || res.mstatus == '70') {
                            m.find('.scoreCurrent .scoreTeam1').text('-');
                            m.find('.scoreCurrent .scoreTeam2').text('-');
                        } else {
                            m.find('.scoreCurrent .scoreTeam1').text('0');
                            m.find('.scoreCurrent .scoreTeam2').text('0');
                        }
                    } else {
                        var scores = res.score.split('-');

                        m.find('.scoreCurrent .scoreTeam1').text(scores[0]);
                        m.find('.scoreCurrent .scoreTeam2').text(scores[1]);

                        if (res.score != '0-0') {
                            // there is goals
                            $.ajax({
                                url: back_url + 'goals.php',
                                type: 'get',
                                data: {
                                    m: matchid
                                },
                                contentType: 'json',
                                success: function (res) {
                                    $.each(res, function (i, goal) {

                                        var g = $('#temp #goalRecord').clone().removeAttr('id');

                                        g.find('.time').text(goal.minute + '\'');

                                        if (parseInt(goal.team) == 1) {
                                            g.find('.player:first-child').text(goal.player.replace(',', ''));
                                        } else {
                                            g.find('.player:last-child').text(goal.player.replace(',', ''));
                                        }

                                        g.appendTo(m.find('.goals'));

                                    })
                                }
                            })

                        }

                    }

                    var mT = m.find('.matchTime');

                    res.mstatus = parseInt(res.mstatus);

                    timeCounter(res.id, res.mstatus, res.starttime, res.periodstart, mT, 1);

                    matchCounter(mT);

                    if ([100, 110, 120, 0, 90, 70, 60].indexOf(res.mstatus) < 0) {
                        mT.addClass('online');
                    }
                    if ([100, 110, 120, 70, 90, 60].indexOf(res.mstatus) >= 0) {
                        mT.removeClass('online').addClass('ended');
                    }


                    if (res.lineup_team1 == null && res.lineup_team2 == null) {
                        m.find('.tabContent #lineUps .team:first-child').html(lang[language].nolineup);
                    } else {
                        if (res.lineup_team1 != null) {
                            var lieups = res.lineup_team1.split('#');
                            $.each(lieups, function (i, text) {
                                if (text != '') {
                                    var lineup = text.split('_');
                                    m.find('.tabContent #lineUps .team:first-child').append('<div class="player"><div class="number">' + lineup[0] + '</div><div class="name">' + lineup[1] + '</div></div>');
                                }
                            })
                        } else {
                            m.find('.tabContent #lineUps .team:first-child').html(lang[language].nolineup);
                        }
                        if (res.lineup_team2 != null) {
                            var lieups = res.lineup_team2.split('#');
                            $.each(lieups, function (i, text) {
                                if (text != '') {
                                    var lineup = text.split('_');
                                    m.find('.tabContent #lineUps .team:last-child').append('<div class="player"><div class="number">' + lineup[0] + '</div><div class="name">' + lineup[1] + '</div></div>');
                                }
                            })
                        } else {
                            m.find('.tabContent #lineUps .team:last-child').html(lang[language].nolineup);
                        }
                    }


                    $.ajax({
                        url: back_url + 'stat.php',
                        type: 'get',
                        data: {
                            m: matchid
                        },
                        contentType: 'json',
                        success: function (res) {
                            if (Object.keys(res).length > 0) {

                                $.each(res, function (i, s) {

                                    if (typeof s != undefined && s != null && i != 'MATCH_ID' && i != 'ID') {
                                        var sd = s.split('-');
                                        sd[0] = parseInt(sd[0]);
                                        sd[1] = parseInt(sd[1]);
                                        var sdp = {
                                            0: sd[0] / (sd[0] + sd[1]) * 100,
                                            1: sd[1] / (sd[0] + sd[1]) * 100
                                        };
                                        m.find('.tabContent #statistics').append('<div class="statistic"><div class="title">' + lang[language][i] + '</div><div class="bar"><div class="part" style="width:' + sdp[0] + '%;">' + sd[0] + '</div><div class="part" style="width:' + sdp[1] + '%;">' + sd[1] + '</div></div>');
                                    }
                                });

                            } else {
                                m.find('.tabContent #statistics').append('<div>' + lang[language].nostatistics + '</div>');
                            }
                        }
                    })

                }

            }, error: function () {

                $('#loading').hide();
                alert('Can not load match data');

            }

        })

        setTimeout(function () {
            refreshMatch(currentMatch);
        }, 15000);
    }

}


function refreshMatch(matchid) {

    if (matchid > 0) {
        currentMatch = matchid;
        $.ajax({

            url: back_url + 'matchupdate.php',
            type: 'get',
            data: {
                m: matchid,
                l: language
            },
            contentType: 'json',

            success: function (res) {

                if (res == null) {

                    alert('Match not found');

                    //window.location.reload();

                } else {

                    var m = $('#main .matchPage');

                    if (matchesData[matchid].mstatus != res.mstatus) {
                        playGoal('start');
                    }

                    if (matchesData[matchid].score != res.score) {
                        playGoal('goal');
                    }


                    if (res.score == null) {
                        if (res.mstatus == 0 || res.mstatus == '70') {
                            m.find('.scoreCurrent .scoreTeam1').text('-');
                            m.find('.scoreCurrent .scoreTeam2').text('-');
                        } else {
                            m.find('.scoreCurrent .scoreTeam1').text('0');
                            m.find('.scoreCurrent .scoreTeam2').text('0');
                        }
                    } else {
                        var scores = res.score.split('-');

                        m.find('.scoreCurrent .scoreTeam1').text(scores[0]);
                        m.find('.scoreCurrent .scoreTeam2').text(scores[1]);

                        if (res.score != '0-0' && matchesData[matchid].score != res.score) {
                            m.find('.goals').text('');
                            // there is goals
                            $.ajax({
                                url: back_url + 'goals.php',
                                type: 'get',
                                data: {
                                    m: matchid
                                },
                                contentType: 'json',
                                success: function (res) {
                                    $.each(res, function (i, goal) {

                                        var g = $('#temp #goalRecord').clone().removeAttr('id');

                                        g.find('.time').text(goal.minute + '\'');

                                        if (parseInt(goal.team) == 1) {
                                            g.find('.player:first-child').text(goal.player);
                                        } else {
                                            g.find('.player:last-child').text(goal.player);
                                        }

                                        g.appendTo(m.find('.goals'));

                                    })
                                }
                            })

                        }

                    }

                    var mT = m.find('.matchTime');
                    timeCounter(res.id, res.mstatus, res.starttime, res.periodstart, mT, 1);

                    if ([100, 110, 120, 0, 90, 70, 60].indexOf(parseInt(res.mstatus)) < 0) {
                        mT.addClass('online');
                    }
                    if ([100, 110, 120, 70, 90, 60].indexOf(res.mstatus) >= 0) {
                        mT.removeClass('online').addClass('ended');
                    }

                    matchesData[matchid].mstatus = res.mstatus;
                    matchesData[matchid].score = res.score;

                }

            }

        })

        setTimeout(function () {
            refreshMatch(currentMatch);
        }, 15000);
    }

}

function loadGroups() {

    $('#loading').show();

    currentMatch = 0;

    $('#main').html('');
    $('#main').append($('#temp #groupPage').clone().removeAttr('id'));

    $.ajax({
        url: back_url + 'groups.php',
        type: 'get',
        data: {
            l: language
        },
        contentType: 'json',

        success: function (res) {

            $('#loading').hide();

            if (res.tables.length > 0) {

                $.each(res.tables, function (i, team) {

                    if ($('#main .groups .tablerow[data-id=' + team.TEAM_ID + ']').length > 0) {
                        console.log('match already exits');
                    } else {

                        if ($('#main .groups').find('.table[data-id="' + team.TOURNAMENT_ID + '"]').length < 1) {

                            $('#main .groups').append(
                                $('<li class="table" data-id="' + team.TOURNAMENT_ID + '">' +
                                    '   <ul>' +
                                    '       <li class="teams">' +
                                    '           <table class="teamlist">' +
                                    '              <tr class="tableTitle">' +
                                    '                   <td><a href="#tournament:' + team.TOURNAMENT_ID + '">' +
                                    '           ' + team.tournament_name +
                                    '       </a></td>' +
                                    '                   <td>' + lang[language].table_m + '</td>' +
                                    '                   <td>' + lang[language].table_p + '</td>' +
                                    '                   <td>' + lang[language].table_w + '</td>' +
                                    '                   <td>' + lang[language].table_d + '</td>' +
                                    '                   <td>' + lang[language].table_l + '</td>' +
                                    '                   <td>' + lang[language].table_g + '</td>' +
                                    '               </tr>' +
                                    '           </table><!-- datelist -->' +
                                    '       </li>' +
                                    '   </ul>' +
                                    '</li><!-- tournament -->')
                            );

                        }


                        var t = $('#temp #groupTable .teamrow').clone();

                        t.attr('data-id', team.TEAM_ID);

                        t.find('.team_name').html('<a href="#team:' + team.TEAM_ID + '">' + team.team_name + '</a>');
                        t.find('.team_matches').text(team.GAME_COUNT);
                        t.find('.team_point').text(team.POINT);
                        t.find('.team_win').text(team.WIN);
                        t.find('.team_draw').text(team.DRAW);
                        t.find('.team_lose').text(team.LOSE);
                        t.find('.team_goal').text(team.GOAL_SCORED + ':' + team.GOAL_AGAINST);

                        $('#main .groups')
                            .find('.table[data-id=' + team.TOURNAMENT_ID + ']')
                            .find('.teams .teamlist').append($(t));


                        sortTable();

                    }

                })

            }

        }, error: function () {
            $('#loading').hide();
            alert('Can not load matches data');

        }


    })

}


function showModul(hash) {
    if (hash == '') {
        setHash('home');
    } else {

        if (hash.indexOf('home') == 0) {
            if (hash == 'home') {
                var t = 0;
            } else {
                var parts = hash.split(':');
                var t = parts[1];
            }
            loadHome(t);
        } else if (hash == 'online') {
            loadMatches({type: 'online', id: tournament_id, page: 1});
        } else if (hash == 'groups') {
            loadGroups();
        } else if (hash.indexOf('match:') == 0) {
            var parts = hash.split(':');

            loadMatch(parts[1]);

        } else if (hash.indexOf('team') == 0) {
            var parts = hash.split(':');

            loadMatches({type: 'team', id: parts[1], page: 1});

        } else if (hash.indexOf('tournament') == 0) {
            var parts = hash.split(':');

            loadMatches({type: 'all', id: parts[1], page: 1});

        }
    }
}


function setHash(hash) {
    // update location
    window.location.hash = '#' + hash;
}


function playGoal(event) {

    console.log('play:' + event);

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'img/' + event + '.mp3');
    audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.load();

    audioElement.addEventListener("load", function () {
        audioElement.play();
    }, true);

}

$(document).ready(function () {

    translate();

    /*$.ajax({
     url: back_url + 'operator.php',
     type: 'get',
     data: {},
     success: function (res) {
     switch (res) {
     case 'bak':
     // bakcel
     $('head').append('<link rel="stylesheet" href="css/bakcell.css" type="text/css" />');
     break;
     case 'nar':
     //nar
     break;
     case 'office':
     //office
     $('head').append('<link rel="stylesheet" href="css/bakcell.css" type="text/css" />');
     break;
     default :
     //defolut theme
     }

     showModul(window.location.hash.substr(1));

     }
     })*/


    showModul(window.location.hash.substr(1));

    setInterval(function () {
        refreshMatches();
    }, 15000);

    $(window).on('hashchange', function () {
        var hash = window.location.hash.substr(1);
        if (hash == '') {
            hash = 'home';
        }
        showModul(hash)

    });


    $('body').on('click', '#loadmore', function (e) {
        var id = $('#main #loadmore').attr('data-id');
        var type = $('#main #loadmore').attr('data-type');
        loadMatches({type: type, id: id});
        e.preventDefault();
    })


    $('body').on('click', '.leftbtn', function (e) {

        var hash = window.location.hash.substr(1);

        if (hash.indexOf('home') == 0) {
            if (hash == 'home') {
                var t = 0;
            } else {
                var parts = hash.split(':');
                var t = parseInt(parts[1]);
            }
        } else {
            var t = 0;
        }

        setHash('home:' + (t - 1));

        e.preventDefault();
    })


    $('body').on('click', '.rightbtn', function (e) {

        var hash = window.location.hash.substr(1);

        if (hash.indexOf('home') == 0) {
            if (hash == 'home') {
                var t = 0;
            } else {
                var parts = hash.split(':');
                var t = parseInt(parts[1]);
            }
        } else {
            var t = 0;
        }

        setHash('home:' + (t + 1));

        e.preventDefault();
    })


    $('body').on('click', '[class^="nameTeam"] span[data-id]', function (e) {
        var teamId = $(this).attr('data-id');
        setHash('team:' + teamId);
        e.preventDefault();
    })


    $('body').on('click', '.matchlist .match', function (e) {
        var matchId = $(this).attr('data-id');
        setHash('match:' + matchId);
        e.preventDefault();
    })

    $('body').on('click', '.tournamentName span', function (e) {
        var tourId = $(this).attr('data-id');
        setHash('tournament:' + tourId);
        e.preventDefault();
    })


    $('body').on('click', 'a.lang[data-lang]', function (e) {
        var newlang = $(this).attr('data-lang');
        localStorage.language = newlang;
        window.location.reload();
        e.preventDefault();
    });

    $('body').on('click', '.tabHead li', function (e) {
        var index = $(this).index();

        $('#main .tabHead li.active').removeClass('active');
        $('#main .tabHead li').eq(index).addClass('active');

        $('#main .tabContent li.active').removeClass('active');
        $('#main .tabContent li').eq(index).addClass('active');

    })

});