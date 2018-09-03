import Web3 from 'web3'
// 合约addr
// let contractAddr = '0x07229c22297b443e8b10cf29eaf4a10969aea0a9'
// 合约addr 下
let contractAddr = '0xfa73648d3a1156c0ed3fe4b0f77d7d75c7869195'

let web3 = window.web3
let contractAbi = [
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'playerID',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'playerAddress',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'playerName',
                'type': 'bytes32'
            },
            {
                'indexed': false,
                'name': 'ethOut',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'timeStamp',
                'type': 'uint256'
            }
        ],
        'name': 'onWithdraw',
        'type': 'event'
    },
    {
        'constant': false,
        'inputs': [],
        'name': 'activate',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_tickets',
                'type': 'uint256'
            },
            {
                'name': '_affCode',
                'type': 'address'
            }
        ],
        'name': 'buyXaddr',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_tickets',
                'type': 'uint256'
            },
            {
                'name': '_affCode',
                'type': 'uint256'
            }
        ],
        'name': 'buyXid',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_affCode',
                'type': 'bytes32'
            },
            {
                'name': '_tickets',
                'type': 'uint256'
            }
        ],
        'name': 'buyXname',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_pID',
                'type': 'uint256'
            },
            {
                'name': '_addr',
                'type': 'address'
            },
            {
                'name': '_name',
                'type': 'bytes32'
            },
            {
                'name': '_laff',
                'type': 'uint256'
            }
        ],
        'name': 'receivePlayerInfo',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'playerAddress',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'playerName',
                'type': 'bytes32'
            },
            {
                'indexed': false,
                'name': 'begin',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'end',
                'type': 'uint256'
            }
        ],
        'name': 'onBuy',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'playerID',
                'type': 'uint256'
            },
            {
                'indexed': true,
                'name': 'playerAddress',
                'type': 'address'
            },
            {
                'indexed': true,
                'name': 'playerName',
                'type': 'bytes32'
            },
            {
                'indexed': false,
                'name': 'isNewPlayer',
                'type': 'bool'
            },
            {
                'indexed': false,
                'name': 'affiliateID',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'affiliateAddress',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'affiliateName',
                'type': 'bytes32'
            },
            {
                'indexed': false,
                'name': 'amountPaid',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'timeStamp',
                'type': 'uint256'
            }
        ],
        'name': 'onNewName',
        'type': 'event'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_pID',
                'type': 'uint256'
            },
            {
                'name': '_name',
                'type': 'bytes32'
            }
        ],
        'name': 'receivePlayerNameList',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'begin',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'end',
                'type': 'uint256'
            }
        ],
        'name': 'LogbuyNums',
        'type': 'event'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_nameString',
                'type': 'string'
            },
            {
                'name': '_affCode',
                'type': 'address'
            },
            {
                'name': '_all',
                'type': 'bool'
            }
        ],
        'name': 'registerNameXaddr',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_nameString',
                'type': 'string'
            },
            {
                'name': '_affCode',
                'type': 'bytes32'
            },
            {
                'name': '_all',
                'type': 'bool'
            }
        ],
        'name': 'registerNameXname',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [],
        'name': 'setLuckyNum',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_pID',
                'type': 'uint256'
            },
            {
                'name': '_rIDlast',
                'type': 'uint256'
            }
        ],
        'name': 'updateTicketVault',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    },
    {
        'payable': true,
        'stateMutability': 'payable',
        'type': 'fallback'
    },
    {
        'constant': false,
        'inputs': [],
        'name': 'withdraw',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'activated_',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '_target',
                'type': 'uint256'
            },
            {
                'name': '_start',
                'type': 'uint256'
            },
            {
                'name': '_end',
                'type': 'uint256'
            }
        ],
        'name': 'calulateXticket',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'pure',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'get_test_numer',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'getBuyPrice',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'getCurrentRoundInfo',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'address'
            },
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '_addr',
                'type': 'address'
            }
        ],
        'name': 'getPlayerInfoByAddress',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'bytes32'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'getTimeLeft',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '_rid',
                'type': 'uint256'
            },
            {
                'name': '_pID',
                'type': 'uint256'
            }
        ],
        'name': 'judgeWin',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'name',
        'outputs': [
            {
                'name': '',
                'type': 'string'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'address'
            }
        ],
        'name': 'pIDxAddr_',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'bytes32'
            }
        ],
        'name': 'pIDxName_',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'plyr_',
        'outputs': [
            {
                'name': 'addr',
                'type': 'address'
            },
            {
                'name': 'name',
                'type': 'bytes32'
            },
            {
                'name': 'win',
                'type': 'uint256'
            },
            {
                'name': 'gen',
                'type': 'uint256'
            },
            {
                'name': 'aff',
                'type': 'uint256'
            },
            {
                'name': 'lrnd',
                'type': 'uint256'
            },
            {
                'name': 'laff',
                'type': 'uint256'
            },
            {
                'name': 'luckytickets',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'bytes32'
            }
        ],
        'name': 'plyrNames_',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'plyrRnds_',
        'outputs': [
            {
                'name': 'eth',
                'type': 'uint256'
            },
            {
                'name': 'tickets',
                'type': 'uint256'
            },
            {
                'name': 'mask',
                'type': 'uint256'
            },
            {
                'name': 'luckytickets',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'randNums',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'rID_',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'round_',
        'outputs': [
            {
                'name': 'tickets',
                'type': 'uint256'
            },
            {
                'name': 'ended',
                'type': 'bool'
            },
            {
                'name': 'jackpot',
                'type': 'uint256'
            },
            {
                'name': 'start',
                'type': 'uint256'
            },
            {
                'name': 'end',
                'type': 'uint256'
            },
            {
                'name': 'winner',
                'type': 'address'
            },
            {
                'name': 'mask',
                'type': 'uint256'
            },
            {
                'name': 'found',
                'type': 'uint256'
            },
            {
                'name': 'lucknum',
                'type': 'uint256'
            },
            {
                'name': 'nextpot',
                'type': 'uint256'
            },
            {
                'name': 'blocknum',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'searchtickets',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'addr',
                'type': 'address'
            }
        ],
        'name': 'searchTicketsXaddr',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            },
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'symbol',
        'outputs': [
            {
                'name': '',
                'type': 'string'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    }
]
// or
if (typeof web3 === 'undefined') {
    // web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/WlvljmHqo75RhK1w1QJF"));
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/WlvljmHqo75RhK1w1QJF'))
    // alertify.alert('You are not signed into metamask')
}

// 通过abi 和地址获取已部署的合约对象
let contractNet = web3.eth.contract(contractAbi).at(contractAddr)
console.log(contractNet)

//  合约api
let luckyCoinApi = {}

luckyCoinApi.getBalance = () => {
    console.log('getBlance')
}

luckyCoinApi.registerNameXname = (regName, _affCode, fn) => {
    // * @param _nameString players desired name
    // * @param _affCode affiliate ID, address, or name of who referred you
    // * @param _all set to true if you want this to push your info to all games
    if (typeof regName !== 'string') {
        return 'need string regName !.'
    }
    if (typeof _affCode !== 'string') {
        return 'need string _affCode name !.'
    }
    if (typeof fn !== 'function') {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.registerNameXname(regName.toString(), _affCode, true, {value: web3.toWei('0.01', 'ether')}, function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, true)
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at registerNameXname', null)
    }
}

luckyCoinApi.registerNameXaddr = (regName, _affCode, fn) => {
    if (typeof regName !== 'string') {
        return 'need string regName !.'
    }
    if (typeof _affCode !== 'string') {
        return 'need string _affCode addr !.'
    }
    if (typeof fn !== 'function') {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.registerNameXaddr(regName.toString(), _affCode, true, {value: web3.toWei('0.01', 'ether')}, function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, true)
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at registerNameXaddr', null)
    }
}

luckyCoinApi.buyXaddr = (_affCode, _team, totalVal, fn) => {
    /*
    *
        @param _affCode   the ID/address/name of the player who gets the affiliate fee
        @param _team what team is the player playing for?
    *
    * */
    if (typeof _affCode !== 'string') {
        fn('_affCode param 1 need Sting ( addr )', null)
        return '_affCode param 1 need Sting ( addr )'
    }
    if (typeof _team !== 'number') {
        fn('_team param 2 need number (0,1,2,3)', null)
        return '_team param 2 need number (0,1,2,3)'
    }
    if (typeof totalVal === 'string') {
        totalVal = parseFloat(totalVal)
    }
    if (!totalVal) {
        fn('totalVal param 3 error', null)
        return 'totalVal param 3 error'
    }
    contractNet.buyXaddr(_affCode, parseInt(_team), {value: web3.toWei(totalVal, 'ether')}, function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res)
            } else {
                fn('buyXaddr error', null)
            }
        } else {
            fn(err, null)
        }
    })
}
luckyCoinApi.buyXname = (_affCode, _team, totalVal, fn) => {
    if (typeof _affCode !== 'string') {
        fn('_affCode param 1 need Sting ( addr )', null)
        return '_affCode param 1 need Sting ( addr )'
    }
    if (typeof _team !== 'number') {
        fn('_team param 2 need number (0,1,2,3)', null)
        return '_team param 2 need number (0,1,2,3)'
    }
    if (typeof totalVal === 'string') {
        totalVal = parseFloat(totalVal)
    }
    if (!totalVal) {
        fn('totalVal param 3 error', null)
        return 'totalVal param 3 error'
    }
    contractNet.buyXname(_affCode, parseInt(_team), {value: web3.toWei(totalVal, 'ether')}, function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res)
            } else {
                fn('buyXname error', null)
            }
        } else {
            fn(err, null)
        }
    })
}
luckyCoinApi.buyXid = (_affCode, _team, totalVal, fn) => {
    if (typeof _affCode !== 'number') {
        fn('_affCode param 1 need number ( id )', null)
        return '_affCode param 1 need number ( id )'
    }
    if (typeof _team !== 'number') {
        fn('_team param 2 need number (0,1,2,3)', null)
        return '_team param 2 need number (0,1,2,3)'
    }
    if (typeof totalVal === 'string') {
        totalVal = parseFloat(totalVal)
    }
    if (!totalVal) {
        fn('totalVal param 3 error', null)
        return 'totalVal param 3 error'
    }
    contractNet.buyXid(_affCode, parseInt(_team), {value: web3.toWei(totalVal, 'ether')}, function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res)
            } else {
                fn('buyXid error', null)
            }
        } else {
            fn(err, null)
        }
    })
}

luckyCoinApi.getAccounts = (fn) => {
    /* 获取当前账号地址 */
    if (typeof fn !== 'function') {
        return 'need async function !.'
    }
    web3.eth.getAccounts((err, res) => {
        if (!err) {
            if (res) {
                fn(null, res.toString())
            }
        } else {
            fn('getAccounts err' + err, null)
        }
    })
}

luckyCoinApi.getGasPrice = (fn) => {
    /* 获取当前gasPrice */
    if (typeof fn !== 'function') {
        return 'need async function !.'
    }
    web3.eth.getGasPrice((err, res) => {
        if (!err) {
            if (res) {
                fn(null, res.toNumber(10))
            }
        } else {
            fn('getGasPrice err' + err, null)
        }
    })
}



export {
    web3,
    luckyCoinApi
}
