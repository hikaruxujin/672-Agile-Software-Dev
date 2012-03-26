var gService,
    gFlag,
    EVENT_FEED_URL = "http://www.google.com/calendar/feeds/default/private/full",
 
    SERVICE_TITLE = "linb-timeline-0.1",
    handleError = function(e){
       alert(String(e.message));
       linb.Dom.setCover(false);
    },
    _google_init = function(){
      google.gdata.client.init(handleError);
      var tag=location.href.split('#')[1];
        if( tag && tag.substr(0,4) =="2%2F"){
        }else if(google.accounts.user.checkLogin(EVENT_FEED_URL)) {
        gService = new google.gdata.calendar.CalendarService(SERVICE_TITLE);
        linb.SC('App',function(path){
            if(path){
                new App().show();
                linb('loading').remove();
            }else
                 throw new Error('App doesnt exists!');
        });
      }else{
        document.getElementById("authenticated-pane").style.display = "block";
        document.getElementById("loading").style.display = "none";
      }
    },
    _google_login = function(){
      google.accounts.user.login(EVENT_FEED_URL);
    },
    _google_logout = function(){
      google.accounts.user.logout();
      location.reload();
    };

new function(){
    google.load("gdata", "1");
    google.setOnLoadCallback(_google_init);
};


function _google_getTasksByTimeSpan(startMin, startMax, cb){
    if(gFlag){cb([]);return;}
    gFlag=true;
//    linb.Dom.setCover(true);
    var query = new google.gdata.calendar.CalendarEventQuery(EVENT_FEED_URL);    
    var s = new google.gdata.DateTime(),
        e = new google.gdata.DateTime();
    s.setDate(startMin);
    e.setDate(startMax);

    query.setOrderBy('starttime');
    query.setSortOrder('ascending');
    query.setSingleEvents(true);

    query.setMinimumStartTime(s);
    query.setMaximumStartTime(e);

    gService.getEventsFeed(query, function(root) {
        gFlag=false;
        cb(root.feed.getEntries());
//        linb.Dom.setCover(false);
    }, function(e){
        gFlag=false;
        handleError(e);
        cb([]);
    });
}

function _google_addTask(data, cb){
    linb.Dom.setCover(true);

    var entry = new google.gdata.calendar.CalendarEventEntry();

    entry.setTitle(google.gdata.Text.create(data.caption));

    var when = new google.gdata.When(),
        from = new google.gdata.DateTime(),
        to = new google.gdata.DateTime();
    from.setDate(data.from);
    to.setDate(data.to);    
    when.setStartTime(from);
    when.setEndTime(to);
    entry.addTime(when);
    
    if(data.con){
        entry.setContent(google.gdata.Text.create(data.con));
    }
    if(data.bgColor){
        var extendedProp = new google.gdata.ExtendedProperty();
        extendedProp.setName('bgColor');
        extendedProp.setValue(data.bgColor);
        entry.addExtendedProperty(extendedProp);
    }
    if(data.where){
        var where = new google.gdata.Where();
        where.setLabel(data.where);
        where.setValueString(data.where);
        entry.addLocation(where);
    }
    gService.insertEntry(EVENT_FEED_URL, entry, function(result){
        linb.Dom.setCover(false);
        cb(result.entry);
    }, 
    function(e){
        handleError(e);
    }, google.gdata.calendar.CalendarEventEntry);
}

function _google_modifyTask(entry, data, cb){
    var flag=false;
    if(data.caption){
        entry.setTitle(google.gdata.Text.create(data.caption));
        flag=true;
    }
    if(data.from || data.to){
        var when = entry.getTimes(when)[0];
        if(data.from){
            var from=new google.gdata.DateTime();
            from.setDate(data.from);
            when.setStartTime(from);
        }
        if(data.to){
            var to = new google.gdata.DateTime();
            to.setDate(data.to);
            when.setEndTime(to);
        }
        flag=true;
    }
    if(data.bgColor){
        var extendedProp = new google.gdata.ExtendedProperty();
        extendedProp.setName('bgColor');
        extendedProp.setValue(data.bgColor);
        entry.setExtendedProperties([extendedProp]);
        flag=true;
    }
    if(data.con){
        entry.setContent(google.gdata.Text.create(data.con));
        flag=true;
    }
    if(data.where){
        var where = new google.gdata.Where();
        where.setLabel(data.where);
        where.setValueString(data.where);
        entry.setLocations([where]);
        flag=true;
    }
    if(flag){
        linb.Dom.setCover(true);
        entry.updateEntry(function(result){
            linb.Dom.setCover(false);
            cb(result.entry);
        }, 
        function(e){
            handleError(e);
        });
    }
}

function _google_deleteTask(entry, cb){
    entry.deleteEntry(function(result){
        cb();
    }, 
    function(e){
        handleError(e);
    });
}