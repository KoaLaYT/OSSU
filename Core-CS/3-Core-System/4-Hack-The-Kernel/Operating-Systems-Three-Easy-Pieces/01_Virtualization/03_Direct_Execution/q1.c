#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>
#include <unistd.h>

long elapsed(struct timeval *begin) {
  struct timeval now;
  if (gettimeofday(&now, NULL) < 0) {
    fprintf(stderr, "Get time failed\n");
    exit(1);
  }
  long diff_sec = now.tv_sec - begin->tv_sec;
  int diff_mircosec = now.tv_usec - begin->tv_usec;

  return diff_sec * 1000000 + diff_mircosec;
}

int main() {
  struct timeval begin;
  if (gettimeofday(&begin, NULL) < 0) {
    fprintf(stderr, "Get Time Failed\n");
    exit(1);
  }
  
  int loop = 100000;
  while (loop-- > 0) {
    read(STDIN_FILENO, NULL, 0);
  }

  long duration = elapsed(&begin);

  printf("%d calls of `read` takes: %ld mircoseconds\n", 100000, duration);
}
