pragma solidity ^0.4.21;

contract SampleContract {
    
    event LogUint256(uint256 a, bool b);
    event LogInt256(int256 a, bool b);
    event LogUint256Indexed(uint256 indexed a, bool b);
    event LogInt256Indexed(int256 indexed a, bool b);
    event LogString(string a, bool b);
    event LogStringIndexed(string indexed a, bool b);
    
    constructor() public {
    }
    
    function genLogUint256(uint256 a, bool b) public {
        emit LogUint256(a, b);
    }

    function genLogUint256Indexed(uint256 a, bool b) public {
        emit LogUint256Indexed(a, b);
    }

    function genLogString(uint256 a, string b) public {
        emit LogUint256(a, true);
        emit LogString(b, false);
    }

    function genLogStringIndexed(uint256 a, string b) public {
        emit LogUint256Indexed(a, true);
        emit LogStringIndexed(b, false);
    }
}

