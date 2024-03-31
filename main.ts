#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 20000;
let myPin = 1234;

console.log(chalk.blue("\n \t Welcome to Shahi ATM Machine\n"));

async function main() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: chalk.yellow("Enter your pin"),
            type: "number"
        }
    ]);

    if (pinAnswer.pin === myPin) {
        console.log(chalk.red("Correct pin code!!"));
        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                message: chalk.magenta("Please select an option"),
                type: "list",
                choices: ["Withdraw", "Balance Inquiry"]
            }
        ]);

        if (operationAns.operation === "Withdraw") {
            let withdrawAns = await inquirer.prompt([
                {
                    name: "withdrawmethod",
                    type: "list",
                    message: chalk.greenBright("Select a withdrawal method:"),
                    choices: ["Fast Cash", "Enter Amount"]
                }
            ]);
            if (withdrawAns.withdrawmethod === "Fast Cash") {
                let fastCashAns = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "list",
                        message: chalk.yellow("Select Amount"),
                        choices: [1000, 2000, 5000, 10000]
                    }
                ]);
                if (fastCashAns.amount > myBalance) {
                    console.log(chalk.redBright("Insufficient Balance.."));
                } else {
                    myBalance -= fastCashAns.amount;
                    console.log(chalk.greenBright(`${fastCashAns.amount} withdraw successfully`));
                    console.log(chalk.green(`Your Remaining Amount is ${myBalance}`));
                }
            } else if (withdrawAns.withdrawmethod === "Enter Amount") {
                let amountAns = await inquirer.prompt([
                    {
                        name: "amount",
                        message: chalk.blueBright("Enter your required amount"),
                        type: "number"
                    }
                ]);
                if (amountAns.amount > myBalance) {
                    console.log(chalk.redBright("Insufficient Balance.."));
                } else {
                    myBalance -= amountAns.amount;
                    console.log(chalk.greenBright(`${amountAns.amount} withdraw successfully`));
                    console.log(chalk.green(`Your remaining balance is ${myBalance}`));
                }
            }
        } else if (operationAns.operation === "Balance Inquiry") {
            console.log(chalk.blueBright("Your current balance is: " + myBalance));
        }
    } else {
        console.log(chalk.red("Incorrect pin number"));
    }
}

main();
