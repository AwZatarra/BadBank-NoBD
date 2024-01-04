import React                    from 'react';
import { UserContext }          from '../components/user-context';
import Card                     from '../components/card';
import { datedTransaction }     from '../components/dated-transaction';
import validate                 from '../components/validate';

function Withdraw() {
    
    const ctx = React.useContext(UserContext);

    const [status, setStatus]       = React.useState('');
    const [withdraw, setWithdraw]   = React.useState(0);
    const [message, setMessage]     = React.useState(null);
    const [enable, setEnable]       = React.useState(false);
    const [show]           = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });
    
    function handleSubmit() {
        let i = ctx.userIndex;
        let currentBalance = Number(ctx.users[i].balance);
        
        if (currentBalance < Number(withdraw)) {
            setMessage(`The requested amount exceeds your current balance`);
            setWithdraw(0);
            return;
        }
        if (withdraw <= 0) {
            setMessage('Please enter an amount greater than zero');
            return;
        }
        ctx.users[i].balance = currentBalance - Number(withdraw);
        const currentTransaction = datedTransaction((0 - Number(withdraw)));
        ctx.users[i].history.splice(0,0,currentTransaction);
        ctx.currentUser = ctx.users[i];
        
        setMessage(`Successfully withdrew $${withdraw}`)
        setWithdraw(0)
        setEnable(false);
    };

    const validateThis = () => {
        if (validate(withdraw, 'please enter an amount to withdraw', setStatus))
            {
                return true
            } else {
                return false
            };
    };

    const makeChange = (e, setThis) => {
        setThis(e.currentTarget.value);
        setMessage(null);
        if (validateThis())
            {setEnable(true)};
    }; 

    return (
        <Card
            bgcolor="main"
            header="Withdraw"
            status={status}
            body={show ? (
                <>
                    <h5>Welcome {ctx.currentUser.name}</h5>
                    <h6>Balance ${ctx.currentUser.balance}</h6>
                    Withdraw<br/>
                    <input type="number" className="form-control" id="withdraw" placeholder="Enter amount to withdraw" value={withdraw} onChange={e => {makeChange(e, setWithdraw)}}/><br/>
                    <button type="submit" disabled={!enable} className="btn btn-light" onClick={handleSubmit}>Withdraw</button><br/><br/>
                    {message && <h5>{message}</h5>}
                </>
            ):(
                <>
                    <h5>You must log in to proceed</h5>
                </>
            )}
        />
    );
}

export default Withdraw;