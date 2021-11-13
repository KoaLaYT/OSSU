#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  int p[2];
  if (pipe(p) == -1) {
    fprintf(stderr, "Create pipe failed\n");
  }

  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Failed\n");
    exit(1);
  }

  if (rc == 0) {
    printf("in child1, writing to the pipe...\n");
    write(p[1], "Greeting from child1", 21);
    printf("in child1, write end.\n");
  } else {
    int rc2 = fork();

    if (rc2 < 0) {
      fprintf(stderr, "Fork Failed\n");
      exit(1);
    }

    if (rc2 == 0) {
      char msg[21];
      printf("in child2, reading from pipe...\n");
      read(p[0], msg, 21);
      printf("child2 read: %s\n", msg);
    }
  }
}
