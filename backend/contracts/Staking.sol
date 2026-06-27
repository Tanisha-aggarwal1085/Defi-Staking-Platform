// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Staking {

    // Fixed annual percentage yield (12%)
    uint256 public constant APY = 12;

    // 1 year in seconds, used for reward calculation
    uint256 public constant YEAR = 365 days;

    // How much each user has staked
    mapping(address => uint256) public stakes;

    // Timestamp of the user's last stake/withdraw/claim action
    mapping(address => uint256) public lastUpdated;

    // Rewards already calculated but not yet claimed
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount, uint256 newTotal);
    event Withdrawn(address indexed user, uint256 amount, uint256 newTotal);
    event RewardClaimed(address indexed user, uint256 amount);
    event ContractFunded(address indexed funder, uint256 amount);

    // ---------------------------------------------------------
    // Internal helper: calculates reward earned since lastUpdated
    // based on time elapsed and updates state before any action.
    // ---------------------------------------------------------
    function _updateReward(address user) internal {

        if (stakes[user] > 0) {

            uint256 timeElapsed =
                block.timestamp - lastUpdated[user];

            uint256 earned =
                (stakes[user] * APY * timeElapsed) /
                (100 * YEAR);

            rewards[user] += earned;
        }

        lastUpdated[user] = block.timestamp;
    }

    // ---------------------------------------------------------
    // STAKE
    // ---------------------------------------------------------
    function stake() public payable {

        require(
            msg.value > 0,
            "Amount must be greater than 0"
        );

        _updateReward(msg.sender);

        stakes[msg.sender] += msg.value;

        emit Staked(
            msg.sender,
            msg.value,
            stakes[msg.sender]
        );
    }

    // ---------------------------------------------------------
    // WITHDRAW
    // ---------------------------------------------------------
    function withdraw(uint256 amount) public {

        require(
            amount > 0,
            "Amount must be greater than 0"
        );

        require(
            stakes[msg.sender] >= amount,
            "Not enough stake"
        );

        _updateReward(msg.sender);

        stakes[msg.sender] -= amount;

        // Effects before interaction (reentrancy-safe pattern)
        (bool success, ) =
            payable(msg.sender).call{value: amount}("");

        require(success, "Withdraw transfer failed");

        emit Withdrawn(
            msg.sender,
            amount,
            stakes[msg.sender]
        );
    }

    // ---------------------------------------------------------
    // CLAIM REWARD
    // ---------------------------------------------------------
    function claimReward() public {

        _updateReward(msg.sender);

        uint256 reward = rewards[msg.sender];

        require(
            reward > 0,
            "No rewards"
        );

        require(
            address(this).balance >= reward,
            "Contract has insufficient balance"
        );

        rewards[msg.sender] = 0;

        (bool success, ) =
            payable(msg.sender).call{value: reward}("");

        require(success, "Reward transfer failed");

        emit RewardClaimed(msg.sender, reward);
    }

    // ---------------------------------------------------------
    // FUND CONTRACT
    // Anyone (typically the admin/owner) can send extra ETH
    // into the contract so there is enough balance available
    // to pay out staking rewards to users.
    // ---------------------------------------------------------
    function fundContract() public payable {

        require(
            msg.value > 0,
            "Must send ETH to fund"
        );

        emit ContractFunded(msg.sender, msg.value);
    }

    // ---------------------------------------------------------
    // VIEW FUNCTIONS
    // ---------------------------------------------------------

    // Returns the user's currently staked balance
    function getStake(address user)
        public
        view
        returns (uint256)
    {
        return stakes[user];
    }

    // Returns the user's claimable reward, including reward
    // accrued since their last update (without modifying state)
    function getReward(address user)
        public
        view
        returns (uint256)
    {
        uint256 pending = rewards[user];

        if (stakes[user] > 0) {

            uint256 timeElapsed =
                block.timestamp - lastUpdated[user];

            uint256 earned =
                (stakes[user] * APY * timeElapsed) /
                (100 * YEAR);

            pending += earned;
        }

        return pending;
    }

    // Returns the total ETH currently held by the contract
    // (useful for checking if enough balance exists for rewards)
    function getContractBalance()
        public
        view
        returns (uint256)
    {
        return address(this).balance;
    }

    // Allows contract to receive plain ETH transfers
    // (e.g. sending ETH directly from MetaMask to the contract)
    receive() external payable {}
}