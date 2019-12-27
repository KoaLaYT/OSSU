// to make packet sending one by one
class PackChecker {
  constructor() {
    this.queue = [];
  }
  wait(index) {
    return new Promise((resolve, reject) => {
      this.queue.push({ index, resolve, reject });
      // consider as lost after 1000ms
      setTimeout(() => {
        const job = this.queue.find(q => q.index === index);
        if (!job) return;
        this.queue = this.queue.filter(q => q.index !== index);
        job.reject();
      }, 1000);
    });
  }

  check(index) {
    const job = this.queue.find(q => q.index === index);
    return Boolean(job);
  }

  confirm(index) {
    const job = this.queue.find(q => q.index === index);
    this.queue = this.queue.filter(q => q.index !== index);
    job.resolve();
  }
}

module.exports = {
  msgToBuffer(msg) {
    return Buffer.from(JSON.stringify(msg));
  },
  bufferToMsg(buffer) {
    return JSON.parse(buffer.toString("utf-8"));
  },
  PackChecker
};
