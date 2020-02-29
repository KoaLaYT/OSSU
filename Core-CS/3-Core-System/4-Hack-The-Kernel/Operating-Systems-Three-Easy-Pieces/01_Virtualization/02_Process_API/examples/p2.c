#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

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
    int rc_wait = wait(NULL);
    printf("hello, I'm parent of %d. (wait: %d) (pid: %d)\n", rc, rc_wait, (int) getpid());
  }
}
