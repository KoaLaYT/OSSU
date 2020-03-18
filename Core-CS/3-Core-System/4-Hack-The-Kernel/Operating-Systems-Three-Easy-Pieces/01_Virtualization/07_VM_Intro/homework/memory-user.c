#include <stdio.h>
#include <stdlib.h>
 
int main(int argc, char *argv[]) {
   if (argc != 2) {
      printf("Usage: memory-user <int>\n");
      exit(1);
   }

   int size = atoi(argv[1]);
   printf("Accepted size: %d\n", size);

   int len = size * 1024 * 1024 / sizeof(int);
   int *arr = malloc(sizeof(int) * len);
   int *index = arr;

   while(1) {
      *index = 1;
      index += 1;

      if (index == arr + len) {
         index = arr;
      }
   }

   free(arr);
}
