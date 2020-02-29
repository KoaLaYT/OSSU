#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char* argv[]) {
  printf("hello, wolrd (pid: %d)\n", (int) getpid());

  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Failed\n");
    exit(1);
  } else if (rc == 0) {
    // child process
    printf("hello, I'm child (pid: %d)\n", (int) getpid());
  } else {
    // parent process
    printf("hello, I'm parent of %d. (pid: %d)\n", rc, (int) getpid());
  }
}
