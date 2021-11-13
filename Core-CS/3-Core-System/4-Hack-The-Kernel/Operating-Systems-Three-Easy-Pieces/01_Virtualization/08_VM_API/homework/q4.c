#include <stdio.h>
#include <stdlib.h>

int main() {
   int *ptr = malloc(sizeof(int));

   printf("Pointer address is: %p\n", ptr);

   // forget to free
}
