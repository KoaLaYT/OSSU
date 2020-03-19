#include <stdio.h>
#include <stdlib.h>

int main() {
   int *data = malloc(sizeof(int) * 100);

   // access out of boundary
   data[100] = 1;

   free(data);
}
