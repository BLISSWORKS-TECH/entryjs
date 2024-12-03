'use strict';

var firstRun = false;
var exCnt = 0, tempCnt = 0;

Entry.IQkey = {
    id: '4A.8',
    name: 'IQ_key', // isNotFor 속성과 대소문자까지 정확하게 매치되어야 합니다.
    url: 'http://www.iqkey.co.kr/', // 생략 가능합니다. 엔트리 사이트에서 홍보시 사용됩니다.
    imageName: 'IQkey.png', // images/hardware 폴더 내에 존재하는 이미지입니다. 엔트리 사이트에서 홍보시 사용됩니다.
    title: {
        ko: '아이큐 키',
        en: 'IQ key',
    },

    setZero: function () {

        console.log("engine set Zero..");
        Entry.hw.sendQueue['com'] = 0x00;
        Entry.hw.sendQueue['Mdir1'] = 0x00;
        Entry.hw.sendQueue['Mdir2'] = 0x00;
        Entry.hw.sendQueue['Mdir3'] = 0x00;
        Entry.hw.sendQueue['Mspd1'] = 0x00;
        Entry.hw.sendQueue['Mspd2'] = 0x00;
        Entry.hw.sendQueue['Mspd3'] = 0x00;
        Entry.hw.update();
        //exCnt = tempCnt;
        //console.log("exCnt:" + exCnt);      
    },

    afterReceive(pd) {

        const Z_WAIT = 0;
        const Z_SEND_PACKET = 1;
        const Z_MOVING = 2;

        const READY = 0;
        const PROCESS = 1;

        var pStep = Z_WAIT;
        var iter = 0;

        if (Entry.engine.isState('run')) {
            //console.log("engine running..");  
            firstRun = false;
            tempCnt++;
            //console.log("tempCnt: " + tempCnt);             
        }
        else if (Entry.engine.isState('stop')) {

            Entry.hw.sendQueue['com'] = 0x00;
            Entry.hw.sendQueue['Mdir1'] = 0x03;
            Entry.hw.sendQueue['Mdir2'] = 0x03;
            Entry.hw.sendQueue['Mdir3'] = 0x03;
            Entry.hw.sendQueue['Mspd1'] = 0x00;
            Entry.hw.sendQueue['Mspd2'] = 0x00;
            Entry.hw.sendQueue['Mspd3'] = 0x00;
            Entry.hw.update();                    
        }
    }
};

// 언어 적용
Entry.IQkey.setLanguage = function () {
    return {
        ko: {
            Blocks: {
                MT1: '3번(파랑)',
                MT2: '2번(초록)',
                MT3: '1번(빨강)', 
                STICK_RED: '1번 스틱(빨강)',
                STICK_GREEN: '2번 스틱(초록)',
                STICK_BLUE: '3번 스틱(파랑)',
                D_CW: '왼쪽',
                D_CCW: '오른쪽',
                D_STOP: '멈추기',
                NORMAL: '보통 속도로 돌리기',
                SPEEDY: '빠른 속도로 돌리기',
                VERY_SPEEDY: '아주 빠른 속도로 돌리기',
                STICK_UP: '올리기',
                STICK_DOWN: '내리기',
                STICK_MID:'가운데 놓기',                          
            },
            template: {
                motorControl_normal: '%1 모터를 %2으로 출력 %3% 의 속도로 돌리기 %4',
                motorControl_threeStep: '%1 모터를 %2으로 %3 %4',
                motorStop_select: '%1 모터를 멈추기 %2',
                motorStop_all: '전체 모터를 멈추기 %1',
                motorDirection: '%1 모터의 회전 방향을 %2 로 정하기 %3',
                motorSpeed: '%1 모터를 %2 %3',
                motor1_Dir: '1번(빨강) 모터의 회전 방향을 %1 으로 정하기 %2',
                motor2_Dir: '2번(초록) 모터의 회전 방향을 %1 으로 정하기 %2',
                motor3_Dir: '3번(파랑) 모터의 회전 방향을 %1 으로 정하기 %2',
                motor1_spd: '1번(빨강) 모터의 회전 속도를 %1  %2',
                motor2_spd: '2번(초록) 모터의 회전 속도를 %1  %2',
                motor3_spd: '3번(파랑) 모터의 회전 속도를 %1  %2',
                controller_boolean: '%1 을 %2',
                controller_info : '%1 의 상태 %2',
                batteryCheck: '배터리 전압(v) %1',                
            },
        },

        en: {
            Blocks: {
                MT1: 'number1(red)',
                MR2: 'number2(green)',
                MT3: 'number3(blue)',
                STICK_RED: 'number1 stick(red)',
                STICK_BLUE: 'number2 stick(green)',
                STICK_GREEN: 'number3 stick(blue)',
                D_CW: 'counter wise',
                D_CCW: 'counter clock wise',
                D_STOP: 'stop',               
                NORMAL: 'normal',
                RAPID: 'rapid',
                VERY_RAPID: 'very rapid',
                STICK_UP: 'is up?',
                STICK_DOWN: 'is down?', 
                STICK_MID: 'is in the middle',     
            },
            template: {
                motorControl_normal: 'rotate the motor %1 to the %2 at %3 % speed %4',
                motorControl_threeStep: 'rotate the motor %1 to the %2 at %3 speed %4',  
                motorstop_select: 'the motor %1 stop %2', 
                motorStop_all: 'all motor stop %1',
                motorDirection: 'change the rotation direction of the motor %1 to the %2 %3',
                motorSpeed: 'rotate the motor %1 at %2 speed %3',
                motor1_Dir: 'set the direction of number1(red) motor to the %1 %2',
                motor2_Dir: 'set the direction of number2(green) motor to the %1 %2',
                motor3_Dir: 'set the direction of number3(blue) motor to the %1 %2',
                motor1_spd: 'set the speed of number1(red) motor at %1 speed %2',
                motor2_spd: 'set the speed of number2(green) motor at %1 speed %2',
                motor3_spd: 'set the speed of number2(blue) motor at %1 speed %2',
                controller_boolean: '%1 %2',
                controller_info: 'status of %1 %2',
                batteryCheck: 'battery check(v) %1',

            },
        },
    };
};

Entry.IQkey.blockMenuBlocks = [
    'motorControl_normal',
    'motorControl_threeStep',
    'motorStop_select',
    'motorStop_all',
    'motorDirection',
    'motorSpeed', 
    'motor1_Dir',
    'motor2_Dir',
    'motor3_Dir',
    'motor1_spd',
    'motor2_spd',
    'motor3_spd',
    'controller_boolean',
    'controller_info',
    'batteryCheck',    
];


Entry.IQkey.getBlocks = function () {
    return {
       
        motorControl_normal: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.MT3, 'M3'],
                        [Lang.Blocks.MT2, 'M2'],  
                        [Lang.Blocks.MT1, 'M1'],                                                                                           
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_CW, 'CW'],
                        [Lang.Blocks.D_CCW, 'CCW'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Block',
                    accept: 'string',
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['M3', 'CW', 50, null],
                type: 'motorControl_normal',
            },
            paramsKeyMap: {
                NUM: 0,
                DIR: 1,
                SPD: 2,
            },
            class: "base1",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR_CONTROL_NORMAL= 1;
                const DIR_LEFT = 1;
                const DIR_RIGHT = 2;
                const DIR_STOP = 3;
              
                console.log("motor control - normal block Start!");

                var _num = script.getStringField('NUM', script);
                var _dir = script.getStringField('DIR', script);
                var _spd = script.getNumberValue('SPD');

                var _dirInt = 0;

                if (_dir == 'CW') _dirInt = DIR_LEFT;
                else if (_dir == 'CCW') _dirInt = DIR_RIGHT;
                else if (_dir == 'STOP') _dirInt = DIR_STOP;

                if (_spd < 0) _spd = 0; else if (_spd > 100) _spd = 100;
                if (_spd == 10) _spd = 11; // 0x0A는 줄바꿈 일어남

                Entry.hw.sendQueue['com'] = COM_MOTOR_CONTROL_NORMAL;
                
                if (_num == 'M1') {
                    Entry.hw.sendQueue['Mdir1'] = _dirInt;
                    Entry.hw.sendQueue['Mspd1'] = _spd;
                } 
                else if (_num == 'M2') {
                    Entry.hw.sendQueue['Mdir2'] = _dirInt;
                    Entry.hw.sendQueue['Mspd2'] = _spd;
                }  
                else if (_num == 'M3') {
                    Entry.hw.sendQueue['Mdir3'] = _dirInt;
                    Entry.hw.sendQueue['Mspd3'] = _spd;
                }                          
                
                console.log("send protocol!");
            },
        },

        motorControl_threeStep: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.MT3, 'M3'],
                        [Lang.Blocks.MT2, 'M2'],
                        [Lang.Blocks.MT1, 'M1'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_CW, 'CW'],
                        [Lang.Blocks.D_CCW, 'CCW'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_STOP, 'STOP'],
                        [Lang.Blocks.NORMAL, 'NORMAL'],
                        [Lang.Blocks.SPEEDY, 'RAPID'],
                        [Lang.Blocks.VERY_SPEEDY, 'VERY_RAPID'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },              
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['M3', 'CW', 'NORMAL', null],
                type: 'motorControl_threeStep',
            },
            paramsKeyMap: {
                NUM: 0,
                DIR: 1,
                SPD: 2,
            },
            class: "base1",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR_CONTROL_THREESTEP = 2;
                const DIR_LEFT = 1;
                const DIR_RIGHT = 2;
                const DIR_STOP = 3;

                console.log("motor control-threeStep Start!");

                var _num = script.getStringField('NUM', script);
                var _dir = script.getStringField('DIR', script);
                var _spd = script.getStringField('SPD', script);

                var _dirInt = 0;
                var _spdInt = 0;

                if (_dir == 'CW') _dirInt = DIR_LEFT;
                else if (_dir == 'CCW') _dirInt = DIR_RIGHT;
                else if (_dir == 'STOP') _dirInt = DIR_STOP;         
                
                if (_spd == 'NORMAL') _spdInt = 40;
                else if (_spd == 'RAPID') _spdInt = 60;
                else if (_spd == 'VERY_RAPID') _spdInt = 90;
                else if (_spd == 'STOP') _spdInt = 0;            

                Entry.hw.sendQueue['com'] = COM_MOTOR_CONTROL_THREESTEP;

                if (_num == 'M1') {
                    Entry.hw.sendQueue['Mdir1'] = _dirInt;
                    Entry.hw.sendQueue['Mspd1'] = _spdInt;
                }
                else if (_num == 'M2') {
                    Entry.hw.sendQueue['Mdir2'] = _dirInt;
                    Entry.hw.sendQueue['Mspd2'] = _spdInt;
                }
                else if (_num == 'M3') {
                    Entry.hw.sendQueue['Mdir3'] = _dirInt;
                    Entry.hw.sendQueue['Mspd3'] = _spdInt;
                }

                console.log("send protocol!");
            },
        },

        motorStop_select: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.MT3, 'M3'],
                        [Lang.Blocks.MT2, 'M2'],
                        [Lang.Blocks.MT1, 'M1'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },             
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['M3', null],
                type: 'motorStop_select',
            },
            paramsKeyMap: {
                NUM: 0,               
            },
            class: "base1",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR_STOP_SELECT = 3;
                const DIR_STOP = 3;
                const STOP_SPEED = 50;
               
                console.log("go motor stop-select Start!");

                var _num = script.getStringField('NUM', script);
                
                Entry.hw.sendQueue['com'] = COM_MOTOR_STOP_SELECT;

                if (_num == 'M1') {
                    Entry.hw.sendQueue['Mdir1'] = DIR_STOP;
                    Entry.hw.sendQueue['Mspd1'] = STOP_SPEED;
                }
                else if (_num == 'M2') {
                    Entry.hw.sendQueue['Mdir2'] = DIR_STOP;
                    Entry.hw.sendQueue['Mspd2'] = STOP_SPEED;
                }
                else if (_num == 'M3') {
                    Entry.hw.sendQueue['Mdir3'] = DIR_STOP;
                    Entry.hw.sendQueue['Mspd3'] = STOP_SPEED;
                }

                console.log("send protocol!");
            },
        },
        

        motorStop_all: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                }
            ],
            def: {
                type: "motorStop_all"
            },
            class: "base1",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR_STOP_ALL = 4;
                const DIR_STOP = 3;
                const STOP_SPEED = 50;

                console.log("motor stop all Start!");
                
                Entry.hw.sendQueue['com'] = COM_MOTOR_STOP_ALL;

                Entry.hw.sendQueue['Mdir1'] = DIR_STOP;
                Entry.hw.sendQueue['Mspd1'] = STOP_SPEED;

                Entry.hw.sendQueue['Mdir2'] = DIR_STOP;
                Entry.hw.sendQueue['Mspd2'] = STOP_SPEED;

                Entry.hw.sendQueue['Mdir3'] = DIR_STOP;
                Entry.hw.sendQueue['Mspd3'] = STOP_SPEED;              
                console.log("send protocol!");
            },
        },
        
        motorDirection: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.MT3, 'M3'],
                        [Lang.Blocks.MT2, 'M2'],
                        [Lang.Blocks.MT1, 'M1'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_CW, 'CW'],
                        [Lang.Blocks.D_CCW, 'CCW'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },              
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['M3', 'CW', null],
                type: 'motorDirection',
            },
            paramsKeyMap: {
                NUM: 0,
                DIR: 1,                
            },
            class: "base2",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_CHANGE_MOTOR_DIRECTION = 5;
                const DIR_LEFT = 1;
                const DIR_RIGHT = 2;
                const DIR_STOP = 3;

                console.log("motor direction block Start!");

                var _num = script.getStringField('NUM', script);
                var _dir = script.getStringField('DIR', script);
               
                var _dirInt = 0;

                if (_dir == 'CW') _dirInt = DIR_LEFT;
                else if (_dir == 'CCW') _dirInt = DIR_RIGHT;
                else if (_dir == 'STOP') _dirInt = DIR_STOP;

                Entry.hw.sendQueue['com'] = COM_CHANGE_MOTOR_DIRECTION;

                if (_num == 'M1') {
                    Entry.hw.sendQueue['Mdir1'] = _dirInt;                  
                }
                else if (_num == 'M2') {
                    Entry.hw.sendQueue['Mdir2'] = _dirInt;
                }
                else if (_num == 'M3') {
                    Entry.hw.sendQueue['Mdir3'] = _dirInt;
                }

                console.log("send protocol!");
            },
        },

        motorSpeed: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.MT3, 'M3'],
                        [Lang.Blocks.MT2, 'M2'],
                        [Lang.Blocks.MT1, 'M1'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                }, 
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.NORMAL, 'NORMAL'],
                        [Lang.Blocks.SPEEDY, 'RAPID'],
                        [Lang.Blocks.VERY_SPEEDY, 'VERY_RAPID'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },               
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            def: {
                params: ['M3', 'NORMAL', null],
                type: 'motorSpeed',
            },
            paramsKeyMap: {
                NUM: 0,
                SPD: 1,
            },
            class: "base2",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR_SPEED = 6;               

                console.log("motorspeed block Start!");

                var _num = script.getStringField('NUM', script);
                var _spd = script.getStringField('SPD', script);

                var _spdInt = 0;               

                if (_spd == 'NORMAL') _spdInt = 40;
                else if (_spd == 'RAPID') _spdInt = 60;
                else if (_spd == 'VERY_RAPID') _spdInt = 90;
                else if (_spd == 'STOP') _spdInt = 0;      

                Entry.hw.sendQueue['com'] = COM_MOTOR_SPEED;

                if (_num == 'M1') {                   
                    Entry.hw.sendQueue['Mspd1'] = _spdInt;
                }
                else if (_num == 'M2') {                 
                    Entry.hw.sendQueue['Mspd2'] = _spdInt;
                }
                else if (_num == 'M3') {                   
                    Entry.hw.sendQueue['Mspd3'] = _spdInt;
                }

                console.log("send protocol!");
            },
        },
        
        motor1_Dir: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [               
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_CW, 'CW'],
                        [Lang.Blocks.D_CCW, 'CCW'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['CW', null],
                type: 'motor1_Dir',
            },
            paramsKeyMap: {
                DIR: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR1_DIRECTION = 7;
                const DIR_LEFT = 1;
                const DIR_RIGHT = 2;
                const DIR_STOP = 3;

                console.log("motor1 direction block Start!");

                var _dir = script.getStringField('DIR', script);

                var _dirInt = 0;

                if (_dir == 'CW') _dirInt = DIR_LEFT;
                else if (_dir == 'CCW') _dirInt = DIR_RIGHT;
                else if (_dir == 'STOP') _dirInt = DIR_STOP;

                Entry.hw.sendQueue['com'] = COM_MOTOR1_DIRECTION;
                Entry.hw.sendQueue['Mdir3'] = _dirInt;              

                console.log("send protocol!");
            },
        },
       
        motor2_Dir: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_CW, 'CW'],
                        [Lang.Blocks.D_CCW, 'CCW'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['CW', null],
                type: 'motor2_Dir',
            },
            paramsKeyMap: {
                DIR: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR2_DIRECTION = 8;
                const DIR_LEFT = 1;
                const DIR_RIGHT = 2;
                const DIR_STOP = 3;

                console.log("motor2 direction block Start!");

                var _dir = script.getStringField('DIR', script);

                var _dirInt = 0;

                if (_dir == 'CW') _dirInt = DIR_LEFT;
                else if (_dir == 'CCW') _dirInt = DIR_RIGHT;
                else if (_dir == 'STOP') _dirInt = DIR_STOP;

                Entry.hw.sendQueue['com'] = COM_MOTOR2_DIRECTION;
                Entry.hw.sendQueue['Mdir2'] = _dirInt;

                console.log("send protocol!");
            },
        },

        motor3_Dir: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.D_CW, 'CW'],
                        [Lang.Blocks.D_CCW, 'CCW'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12
                },
            ],
            def: {
                params: ['CW', null],
                type: 'motor3_Dir',
            },
            paramsKeyMap: {
                DIR: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR3_DIRECTION = 9;
                const DIR_LEFT = 1;
                const DIR_RIGHT = 2;
                const DIR_STOP = 3;

                console.log("motor3 direction block Start!");

                var _dir = script.getStringField('DIR', script);

                var _dirInt = 0;

                if (_dir == 'CW') _dirInt = DIR_LEFT;
                else if (_dir == 'CCW') _dirInt = DIR_RIGHT;
                else if (_dir == 'STOP') _dirInt = DIR_STOP;

                Entry.hw.sendQueue['com'] = COM_MOTOR3_DIRECTION;
                Entry.hw.sendQueue['Mdir1'] = _dirInt;

                console.log("send protocol!");
            },
        },
        
        motor1_spd: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.NORMAL, 'NORMAL'],
                        [Lang.Blocks.SPEEDY, 'RAPID'],
                        [Lang.Blocks.VERY_SPEEDY, 'VERY_RAPID'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            def: {
                params: ['NORMAL', null],
                type: 'motor1_spd',
            },
            paramsKeyMap: {
                SPD: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR1_SPEED = 14; //10은 hex 출력이 잘림

                console.log("motor1 speed block Start!");

                var _spd = script.getStringField('SPD', script);
                
                var _spdInt = 0;

                if (_spd == 'NORMAL') _spdInt = 40;
                else if (_spd == 'RAPID') _spdInt = 60;
                else if (_spd == 'VERY_RAPID') _spdInt = 90;
                else if (_spd == 'STOP') _spdInt = 0;

                Entry.hw.sendQueue['com'] = COM_MOTOR1_SPEED;
                Entry.hw.sendQueue['Mspd3'] = _spdInt;               

                console.log("send protocol!");
            },
        },

        motor2_spd: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.NORMAL, 'NORMAL'],
                        [Lang.Blocks.SPEEDY, 'RAPID'],
                        [Lang.Blocks.VERY_SPEEDY, 'VERY_RAPID'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            def: {
                params: ['NORMAL', null],
                type: 'motor2_spd',
            },
            paramsKeyMap: {
                SPD: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR2_SPEED = 11;

                console.log("motor2 speed block Start!");

                var _spd = script.getStringField('SPD', script);
                var _spdInt = 0;

                if (_spd == 'NORMAL') _spdInt = 40;
                else if (_spd == 'RAPID') _spdInt = 60;
                else if (_spd == 'VERY_RAPID') _spdInt = 90;
                else if (_spd == 'STOP') _spdInt = 0;

                Entry.hw.sendQueue['com'] = COM_MOTOR2_SPEED;
                Entry.hw.sendQueue['Mspd2'] = _spdInt;

                console.log("send protocol!");
            },
        },

        motor3_spd: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.NORMAL, 'NORMAL'],
                        [Lang.Blocks.SPEEDY, 'RAPID'],
                        [Lang.Blocks.VERY_SPEEDY, 'VERY_RAPID'],
                        [Lang.Blocks.D_STOP, 'STOP'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            def: {
                params: ['NORMAL', null],
                type: 'motor3_spd',
            },
            paramsKeyMap: {
                SPD: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                const COM_MOTOR3_SPEED = 12;

                console.log("motor3 speed block Start!");

                var _spd = script.getStringField('SPD', script);
                var _spdInt = 0;

                if (_spd == 'NORMAL') _spdInt = 40;
                else if (_spd == 'RAPID') _spdInt = 60;
                else if (_spd == 'VERY_RAPID') _spdInt = 90;
                else if (_spd == 'STOP') _spdInt = 0;

                Entry.hw.sendQueue['com'] = COM_MOTOR3_SPEED;
                Entry.hw.sendQueue['Mspd1'] = _spdInt;

                console.log("send protocol!");
            },
        },

        controller_boolean: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic_boolean_field',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.STICK_RED, 'RED'],
                        [Lang.Blocks.STICK_GREEN, 'GREEN'],
                        [Lang.Blocks.STICK_BLUE, 'BLUE'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.STICK_UP, 'UP'],
                        [Lang.Blocks.STICK_DOWN, 'DOWN'],
                        [Lang.Blocks.STICK_MID, 'MIDDLE'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,

                },
            ],
            def: {
                params: ['RED', 'MIDDLE'],
                type: 'controller_boolean',
            },
            paramsKeyMap: {
                STICK: 0,
                STATUS: 1,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                var result = false;

                var stick = script.getStringField('STICK', script);
                var stat = script.getStringField('STATUS', script);
        
                var status = Entry.hw.portData.inputData.sensor['SEN1'];
                var rStick = status & 0b00000011;
                var gStick = (status & 0b00001100) >> 2;
                var bStick = (status & 0b00110000) >> 4;

                if ((stick == 'RED')&&(stat == 'UP')&&(rStick == 0b01)) result = true;
                else if ((stick == 'RED')&&(stat == 'DOWN')&&(rStick == 0b10)) result = true;
                else if ((stick == 'RED') && (stat == 'MIDDLE') && (rStick == 0b11)) result = true;
                
                if ((stick == 'GREEN')&&(stat == 'UP')&&(gStick == 0b01)) result = true;
                else if ((stick == 'GREEN')&&(stat == 'DOWN')&&(gStick == 0b10)) result = true;
                else if ((stick == 'GREEN') && (stat == 'MIDDLE') && (gStick == 0b11)) result = true;

                if ((stick == 'BLUE')&&(stat == 'UP')&&(bStick == 0b01)) result = true;
                else if ((stick == 'BLUE')&&(stat == 'DOWN')&&(bStick == 0b10)) result = true;
                else if ((stick == 'BLUE') && (stat == 'MIDDLE') && (bStick == 0b11)) result = true;
                
                return result;
            },
        },

        controller_info: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic_string_field',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.STICK_RED, 'RED'],
                        [Lang.Blocks.STICK_GREEN, 'GREEN'],
                        [Lang.Blocks.STICK_BLUE, 'BLUE'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: "Indicator",
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },               
            ],
            def: {
                params: ['RED', null],
                type: 'controller_info',
            },
            paramsKeyMap: {
                STICK: 0,
            },
            class: "base3",
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                var result = false;

                var stick = script.getStringField('STICK', script);
              
                var status = Entry.hw.portData.inputData.sensor['SEN1'];
                var rStick = status & 0b00000011;
                var gStick = (status & 0b00001100) >> 2;
                var bStick = (status & 0b00110000) >> 4;

                if ((stick == 'RED') && (rStick == 0b01)) result = 1;
                else if ((stick == 'RED') && (rStick == 0b10)) result = 2;
                else if ((stick == 'RED') && (rStick == 0b11)) result = 0;

                if ((stick == 'GREEN') && (gStick == 0b01)) result = 1;
                else if ((stick == 'GREEN') && (gStick == 0b10)) result = 2;
                else if ((stick == 'GREEN') && (gStick == 0b11)) result = 0;

                if ((stick == 'BLUE') && (bStick == 0b01)) result = 1;
                else if ((stick == 'BLUE') && (bStick == 0b10)) result = 2;
                else if ((stick == 'BLUE') && (bStick == 0b11)) result = 0;

                return result;
            },
        },

       
        batteryCheck: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic_string_field',
            params: [               
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            def: {
                params: [null],
                type: 'batteryCheck',
            },
            paramsKeyMap: {
              
            },
            class: 'output',
            //isNotFor: ['IQ_key'],
            func: function (sprite, script) {

                return (Entry.hw.portData.inputData.sensor['SEN3'] * 0.1);
            },
        },

        bottom_sensor: {
            color: EntryStatic.colorSet.block.default.HARDWARE,
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            fontColor: '#ffffff',
            skeleton: 'basic_string_field',
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.BL, 'BL'],
                        [Lang.Blocks.BM, 'BM'],
                        [Lang.Blocks.BR, 'BR'],
                    ],
                    fontSize: 11,
                    bgColor: EntryStatic.colorSet.block.darken.HARDWARE,
                    arrowColor: EntryStatic.colorSet.arrow.default.HARDWARE,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_icon.svg',
                    size: 12,
                },
            ],
            def: {
                params: ['BL', null],
                type: 'bottom_sensor',
            },
            paramsKeyMap: {
                B_DIR: 0,
            },
            class: 'output',
            isNotFor: ['zumi_mini'],
            func: function (sprite, script) {
                const sen = script.getStringField('B_DIR', script);
                return (Entry.hw.portData.inputData.irSensor[sen]);
            },
        },       
       
    };
};

module.exports = Entry.IQkey;