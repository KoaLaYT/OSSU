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
    execl("/bin/ls", "/bin/ls", NULL);
  } else {
    wait(NULL);
  }
}
