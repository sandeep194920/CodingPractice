import "./App.css";

const transactions = [
  { id: "t_01", customer: "Alice Johnson", amount: 120 },
  { id: "t_02", customer: "Bob Smith", amount: 50 },
  { id: "t_03", customer: "Cathy Lee", amount: 75 },
  { id: "t_04", customer: "David Kim", amount: 40 },
  { id: "t_05", customer: "Alice Johnson", amount: -30 },
  { id: "t_06", customer: "Alice Johnson", amount: 60 },
  { id: "t_07", customer: "David Kim", amount: 90 },
  { id: "t_08", customer: "Ethan Brown", amount: 200 },
  { id: "t_09", customer: "Cathy Lee", amount: 25 },
  { id: "t_10", customer: "Bob Smith", amount: 80 },
  { id: "t_11", customer: "David Kim", amount: -10 },
  { id: "t_12", customer: "Ethan Brown", amount: -150 },
  { id: "t_13", customer: "Alice Johnson", amount: 45 },
  { id: "t_14", customer: "Fiona Green", amount: 55 },
];

type Transaction = (typeof transactions)[number];

// type Balance = Record<string, number> // can also type as
type Balances = {
  [customerName: string]: number;
};

/********************** GET max customer - Method 1 ********************************/

// Below methods are all same - they show different ways (bad to best) ways to get balances object

// Converts an array having duplicates to the object having unique values

const getBalances = (transactions: Transaction[]): Balances => {
  const balances: Balances = {};

  transactions.forEach(({ customer, amount }) => {
    if (Object.hasOwn(balances, customer)) {
      balances[customer] = balances[customer] + amount;
    } else {
      balances[customer] = amount;
    }
  });
  return balances;
};

const getBalancesOptimized = (transactions: Transaction[]): Balances => {
  const balances: Balances = {};
  transactions.forEach(({ customer, amount }) => {
    balances[customer] = (balances[customer] || 0) + amount;
  });
  return balances;
};

const getBalancesIdiomatic = (transactions: Transaction[]): Balances => {
  return transactions.reduce<Balances>((balances, { customer, amount }) => {
    balances[customer] = (balances[customer] || 0) + amount;
    return balances;
  }, {});
};

/* ------------- ------------- ------------- ------------- ------------- */

// Using above getBalance methods we can then get the highest balance customer
const maxCustomer = Object.entries(getBalancesIdiomatic(transactions)).reduce<
  [string, number]
>(
  (max, [customer, balance]) => {
    // if(balance > max[1]){
    //   return [customer, balance]
    // }

    return balance > max[1] ? [customer, balance] : max;
  },
  ["", -Infinity]
);

/********************** GET max customer - Method 2 ********************************/

type HighestBalanceCustomer = [string, number];

const getHighestBalance = (
  transactions: Transaction[]
): HighestBalanceCustomer => {
  const balances = transactions.reduce<Balances>(
    (balances, { customer, amount }) => {
      balances[customer] = (balances[customer] || 0) + amount;
      return balances;
    },
    {}
  );

  // Highest balance customers
  const highestBalanceCustomer = Object.entries(
    balances
  ).reduce<HighestBalanceCustomer>(
    (max, [customerName, amount]) =>
      amount > max[1] ? [customerName, amount] : max,
    ["", -Infinity]
  );

  return highestBalanceCustomer;
};

/********************************************************************/

function App() {
  const maxCustomer = getHighestBalance(transactions);

  return (
    <ul>
      {transactions.map(({ id, customer, amount }) => (
        <li key={id}>
          <span className={maxCustomer[0] === customer ? "bg-amber-300" : ""}>
            {customer}
          </span>{" "}
          : <span>{amount}</span>
        </li>
      ))}
    </ul>
  );
}

export default App;

/* 
Some questions for myself:


1. Each transaction has a unique id which is good. 
But what if we didn't have that prop? We could use index as key in li but it might change when we implement a delete. 
So what can be a unique prop in this case?



---------------------------------------------------------------------------------------------------------


*/
