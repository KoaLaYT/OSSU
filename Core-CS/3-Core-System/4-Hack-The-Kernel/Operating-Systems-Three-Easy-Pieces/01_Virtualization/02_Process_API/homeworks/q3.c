#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Faild\n");
    exit(1);
  }
  
  if (rc == 0) {
    printf("hello\n");
  } else {
    wait(NULL);
    printf("goodbye\n");
  }
}
