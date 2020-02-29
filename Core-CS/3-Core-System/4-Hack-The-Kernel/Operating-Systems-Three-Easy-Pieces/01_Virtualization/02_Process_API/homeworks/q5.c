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
    int rc_wait = wait(NULL);
    printf("Return code in child wait is: %d\n", rc_wait);
  } else {
    int rc_wait = wait(NULL);
    printf("Return code in parent wait is: %d\n", rc_wait);
  }
}
