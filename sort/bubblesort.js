function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

self.addEventListener('message', function(e) { 
  var data = e.data;
  if (data.key == 'msg') {
    if (data.value == 'SORT') { 
      self.postMessage({'key': 'msg', 'value': 'Bubble Sorting :: '});
    }
  } else if (data.key == 'data') {
    self.postMessage({'key': 'debug', 'value': 'Bubble Received Data :: '});
    var arr = data.value;
    for (k = 0; k < arr.length; k++) {
      self.postMessage({'key': 'debug', 'value': 'Bubble Parsing Data :: '+arr[k].value});
    }
    var n = arr.length;
    for (i = 0; i < n; i++) { 
      for (j = 0; j < n-1; j++) { 
        if (arr[j].value > arr[j+1].value) { 
      self.postMessage({'key': 'debug', 'value': 'Bubble Swapping Data :: '+arr[j].value});
          tmp = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = tmp;
          sleep(100);
          self.postMessage({'key': 'swap', 'type':'bubble', 'lvalue': j, 'rvalue': j+1});
        }
      }
    }
    var res = '';
    for (i = 0; i < n; i++) { 
      res = res + ' ' + arr[i].value;
    }
    self.postMessage({'key': 'msg', 'value': 'Bubble Result: ' + res});
  }

}, false);

