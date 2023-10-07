#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { faker } from "@faker-js/faker";
const createUser = () => {
    let users = [];
    for (let i = 0; i < 10000; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(1000000 * Math.random() * 9000000),
            balance: 1000 * i,
        };
        users.push(user);
    }
    return users;
};
//ATM Machine authentication
const atmMachine = async (users) => {
    console.log(chalk.green("************************************************"));
    console.log(chalk.green(`*************** ${chalk.bold.underline.red("ATM Machine's CLI")} ***************`));
    console.log(chalk.green("************************************************"));
    const res = await inquirer.prompt({
        type: "number",
        message: "Enter your PIN code",
        name: "pin",
    });
    const user = users.find((val) => val.pin === res.pin);
    if (user) {
        console.log(chalk.green.underline(`Welcome ${chalk.bold.blueBright(user.name)}!`));
        console.log(`Account Number: ${chalk.bold.underline.blue(user.accountNumber)}`);
        console.log(`Account Balance: ${chalk.bold.underline.blue(user.balance)}`);
        atmFunction(user);
    }
    else {
        console.log(chalk.red("Invalid User PIN!"));
        return;
    }
};
//ATM Functions
const atmFunction = async (user) => {
    const answer = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Choose the Function:",
        choices: ["withdraw", "balance", "deposit", "exit"],
    });
    switch (answer.select) {
        case "withdraw":
            const price = await inquirer.prompt({
                type: "list",
                name: "amount",
                message: "Choose the Amount:",
                choices: ["1000", "5000", "10000", "15000", "20000", "25000", "Other"],
            });
            switch (price.amount) {
                case "1000":
                    if (price.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    user.balance -= price.amount;
                    console.log(chalk.green(`${price.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                case "5000":
                    if (price.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    user.balance -= price.amount;
                    console.log(chalk.green(`${price.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                case "10000":
                    if (price.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    user.balance -= price.amount;
                    console.log(chalk.green(`${price.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                case "15000":
                    if (price.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    user.balance -= price.amount;
                    console.log(chalk.green(`${price.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                case "20000":
                    if (price.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    user.balance -= price.amount;
                    console.log(chalk.green(`${price.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                case "25000":
                    if (price.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    user.balance -= price.amount;
                    console.log(chalk.green(`${price.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                case "Other":
                    const customAmount = await inquirer.prompt({
                        type: "number",
                        name: "amount",
                        message: "Enter the Amount:",
                    });
                    if (customAmount.amount > user.balance) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Insufficent Balance in your Account."));
                        break;
                    }
                    else if (customAmount.amount > 25000) {
                        console.log(chalk.red("*** Transaction Aborted! ***"));
                        console.log(chalk.red("Amount entered exceeds valid limit."));
                        break;
                    }
                    user.balance -= customAmount.amount;
                    console.log(chalk.green(`${customAmount.amount} withdrawn successfully!`));
                    console.log(`Balance Amount: ${chalk.bold.blue(user.balance)}`);
                    break;
                default:
                    break;
            }
            break;
        case "balance":
            console.log(chalk.blueBright("*** You current Account Balance ***"));
            console.log(`Balance: ${chalk.bold.blue(user.balance)}`);
            break;
        case "deposit":
            const creditAmount = await inquirer.prompt({
                type: "number",
                name: "amount",
                message: "Enter the Amount to deposit:",
            });
            if (creditAmount.amount < 500) {
                console.log(chalk.red("*** Transaction Aborted! ***"));
                console.log(chalk.red("Minimum amount to deposit is 500."));
                break;
            }
            else if (creditAmount.amount > 50000) {
                console.log(chalk.red("*** Transaction Aborted! ***"));
                console.log(chalk.red("Maximum amount to deposit is 50000."));
                break;
            }
            user.balance += creditAmount.amount;
            console.log(chalk.green(`${chalk.bold.blueBright(creditAmount.amount)} Rupees deposited successfully!`));
            console.log(`Balance Amount: ${chalk.bold.blueBright(user.balance)}`);
            break;
        case "exit":
            console.log(chalk.bold.green("*** Thank you for Banking with us! ***"));
            break;
        default:
            break;
    }
};
//Generating 10000 Fake Users using Faker JS
let users = createUser();
// Starting the ATM machine with Authentication & then Functions
atmMachine(users);
