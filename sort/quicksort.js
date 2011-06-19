function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function partition(arr, left, right) 
{
  var i = left - 1;
  var j = right;
  var q = arr[right].value;
  for (;;) {
    for ( ; arr[++i].value < q; ) {
    } 
    for ( ; q < arr[--j].value;)  {
      if (j <= 0) break;
    }
    if (i >= j) break;
    // SWAP
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    sleep(100);
    self.postMessage({'key': 'swap', 'type':'quick', 'lvalue': i, 'rvalue': j});
  }
  tmp = arr[i];
  arr[i] = arr[right];
  arr[right] = tmp;
  sleep(100);
  self.postMessage({'key': 'swap', 'type':'quick', 'lvalue': i, 'rvalue': right});
  return i;
}

function qsort(arr, left, right)
{
  if (right <= left) return;
  var i = partition(arr, left, right);
  qsort(arr, left, i-1);
  qsort(arr, i+1, right);
}

self.addEventListener('message', function(e) { 
  var data = e.data;
  if (data.key == 'msg') {
    if (data.value == 'SORT') { 
      self.postMessage({'key': 'msg', 'value': 'Quick Sorting :: '});
    }
  } else if (data.key == 'data') {
    self.postMessage({'key': 'debug', 'value': 'Quick Received Data :: '});
    var arr = data.value;
    for (k = 0; k < arr.length; k++) {
      self.postMessage({'key': 'debug', 'value': 'Quick Parsing Data :: '+arr[k].value});
    }
    var n = arr.length;
    qsort(arr, 0, n-1);
    var res = '';
    for (i = 0; i < n; i++) { 
      res = res + ' ' + arr[i].value;
    }
    self.postMessage({'key': 'msg', 'value': 'Quick Result: ' + res});
  }

}, false);

