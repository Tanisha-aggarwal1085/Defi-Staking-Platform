import { useWeb3 } from "../Web3Context";

function Transactions() {

    const { history } = useWeb3();

    return (
        <section className="mainSection">
            <div className="leftPanel" style={{ width: "100%" }}>
                <h1>Transaction History</h1>

                <div className="historySection">
                    {
                        history.length === 0
                            ? <p className="emptyHistory">No Stake History</p>
                            : history.map((item, index) => (
                                <div className="historyCardItem" key={index}>
                                    {item}
                                </div>
                            ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Transactions;