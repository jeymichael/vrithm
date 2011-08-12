function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

var gHeapSize = 0;

function max_heapify(arr, index) {
  lchild = index * 2 + 1;
  rchild = lchild + 1;
  if (lchild < gHeapSize && arr[lchild].value > arr[index].value) { 
    largest = lchild;
  } else {
    largest = index;
  }
  if (rchild < gHeapSize && arr[rchild].value > arr[largest].value) { 
    largest = rchild;
  }
  if (largest != index) {
    // swap
    self.postMessage({'key': 'debug', 'value': 'Heap Swapping Data :: '+arr[index].value});
    tmp = arr[index];
    arr[index] = arr[largest];
    arr[largest] = tmp;
    sleep(100);
    self.postMessage({'key': 'swap', 'type':'heap', 'lvalue': index, 'rvalue': largest});

    max_heapify(arr, largest);
  }
}

function buildMaxHeap(arr) {
  for (i = gHeapSize/2 - 1; i >= 0; i--) { 
    max_heapify(arr, i);
  }
}

function heapsort(arr, min, max)
{
  // min should be zero, anyway!
  gHeapSize = arr.length;
  buildMaxHeap(arr);
  for (i = max; i >= min + 1; i--) {
    self.postMessage({'key': 'debug', 'value': 'Heap Swapping Data :: '+arr[i].value});
    tmp = arr[0];
    arr[0] = arr[i];
    arr[i] = tmp;
    gHeapSize--;
    sleep(100);
    self.postMessage({'key': 'swap', 'type':'heap', 'lvalue': 0, 'rvalue': i});
    max_heapify(arr, 0);
  }
}

self.addEventListener('message', function(e) { 
  var data = e.data;
  if (data.key == 'msg') {
    if (data.value == 'SORT') { 
      self.postMessage({'key': 'msg', 'value': 'Heap Sorting :: '});
    }
  } else if (data.key == 'data') {
    self.postMessage({'key': 'debug', 'value': 'Heap Received Data :: '});
    var arr = data.value;
    for (k = 0; k < arr.length; k++) {
      self.postMessage({'key': 'debug', 'value': 'Heap Parsing Data :: '+arr[k].value});
    }
    var n = arr.length;
    heapsort(arr, 0, n-1);
    var res = '';
    for (i = 0; i < n; i++) { 
      res = res + ' ' + arr[i].value;
    }
    self.postMessage({'key': 'msg', 'value': 'Heap Result: ' + res});
    self.postMessage({'key': 'msg', 'type':'heap', 'value': 'DONE'});
  }

}, false);

