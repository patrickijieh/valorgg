import {useState, useEffect} from 'react';

function playerList(props) {

    const [accounts, setAccounts] = useState([]);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [accountData, setAccountData] = useState({});
    let accountList;
    
    useEffect(() => {
        setAccounts(props.accounts);
        setAccountData(props.data);
        console.log(accountData);
    }, [props.accounts]);

    useEffect(() => {
        console.log(accounts);
        console.log(props);
    }, [accounts]);

    const removeAccount = (account) => {
        console.log("removing " + account.name);
        setInputDisabled(true);

        let updatedUser = null;

        if (accounts) {
            const newAccounts = accounts.filter((acc) => acc.name != account.name);
            setAccounts(newAccounts);

            let url = '/users/from-user/' + (accountData ? (accountData.username) : (null));
            fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({valorantAccounts: newAccounts})
            })
            .then((response) => {
                console.log(response); 
                setInputDisabled(false);
                updatedUser = accountData;
                updatedUser.valorantAccounts = newAccounts;
                return response.json();
            })
            .catch((err) => {console.error(err); setInputDisabled(false);});

            if (updatedUser) {
                props.updateUserData(updatedUser);
            }
        }
    }

    const handleNameClick = (event, account) => {
        event.preventDefault();
        props.getStats(account);
        console.log("clicked " + account.name);
    }

    if (accounts && accounts.length)
    {
        accountList = accounts.map((account) => {
            return (
                <tr key={account.name}>
                    <td>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-row flex-fill" onClick={(e) => handleNameClick(e, account)}>
                                <a href="" className="fs-4 h6 text-light text-decoration-none">{account.name}#{account.tag}</a>
                            </div>
                            <div className="d-flex flex-row flex-fill justify-content-end">
                                <button key={account.name} onClick={() => removeAccount(account)} className="btn btn-danger mx-2" disabled={inputDisabled}>Remove</button>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        });
    }

    return (
        (accounts && accounts.length) ? (
            <tbody>
                {accountList}
            </tbody>
        ) : (
                <tbody>
                    <tr>
                        <td className="text-center">
                            <div className="p-3">No Valorant accounts were found. Add an account below!</div>
                        </td>
                    </tr>
                </tbody>
            )
    );
}

export default playerList;