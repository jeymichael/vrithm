function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

self.addEventListener('message', function(e) { 
  var data = e.data;
  if (data.key == 'msg') {
    if (data.value == 'SORT') { 
      self.postMessage({'key': 'msg', 'value': 'Insertion Sorting :: '});
    }
  } else if (data.key == 'data') {
    self.postMessage({'key': 'debug', 'value': 'Insertion Received Data :: '});
    var arr = data.value;
    for (k = 0; k < arr.length; k++) {
      self.postMessage({'key': 'debug', 'value': 'Insertion Parsing Data :: '+arr[k].value});
    }
    var n = arr.length;
    for (i = 1; i < n; i++) { 
      for (j = 0; j <= i-1; j++) { 
        if (arr[i].value < arr[j].value)
          break;
      }
      first = arr[i];
      for (k = i - 1; k >= j; k--) {
        self.postMessage({'key': 'debug', 'value': 'Insertion Swapping Data :: '+arr[k+1].value});
        tmp = arr[k+1];
        arr[k+1] = arr[k];
        arr[k] = tmp;
        sleep(100);
        self.postMessage({'key': 'swap', 'type':'insertion', 'lvalue': k, 'rvalue': k+1});
      }
      arr[j] = first;
    }
    var res = '';
    for (i = 0; i < n; i++) { 
      res = res + ' ' + arr[i].value;
    }
    self.postMessage({'key': 'msg', 'value': 'Insertion Result: ' + res});
  }

}, false);

