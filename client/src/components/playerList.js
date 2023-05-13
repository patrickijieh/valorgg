import { useEffect, useState } from 'react';

function playerList(props) {

    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        setAccounts(props.accounts);
    }, [props.accounts]);

    useEffect(() => {
        console.log(accounts);
        console.log(props);
    }, [accounts]);

    let accountList;

    if(accounts && accounts.length)
    {
        accountList = accounts.map((account) => {
            return (
                <tr key={account.puuid}>
                    <td key={account.puuid}>
                        <div key={account.puuid} className="p-3 mx-2">{account.name}#{account.tag}</div>
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