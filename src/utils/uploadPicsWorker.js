self.addEventListener(
  'message',
  function(ev) {
    console.log(ev.data);

    this.postMessage('ok');
  },
  false,
);
