import React from 'react';
import { UserContext } from '../components/user-context';
import Card from '../components/card';
import './styles/alldata.css';

function AllData() {
    const ctx = React.useContext(UserContext);
    const [status]     = React.useState('');
    const [show]         = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });

    function Transaction({t}) {
        const date =`${t.month + 1}/${t.day}/${t.year}`;
        const time =`${t.hour}:${t.minutes}:${t.seconds}`
        let amount;
        if (t.amount > 0) {
            amount = `Deposit - $${t.amount}`
        } else {
            amount = `Withdrawal - $${t.amount}`
        };
        return (
            <div className="transaction">{date} - {time} - {amount}</div>
        )
    }
    
    
    return (
        <Card
            bgcolor="main"
            header="Balance and History"
            status={status}
            width="22rem"
            body={show ? (
                <>
                    <h5>Welcome {ctx.currentUser.name}</h5>
                    <h6>Your current balance is:</h6>
                    <h6>${ctx.currentUser.balance}</h6>
                    <h6>Transaction History</h6>
                    {ctx.currentUser.history.map((transaction, i) => 
                        <Transaction key={i} t={transaction}/>
                    )}
                </>
            ):(
                <>
                    <h5>You must log in to proceed</h5>
                </>
            )}
/>
);
}

export default AllData