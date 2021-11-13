#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Failed\n");
    exit(1);
  }

  if (rc == 0) {
    close(STDOUT_FILENO); 
    printf("Print after close stdout\n");
  } else {
    wait(NULL);
  }
}
