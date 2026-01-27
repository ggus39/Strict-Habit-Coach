// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title StrictToken
 * @dev Strict Habit Coach 项目的 ERC20 代币
 *
 * 代币经济学：
 * - 总供应量：100,000,000 STRICT (1亿)
 * - 部署者获得全部代币
 * - 全部代币将转入 HabitEscrow 合约作为奖励池
 */
contract StrictToken is ERC20 {
    // 总供应量：1亿 STRICT（18位小数）
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10 ** 18;

    /**
     * @dev 构造函数：铸造全部代币给部署者
     */
    constructor() ERC20("Strict Token", "STRICT") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}
