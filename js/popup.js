getTickets();
var trackerTab = null;

function getTickets() {
 $.ajax({
  url: 'http://example.com/tickets/data.php',
  type: 'post',
  data: {
   action: 'byStatus',
   status: '0'
  },
  dataType: 'json',
  success: populateData
 });
}

function populateData(data) {
 if (data) {
  $('#tickets').before('<p>Tickets:</p>');
  for(ticket in data.tickets) {
   $('#tickets').append('<li><a id="ticket'+data.tickets[ticket].id+'" value="'+data.tickets[ticket].id+'" href="">'+data.tickets[ticket].subject+'</a></li>');
   $('#ticket'+data.tickets[ticket].id).click(function() {
    chrome.tabs.create({url: 'https://example.com/msgs/?id='+$(this).attr('value')});
   });
  }
 }
 else {
 $('#tickets').before('<p>No tickets</p>');
 }
 $('#link').click(function() {
  chrome.tabs.getAllInWindow(null, function(Tab) {
   openTab = false;
   for (i in Tab) {
    if (Tab[i].url == 'http://example.com/tickets/') {
     chrome.tabs.update(Tab[i].id, {selected: true});
     openTab = true;
    }
   }
   if (openTab == false) {
    chrome.tabs.create({url: 'http://example.com/tickets/'});
   }
  });
 });
}
