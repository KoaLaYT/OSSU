#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main() {
  int val = 100;
  printf("Before fork, the value is %d\n", val);

  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Failed\n");
    exit(1);
  }

  if (rc == 0) {
    printf("In child process (%d), the value is %d\n", (int) getpid(), val);
    val = 200;
    printf("And child process (%d) change the value to %d\n", (int) getpid(), val);
  } else {
    printf("In parent process (%d), the value is %d\n", (int) getpid(), val);
    val = 300;
    printf("And parent process (%d) change the value to %d\n", (int) getpid(), val);
  }
}
