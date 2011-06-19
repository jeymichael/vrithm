function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function item(val) {
  this.value = val;
  this.treesize = 1;
  this.x = this.y = 0;
  this.l = this.r = null;
}

function insert(arr)
{
  var count = 14;
  var node = null;
  for (i = 0; i < count; i++) { 
    node = new item(Math.floor(Math.random() * 120));
    insertNode(arr, arr[0], node);

    sleep(2000);
    positionItems(arr);  // Generate x,y coordinates
    self.postMessage({'key': 'drawTree', 'value': treeStr(arr[0])});
  }
}

function insertNode(arr, parent, current)
{
  current.treesize = 1;
  if (parent.l != null || parent.r != null) { 
    if (parent.l == null) {
      // parent.r is NOT null, so place the new node on the left
      parent.l = current;
      parent.treesize++;
      return 1;
    }
    if (parent.r == null) {
      // parent.l is NOT null, so place the new node on the right
      parent.r = current;
      parent.treesize++;
      return 1;
    }
    // Both sub-trees are present
    // Recurse down, on the smaller sub-tree
    if (parent.l.treesize < parent.r.treesize) {
      insertNode(arr, parent.l, current);
    } else {
      insertNode(arr, parent.r, current);
    }
    parent.treesize++;
    return 1;
  } else {
    // both are null, just place it anywhere.
    parent.l = current;
    parent.treesize++;
    return 1;
  }
}

function buildTree() {
  var arr = new Array();
  arr[0] = new item(Math.floor(Math.random() * 120));

  var count = 14;
  var node = null;
  for (i = 0; i < count; i++) { 
    node = new item(Math.floor(Math.random() * 120));
    insertNode(arr, arr[0], node);

    sleep(2000);
    positionItems(arr);  // Generate x,y coordinates
    self.postMessage({'key': 'drawTree', 'value': treeStr(arr[0])});
  }
  return arr;
}

function positionItems(arr) {
  if (arr == null) return;
  if (arr.length == 0) return;
  var MAX_DEPTH = 5;
  var queue = [];
  queue.push(arr[0]);

  while (queue.length != 0) {
    var cur = queue.shift();
    if (cur.l != null) {
      queue.push(cur.l);
      cur.l.y = cur.y + 40;
      var off = cur.l.y;
      var offset = 10*(MAX_DEPTH - (cur.l.y)/40)*(MAX_DEPTH - (cur.l.y)/40);
      cur.l.x = cur.x - 10 - offset;
    }
    if (cur.r != null) {
      queue.push(cur.r);
      cur.r.y = cur.y + 40;
      var off = cur.r.y;
      var offset = 10*(MAX_DEPTH - (cur.r.y)/40)*(MAX_DEPTH - (cur.r.y)/40);
      cur.r.x = cur.x + 10 + offset;
    }
  }

  return;
}

function treeStr(parent)
{
  if (parent != null) {
    var left = treeStr(parent.l);
    var str = '';
    str = str + parent.x + " " + parent.y + " ";
    str = str + parent.treesize + " " + parent.value + " ";
    var right = treeStr(parent.r);
    return left + str + right;
  }
  return '';
}

self.addEventListener('message', function(e) { 
  var data = e.data;
  if (data.key == 'msg') {
  } else if (data.key == 'data') {
    // self.postMessage({'key': 'debug', 'value': 'Received Data :: '});
    // Not receiving data from html, now.
    arr = buildTree();
    var res = treeStr(arr[0]);
    self.postMessage({'key': 'drawTree', 'value': res});
  }
}, false);

