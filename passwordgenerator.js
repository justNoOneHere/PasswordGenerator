const readline = require('readline');
const fs = require('fs');
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the number of characters in each combination: ', (answer1) => {
    rl.question('Enter the character set to use (default is all characters): ', (answer2) => {
      const numChars = parseInt(answer1);
      const characters = answer2 || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:\'",.<>?/\\|';

      const file = fs.createWriteStream(`wordlist_char${numChars}.txt`);
      const start = process.hrtime();

      const worker = new Worker(__filename);
      worker.on('message', (msg) => {
        file.end();
        const end = process.hrtime(start);
        console.log(`Generated wordlist_char${numChars}.txt in ${end[0]} seconds and ${end[1]} nanoseconds`);
        rl.close();
        process.exit();
      });
      worker.postMessage({ numChars, characters });
    });
  });
} else {
  parentPort.on('message', (msg) =>{
    const { numChars, characters } = msg;
  
    async function generateCombinations(combination) {
      if (combination.length === numChars) {
        fs.appendFileSync(`wordlist_char${numChars}.txt`, combination + '\n');
      } else {
        for (let i = 0; i < characters.length; i++) {
          await generateCombinations(combination + characters[i]);
        }
      }
    }
  
    const generatePromise = generateCombinations('');
  
    generatePromise.then(() => {
      parentPort.postMessage(1);
    });
  })
}  
