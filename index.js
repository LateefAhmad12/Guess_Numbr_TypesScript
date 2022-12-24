import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
const sleep = () => {
    return new Promise((res) => setTimeout(res, 4000));
};
async function welcome() {
    const title = chalkAnimation.neon("Let start the Game.....");
    await sleep();
    title.stop();
}
let playerLife = 5;
async function askQuestion() {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    do {
        playerLife--;
        console.log(`Player life left ${playerLife}`);
        var que = await inquirer.prompt([
            {
                type: 'number',
                name: 'user_number',
                message: 'Select any number between 1 to 10 \n ',
                validate: (answers) => {
                    if (isNaN(answers)) {
                        return chalk.redBright(`please Enter a Valid number...`);
                    }
                    return true;
                }
            }
        ]);
        if (que.user_number === randomNumber) {
            console.log(chalk.bgGreenBright('Congratulation! You guess the right Number..'));
        }
        else if (que.user_number < randomNumber) {
            console.log(chalk.bgRedBright(`Your guess ${que.user_number} is less than random number.`));
        }
        else if (que.user_number > randomNumber) {
            console.log(chalk.bgRed(`Your guess ${que.user_number} is greater than random number.`));
            // askQuestion()
        }
    } while (playerLife > 0 && randomNumber !== que.user_number);
    if (playerLife == 0) {
        console.log(chalk.bgBlack('Game OVer'));
    }
}
async function startAgain() {
    do {
        console.clear();
        await welcome();
        playerLife = 5;
        await askQuestion();
        var restart = await inquirer.prompt([{
                type: "list",
                name: "start_again",
                choices: ["Yes", "No"]
            }]);
    } while (restart.start_again == "Yes");
}
await startAgain();
