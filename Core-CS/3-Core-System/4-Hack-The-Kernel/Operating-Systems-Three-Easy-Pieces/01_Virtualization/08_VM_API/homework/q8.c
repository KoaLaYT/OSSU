#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

struct Vec {
   int *data;
   int cap;
   int len;
};

struct Vec vec_with_capacity(int cap) {
   assert(cap >= 0);

   int *data = malloc(sizeof(int) * cap);

   struct Vec v = { data, cap, 0 };

   return v;
}

void vec_push(struct Vec *vec, int val) {
   if (vec->len == vec->cap) {
      // realloc vec, double the capacity
      int *new_location = realloc(vec->data, sizeof(int) * vec->cap * 2);
      if (new_location == NULL) {
         fprintf(stderr, "realloc failed\n");
         exit(1);
      }

      vec->data = new_location;
      vec->cap *= 2;
   }

   vec->data[vec->len] = val;
   vec->len += 1;
}

void vec_print_info(struct Vec *v) {
   printf("data address: %p\n", v->data);
   printf("capacity: %d\n", v->cap);
   printf("length: %d\n", v->len);
}

int main() {
   struct Vec v = vec_with_capacity(10);
   printf("new vec created:\n");
   vec_print_info(&v);

   int i = 0;
   for (; i < 25; ++i) {
      vec_push(&v, 1);
      vec_print_info(&v);
   }

   free(v.data);
  }
