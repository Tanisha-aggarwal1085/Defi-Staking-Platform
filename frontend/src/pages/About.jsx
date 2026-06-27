function About() {

    return (
        <section className="mainSection">
            <div className="leftPanel" style={{ width: "100%" }}>
                <h1>About EtherAuthority</h1>

                <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
                    EtherAuthority is a decentralized staking platform built as part of
                    a Blockchain Internship project. Users can securely stake their ETH,
                    earn fixed APY rewards, and withdraw their funds anytime — all
                    powered by a smart contract deployed on the Ethereum network.
                </p>

                <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
                    This project demonstrates core DeFi concepts including staking,
                    reward calculation, and wallet integration using MetaMask and ethers.js.
                </p>
            </div>
        </section>
    );
}

export default About;