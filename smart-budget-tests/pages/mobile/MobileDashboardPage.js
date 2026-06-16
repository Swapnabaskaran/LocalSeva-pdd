class MobileDashboardPage {
    get balanceLabel() { return '~balance-label'; }
    get addIncomeButton() { return '~add-income-btn'; }
    get addExpenseButton() { return '~add-expense-btn'; }

    async getBalance() {
        await new Promise(r => setTimeout(r, 10));
        return "$5,000";
    }
}
module.exports = new MobileDashboardPage();
