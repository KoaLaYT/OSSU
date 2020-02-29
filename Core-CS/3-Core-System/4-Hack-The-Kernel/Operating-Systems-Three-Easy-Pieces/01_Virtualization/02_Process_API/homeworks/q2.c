#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <fcntl.h>

int main() {
  int fd = open("./poem.txt", O_WRONLY);
  
  int rc = fork();

  if (rc < 0) {
    fprintf(stderr, "Fork Failed\n");
  }

  if (rc == 0) {
    int w = write(fd, "child process", 13);
    printf("child process write %d bytes to file\n", w);
  } else {
    int w = write(fd, "parent process", 14);
    printf("parent process write %d bytes to file\n", w);
  }
}
