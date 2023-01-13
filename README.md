# PasswordGenerator

This Node.js program generates a wordlist by creating all possible combinations of characters with a specified length. It uses the `readline` module to prompt the user to input the number of characters in each combination and the character set to use (default is all alphabetical, numerical, and special characters). The `fs` module is used to create a write stream for a file named `wordlist_char{numChars}.txt`, where `{numChars}` is replaced with the number of characters inputted by the user.

The program also utilizes the `worker_threads` module, which allows you to create separate threads for your Node.js program to execute. If the current thread is the main thread, the program will prompt the user for input and then create a worker thread to generate the combinations. The worker thread listens for a message with the necessary information and then generates the combinations using an asynchronous recursive function. Once the worker thread finishes generating the combinations, it sends a message back to the main thread, which ends the write stream and logs the time it took to generate the combinations.

## Usage

To use this program, first make sure you have Node.js and npm installed on your machine. Then, clone the repository and navigate to the directory in your terminal. Run the following command to install the necessary dependencies:

```
npm install
```

Then, run the program with the following command:

```
node passwordgenerator.js
```


You will be prompted to enter the number of characters in each combination and the character set to use. The program will then generate the wordlist and output the time it took to complete. The wordlist will be saved in a file named `wordlist_char{numChars}.txt` in the same directory as the program.

## Example

Here is an example of the program in action:

```
Enter the number of characters in each combination: 3
Enter the character set to use (default is all characters): abc
Generated wordlist_char3.txt in 0 seconds and 4348025 nanoseconds
```

The generated wordlist `wordlist_char3.txt` will contain all possible combinations of the characters `a`, `b`, and `c` with a length of 3, such as `aaa`, `aab`, `aac`, `aba`, `abb`, and so on.


# C is Better !!

YES C is better see the speed of passwordgenerator.c 

<div align="center">
"Please note that this script is for educational purposes only and should not be used for any malicious or unethical activities."
</div>
