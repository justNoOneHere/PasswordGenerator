#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_CHARS 62
#define NUM_CHARS_DEFAULT 4

char characters[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:\'\",.<>?/\\|";

void generateCombinations(int numChars, char* combination, FILE* file) {
  if (numChars == 0) {
    fprintf(file, "%s\n", combination);
  } else {
    for (int i = 0; i < MAX_CHARS; i++) {
      char newCombination[strlen(combination) + 2];
      strcpy(newCombination, combination);
      strncat(newCombination, &characters[i], 1);
      generateCombinations(numChars - 1, newCombination, file);
    }
  }
}

int main() {
  int numChars;
  printf("Enter the number of characters in each combination: ");
  scanf("%d", &numChars);

  char combination[numChars + 1];
  combination[0] = '\0';

  char filename[32];
  sprintf(filename, "wordlist_char%d.txt", numChars);
  FILE* file = fopen(filename, "w");
  if (file == NULL) {
    printf("Error opening file!\n");
    return 1;
  }

  clock_t start = clock();
  generateCombinations(numChars, combination, file);
  clock_t end = clock();
  double time_spent = (double)(end - start) / CLOCKS_PER_SEC;

  fclose(file);

  printf("Generated all combinations and wrote them to %s in %f seconds\n", filename, time_spent);
    system("pause");

  return 0;
}
