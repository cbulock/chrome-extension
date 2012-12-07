$.tickets = {update:[], notification:[], timer:[]};
update_count();
setInterval('update_count()',20000);
function update_count() {
 $.ajax({
  url: 'http://example.com/tickets/data.php',
  data: {
   'action': 'notifier',
   'update': $.tickets.update
  },
  dataType: 'json',
  success: function(data) {
   $.tickets.update = data.update;
   if (data.needs_looked_at == 0) {
    chrome.browserAction.setBadgeText({'text':''});
   }
   else {
    chrome.browserAction.setBadgeText({'text':data.needs_looked_at});
    if (data.tickets) {
     for (ticketkey in data.tickets) {
      $.tickets.notification[data.tickets[ticketkey].id] = window.webkitNotifications.createNotification('imgs/Logo48.png','New Ticket',data.tickets[ticketkey].subject);
      $.tickets.notification[data.tickets[ticketkey].id].show();
      $.tickets.timer[data.tickets[ticketkey].id] = data.tickets[ticketkey].id;
      setTimeout('hideNotifications()',20000);
     }
    }
   }
  }
 });
}

function hideNotifications() {
 for(i in $.tickets.timer) {
  $.tickets.notification[i].cancel();
 }
}

