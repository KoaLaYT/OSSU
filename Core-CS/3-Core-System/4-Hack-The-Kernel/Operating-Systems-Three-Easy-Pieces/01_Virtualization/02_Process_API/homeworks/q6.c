#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Failed\n");
    exit(1);
  }

  if (rc == 0) {
    printf("child process\n");
  } else {
    int rc_wait = waitpid(rc, NULL, 0);
    printf("Return code of wait is: %d\n", rc_wait);
  }
}
